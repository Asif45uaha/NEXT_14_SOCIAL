"use client"
import { HStack, Box, IconButton, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import useShowToast from '@/hooks/useShowToast'
import { CiHome } from "react-icons/ci";
import { IoMdCreate } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa6";
import { LuSunMoon } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";
import { useEffect, useState } from 'react'


const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode()
    const { data: session } = useSession()
    const user = session?.user
    const showToast = useShowToast()
    const handleLogout = async () => {
        await signOut({ callbackUrl: "/login" })
        showToast("success", "Logout Success", "success")
    }


    return (
        <HStack zIndex={2} justify={"space-between"} py={4} w={["100%", "65%"]} mx={"auto"} px={2}>
            <Box>
                <Link href={"/"}>
                    <IconButton rounded={"100%"}>
                        <CiHome size={24} />
                    </IconButton>
                </Link>
            </Box>

            <Box>
                <Link href={'/posts/create'}>
                    <IconButton rounded={"100%"}>
                        <IoMdCreate size={24} />
                    </IconButton>
                </Link>
            </Box>
            <Box>
                <Link href={`/profile/${user && user?.username}`}>
                    <IconButton rounded={"100%"} >
                        <IoPersonOutline size={24} />
                    </IconButton>
                </Link>
            </Box>
            <Box>
                <IconButton rounded={"100%"} onClick={toggleColorMode}>
                    {
                        colorMode === "light" ? <FaRegMoon size={24} />
                            :
                            <LuSunMoon size={24} />
                    }

                </IconButton>
            </Box>
            <Box>
                <IconButton rounded={"100%"} p={1} onClick={handleLogout}>
                    <AiOutlineLogout size={24} />
                </IconButton>
            </Box>
        </HStack>
    )
}
export default Navbar