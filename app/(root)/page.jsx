"use client"
import { useSession } from "next-auth/react"
import { VStack, Input, Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
import PostCard from "@/components/PostCard"

const HomePage = () => {
    const [search, setSearch] = useState("")
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const { data: session } = useSession()
    const user = session?.user

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])

    const fetchAllPosts = async () => {
        if (search === "") {
            setLoading(true)
        }
        try {
            const res = await fetch(search !== "" ? `/api/posts/getPosts/${search}` : "/api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, {
                cache: "no-store"
            })
            const data = await res.json()
            setPosts(data)
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (user) {
            fetchAllPosts()
        }
    }, [user, search])
    // console.log(posts);
    return loading ? <Loader /> : (
        <VStack h={"100vh"} mt={2} overflowY={"scroll"} w={["100%", "65%"]} mx={"auto"} gap={8} p={4}>
            <Box w={"100%"}>
                <Input variant={"flushed"} placeholder="Search Posts..." value={search} onChange={(ev) => setSearch(ev.target.value)} />
            </Box>
            <Box w={"100%"} display={"flex"} flexDir={"column"} gap={12}>
                {
                    posts?.map((post, id) => {
                        return <PostCard post={post} key={id} />
                    })
                }
            </Box>
            {
                posts?.length === 0 && <Box >
                    <Text>
                        Sorry there are no Posts
                    </Text>
                </Box>
            }
        </VStack>
    )
}
export default HomePage