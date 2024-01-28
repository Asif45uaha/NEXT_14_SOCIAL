"use client"
import { useColorMode, Box } from '@chakra-ui/react'
import { FaRegMoon } from 'react-icons/fa6'
import { LuSunMoon } from 'react-icons/lu'
const AuthColorMode = () => {

    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box onClick={toggleColorMode} display={"flex"} justifyContent={"center"} marginTop={10}>
            {
                colorMode === "light" ? <FaRegMoon size={24} /> : <LuSunMoon size={24} />
            }
        </Box>
    )
}
export default AuthColorMode