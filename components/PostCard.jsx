"use client"
import { VStack, HStack, Avatar, Text, Box, Image, IconButton } from "@chakra-ui/react"
import { MdArrowDropDown } from "react-icons/md";

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
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
    useColorModeValue
} from '@chakra-ui/react'
import Loader from "./Loader"
import useShowToast from "@/hooks/useShowToast"
import { useRouter } from "next/navigation"
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa6"
import { BsThreeDots } from "react-icons/bs";
import { format } from 'date-fns'


const PostCard = ({ post }) => {

    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const showToast = useShowToast()
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()
    const user = session?.user
    const router = useRouter()
    useEffect(() => {
        if (user && post) {
            setLoading(false)
        }
    }, [user, post])

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

    const handleDeletePost = async () => {
        try {
            const res = await fetch(`/api/posts/${post._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: user?._id })
            })
            const data = await res.json()
            if (data?.status === 200) {
                showToast("success", "Post Deleted Success", "success")
                setLoading(false)
                window.location.reload()
            }
            if (data?.error) {
                showToast("error", "Unauthorized to  delete a  post", "error")
            }

        } catch (error) {
            console.log(error);
            showToast("error", "Error in deleting post", "error")
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
    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/posts/${post?._id}`)
            const data = await res.json()

            setComments(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (post) {
            fetchComments()
        }
    }, [post])

    return loading ? <Loader /> : (
        <VStack justify={"start"} align={"start"} w={"100%"} gap={4} bg={useColorModeValue("white", "gray.dark")} p={4} rounded={"lg"} shadow={"lg"}>
            <HStack justify={"space-between"} align={"start"} w={"100%"} >
                <HStack align={"start"} justify={"start"}>
                    <Avatar src={post?.createdBy?.profile} onClick={() => router.push(`/profile/${post?.createdBy?.username}`)} />
                    <VStack gap={0} align={"start"} >
                        <Text fontSize={"18px"} fontWeight={"500"}>
                            {post?.createdBy?.username}
                        </Text>
                        <Text fontSize={"12px"} fontWeight={"500"}>
                            {format(new Date(post.createdAt), "p")}
                        </Text>
                    </VStack>

                </HStack>
                <Menu placement="left" size={"sm"} >
                    <MenuButton>
                        <BsThreeDots size={24} cursor={"pointer"} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => router.push(`/posts/${post._id}`)}>Edit Post</MenuItem>
                        <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Text fontSize={"18px"} fontWeight={400}>
                {post?.text}
                <IconButton p={1} mx={2} rounded={"100%"}>
                    <MdArrowDropDown size={24} onClick={() => router.push(`/${post._id}`)} />
                </IconButton>
            </Text>

            {
                post?.img && <Image src={post?.img} h={96} w={96} objectFit={"cover"} />
            }
            {
                post && <HStack justifyContent={"start"} align={"start"} gap={6}>
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
                        <Box >
                            <FaRegComment size={24} onClick={onOpen} />
                            <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}  >
                                <ModalOverlay />
                                <ModalContent bg={useColorModeValue("white", "gray.dark")}>
                                    <ModalHeader>Comment a Post</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody display={"flex"} flexDir={"column"} gap={2} >
                                        <VStack justify={"start"} align={"start"} overflowY={"scroll"}>
                                            {
                                                comments?.map((comment, id) => {
                                                    return <HStack justify={"start"} align={"start"} key={id}>
                                                        <Avatar src={comment?.commentedBy?.profile} />
                                                        <VStack gap={0} align={"start"} justify={"start"}>
                                                            <Text>{comment?.commentedBy?.username}</Text>
                                                            <Text fontSize={"12px"}>{comment?.text}</Text>
                                                        </VStack>
                                                    </HStack>
                                                })
                                            }

                                        </VStack>
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
                        </Box>
                        <Text>{post?.comments?.length}</Text>
                    </VStack>
                </HStack>
            }

        </VStack>
    )
}
export default PostCard