"use client"
import Loader from '@/components/Loader'
import { VStack, Image, HStack, Text, Box, Avatar, Divider } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
} from '@chakra-ui/react'
import useShowToast from '@/hooks/useShowToast'
const SinglePostPage = () => {
    const showToast = useShowToast()
    const [commentText, setCommentText] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState(true)
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const { data: session } = useSession()
    const user = session?.user
    const HandleLikePost = async () => {
        try {
            const res = await fetch(`/api/posts/like/${post._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: user?._id })
            })

            if (res.ok) {
                setLoading(false)
                window.location.reload()
            }
            if (data.error) {
                showToast("error", "Error in deleting post", "error")
            }
        } catch (error) {
            console.log(error);

        }
    }

    const commentPost = async () => {
        onClose()
        if (!commentText) {
            alert("please write something")
            return
        }
        try {
            const res = await fetch(`/api/posts/${post._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ commentedBy: user._id, text: commentText })
            })

            if (res.ok) {
                window.location.reload()
                showToast("success", "Comment has been added", "success")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchSinglePost = async () => {
        try {
            const res = await fetch(`/api/posts/single/${postId}`)

            const data = await res.json()
            setPost(data)
            if (res.status === 200) {
                setLoading(false)
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (postId) fetchSinglePost()
    }, [postId])

    console.log(post);
    return loading ? <Loader /> : (
        <VStack h={"100vh"} w={["100%", "65%"]} mx={"auto"} px={2} justify={"start"} align={"Start"} gap={4} overflowY={"scroll"}>
            <Text fontSize={"15px"} fontWeight={400}>{post?.text}</Text>
            {
                post?.img && <Image src={post?.img} alt='error' />
            }
            <VStack justifyContent={"start"} align={"start"} gap={6} w={"100%"}>
                <HStack gap={6} >
                    <VStack>
                        <Box onClick={HandleLikePost}>
                            {
                                post?.likes?.includes(user?._id) ? <FaHeart color="red" size={24} /> :
                                    <FaRegHeart size={24} />
                            }
                        </Box>

                        <Text color={"gray"}>{post?.likes?.length}</Text>
                    </VStack>
                    <VStack>
                        <FaRegComment size={24} onClick={onOpen} />
                        <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}  >
                            <ModalOverlay />
                            <ModalContent >
                                <ModalHeader>Comment a Post</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody display={"flex"} flexDir={"column"} gap={2} >
                                    <Input
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        type="text" placeholder="write your comment.." />
                                </ModalBody>

                                <ModalFooter>
                                    <Button variant='solid' colorScheme={"teal"} onClick={commentPost}>Post</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        <Text color={"gray"}>{post?.comments?.length}</Text>
                    </VStack>
                </HStack>
                <Divider orientation='horizontal' w={"100%"} />
                <VStack justify={"start"} align={"start"} gap={4}>
                    {
                        post?.comments?.map((comment, id) => {
                            return <HStack align={"start"} justify={"Start"} key={id}>
                                <Avatar src={comment?.commentedBy?.profile} />
                                <VStack gap={0} align={"start"} justify={"Start"}>
                                    <Text fontSize={"18px"} fontWeight={400}>{comment?.commentedBy?.username}</Text>
                                    <Text fontSize={"13px"}>{comment?.text}</Text>
                                </VStack>
                            </HStack>
                        })
                    }
                </VStack>
            </VStack>
        </VStack>
    )
}
export default SinglePostPage