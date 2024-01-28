"use client"
import useShowToast from '@/hooks/useShowToast'
import { VStack, FormControl, Text, Textarea, Image, Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { CldUploadButton } from 'next-cloudinary'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const EditPostPage = () => {
    const [inputs, setInputs] = useState({
        text: "",
        img: ""
    })
    const [post, setPost] = useState({})
    const { postId } = useParams()
    const showToast = useShowToast()
    const [imgUrl, setImgUrl] = useState("")
    const [text, setText] = useState("")
    const { data: session } = useSession()
    const user = session?.user
    const router = useRouter()
    // useEffect(() => {
    //     if (user) {
    //         return user
    //     }
    // }, [user])

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/posts/getPosts/single/${postId}`)
            const data = await res.json()

            setPost(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (post) {
            setInputs({
                text: post?.text,
                img: post?.img
            })
        }
    }, [post])
    useEffect(() => {
        if (postId) {
            fetchPost()
        }
    }, [postId])

    const uploadPhoto = async (data) => {
        setImgUrl(data?.info?.secure_url)
    }

    const handleUpdatePost = async (ev) => {
        ev.preventDefault()
        try {
            const res = await fetch(`/api/posts/${post._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ text: inputs.text, img: imgUrl, userId: user._id })
            })

            const data = await res.json()

            showToast("success", "Post Updated", "success")
            router.push("/")
            if (data?.error) {
                showToast("Error", "You can't update posts of others", "error")
                return
            }
        } catch (error) {
            console.log(error);
            showToast("Error", error?.message, "error")
            return
        }
    }
    return (
        <VStack zIndex={1} overflowY={"scroll"} w={["100%", "65%"]} mx={"auto"} h={"100vh"} justifyContent={"center"}>
            <FormControl display={"flex"} flexDir={"column"} gap={4}>
                <Text textAlign={"center"} fontSize={"25px"} fontWeight={600}>
                    Edit Post
                </Text>
                <Textarea value={inputs?.text} onChange={(ev) => setInputs({ ...inputs, text: ev.target.value })} colorScheme={"teal"} placeholder="What's in your mind ?" />
                <CldUploadButton options={{ maxFiles: 1 }} onUpload={uploadPhoto} uploadPreset="kk8uk4rv">
                    <Image src={"/upload.png"} h={6} w={6} />
                </CldUploadButton>
                {
                    imgUrl && <Image src={imgUrl} h={96} objectFit={"contain"} />
                }
                <Button onClick={handleUpdatePost} variant={"solid"} type='submit' colorScheme={"teal"}>Update Post</Button>
            </FormControl>
        </VStack>
    )
}
export default EditPostPage