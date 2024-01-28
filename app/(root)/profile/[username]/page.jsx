'use client'
import ModalUi from '@/components/ModalUi'
import { VStack, Image, Text, HStack, Button, useDisclosure, Box, Avatar, IconButton } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Loader from '@/components/Loader'
import { useParams, useRouter } from 'next/navigation'
import useShowToast from '@/hooks/useShowToast'
import { MdArrowDropDown } from 'react-icons/md'


const ProfilePage = () => {
    const router = useRouter()
    const showToast = useShowToast()
    const { username } = useParams()
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: session } = useSession()
    const user = session?.user

    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])

    const fetchUserInfo = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/users/getUser/${username}`, {
                cache: "no-store"
            })
            const data = await res.json()

            if (res?.status === 200) {
                setUserData(data)
                setLoading(false)

            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (user && userData) {
            fetchUserInfo()
        }
    }, [user])

    if (userData === null) {
        showToast("error", "user Doesn't exist", "error")
        return
    }


    const handleFollow = async () => {

        try {
            const res = await fetch(`/api/users/follow/${userData._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ userId: user._id })
            })
            const data = await res.json()
            if (res?.status === 200) {
                showToast("success", data?.message, "success")
                window?.location?.reload()
            }
        } catch (error) {
            console.log(error);
        }
    }


    return loading ? <Loader /> : (
        <VStack gap={4} justify={"start"} align={"start"} w={["100%", "65%"]} mx={"auto"} h={"100vh"} overflowY={"scroll"} p={[2, 4]}>
            <HStack justify={"start"} align={"start"} gap={2}>
                <Avatar src={userData?.profile || "/single-person.png"} size={"xl"} />
                <VStack justify={"start"} align={"start"} gap={0}>
                    <Text fontSize={"18px"} fontWeight={600}>{userData?.username}</Text>
                    <Text fontSize={"15px"} fontWeight={600}>{userData?.email}</Text>
                    <HStack align={"center"} gap={2}>
                        <Text fontSize={"15px"} fontWeight={400} color={"gray"}>Following &#x2022; {userData?.following?.length} </Text>
                        <Text fontSize={"15px"} fontWeight={400} color={"gray"}>Followers &#x2022; {userData?.followers?.length} </Text>
                    </HStack>
                    <Text fontSize={"15px"} fontWeight={400} color={"gray"}>posts &#x2022; {userData?.posts?.length} </Text>
                </VStack>
            </HStack>
            <Text fontSize={"15px"} fontWeight={400}>
                {userData?.bio}
            </Text>
            {
                userData._id !== user._id ?
                    <Box w={"100%"} onClick={handleFollow}>
                        <Button variant={"solid"} py={4} colorScheme={"teal"} w={"100%"} >
                            {user?.following.includes(userData._id) ? "Unfollow" : "Follow"}
                        </Button>
                    </Box>
                    :
                    <Box w={"100%"}>
                        <Button variant={"solid"} py={4} colorScheme={"teal"} w={"100%"} onClick={onOpen}>
                            update Profile
                        </Button>
                    </Box>

            }

            <ModalUi
                isOpen={isOpen}
                onClose={onClose}
                title="Update User profile"
                user={userData}
            />
            <Tabs w={"100%"} mt={6} colorScheme={"teal"}>
                <TabList>
                    <Tab w={"50%"}>Posts</Tab>
                    <Tab w={"50%"}>Saved</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel display={"flex"} flexWrap={"wrap"} flexDir={["column", "row"]} gap={4} justifyContent={["center", "start"]}>
                        {
                            userData?.posts?.map((post, id) => {
                                return <VStack w={["100%", "45%"]} justify={"start"} align={"start"} key={id}>
                                    <Text>
                                        {post?.img ? post?.text.slice(0, 30) : post?.text}...
                                        <IconButton p={1} mx={2} rounded={"100%"}>
                                            <MdArrowDropDown size={24} onClick={() => router.push(`/${post._id}`)} />
                                        </IconButton>
                                    </Text>
                                    <Image src={post?.img} h={48} w={48} objectFit={"contain"} alt='No Img' />
                                </VStack>
                            })
                        }
                    </TabPanel>
                    <TabPanel>

                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    )
}
export default ProfilePage