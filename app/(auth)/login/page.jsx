"use client"
import {
    VStack,
    Text,
    FormControl,
    Input,
    Button
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useShowToast from '@/hooks/useShowToast'

const LoginPage = () => {
    const showToast = useShowToast()
    const router = useRouter()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const handlelogin = async (ev) => {
        ev.preventDefault()
        try {
            const res = await signIn("credentials", {
                ...inputs,
                redirect: false
            })

            if (res.ok) {
                router.push("/")

            }
            showToast("success", "Login Success", "success")
            if (res.error) {
                showToast("Error", "Error in Login", "error")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <VStack justify={'center'} h={"100vh"} w={["100%", "40%"]} mx={"auto"} p={4}>
            <FormControl w={"100%"} p={[4, 8]} shadow={"lg"} rounded={"lg"} display={"flex"} flexDir={"column"} gap={4}>
                <Text
                    fontSize={"2xl"}
                    fontWeight={700}
                    textAlign={"center"}
                >
                    Login
                </Text>
                <Input
                    value={inputs.email}
                    onChange={(ev) => setInputs({ ...inputs, email: ev.target.value })}
                    type='email'
                    variant='flushed'
                    size={'lg'}
                    placeholder='Enter you Email' />
                <Input
                    value={inputs.password}
                    onChange={(ev) => setInputs({ ...inputs, password: ev.target.value })}
                    type='password'
                    variant='flushed'
                    size={'lg'}
                    placeholder='Enter you Password' />
                <Button onClick={handlelogin} type='submit' variant={"solid"} colorScheme={"teal"}>Login</Button>
                <Text textAlign={"center "} cursor={"pointer"} css={{
                    "&:hover": {
                        color: "blue"
                    }
                }} fontWeight={500}><Link href='/signup'>Doesn&apos;t Have an Account? Signup</Link></Text>
            </FormControl>
        </VStack>
    )
}
export default LoginPage