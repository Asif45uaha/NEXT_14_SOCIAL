"use client"
import useShowToast from '@/hooks/useShowToast'
import {
    VStack,
    Text,
    FormControl,
    Input,
    Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const SignupPage = () => {
    const showToast = useShowToast()
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })
    const router = useRouter()
    const handleSignup = async (ev) => {
        ev.preventDefault()
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })
            if (res.ok) router.push("/login") // redirect to home page after successful signup
            if (res.ok) {
                showToast("Success", "User Created Success", "success")
            }
        } catch (error) {
            console.log(error);
            showToast("Error", "Error in creating the User", "error")
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
                    Signup
                </Text>
                <Input
                    value={inputs.username}
                    onChange={(ev) => setInputs({ ...inputs, username: ev.target.value })}
                    type='text'
                    variant='flushed'
                    size={'lg'}
                    placeholder='Enter you username' />
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
                <Button onClick={handleSignup} type='submit' variant={"solid"} colorScheme={"teal"}>Signup</Button>
                <Text textAlign={"center "} cursor={"pointer"} css={{
                    "&:hover": {
                        color: "blue"
                    }
                }} fontWeight={500}><Link href='/login'>Already Have an Account? Login</Link></Text>
            </FormControl>
        </VStack>
    )
}
export default SignupPage