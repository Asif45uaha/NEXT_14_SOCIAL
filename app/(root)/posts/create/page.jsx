"use client"
import useShowToast from '@/hooks/useShowToast'
import { VStack, FormControl, Text, Textarea, Image, Button } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import { cache, useEffect, useState } from 'react'

const CreatePage = () => {
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

    const uploadPhoto = async (data) => {
        setImgUrl(data?.info?.secure_url)
    }

    const handleCreatePost = async (ev) => {
        ev.preventDefault()
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ createdBy: user._id, text, img: imgUrl })
            }, {
                cache: "no-store"
            },)
            if (res.ok) {
                showToast("success", "Post created", "success")
                router.push("/")
            }

            if (res.error) {
                showToast("Error", "Error in  Post creation", "error")
                return
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <VStack zIndex={1} overflowY={"scroll"} w={["100%", "65%"]} mx={"auto"} h={"100vh"} justifyContent={"center"}>
            <FormControl display={"flex"} flexDir={"column"} gap={4}>
                <Text textAlign={"center"} fontSize={"25px"} fontWeight={600}>
                    Create a Post
                </Text>
                <Textarea value={text} onChange={(e) => setText(e.target.value)} colorScheme={"teal"} placeholder="What's in your mind ?" />
                <CldUploadButton options={{ maxFiles: 1 }} onUpload={uploadPhoto} uploadPreset="kk8uk4rv">
                    <Image src={"/upload.png"} h={6} w={6} />
                </CldUploadButton>
                {
                    imgUrl && <Image src={imgUrl} h={96} objectFit={"contain"} />
                }

                <Button onClick={handleCreatePost} variant={"solid"} type='submit' colorScheme={"teal"}>Post</Button>
            </FormControl>
        </VStack>
    )
}
export default CreatePage