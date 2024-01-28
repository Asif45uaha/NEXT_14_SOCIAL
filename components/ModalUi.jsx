"use client"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Input, Image,
    HStack
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from 'next/navigation'


const ModalUi = ({ isOpen, onClose, title }) => {
    const router = useRouter()
    const { data: session } = useSession()
    const user = session?.user
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        profile: "",
        bio: ""
    })
    useEffect(() => {
        if (user) {
            setInputs({
                username: user?.username,
                email: user?.email,
                profile: user?.profile,
                bio: user?.bio
            })
        }
    }, [user])
    const [imgUrl, setImgUrl] = useState("")

    const uploadPhoto = (result) => {
        setImgUrl(result?.info?.secure_url)
    }
    const handleUpdateProfile = async () => {

        try {
            const res = await fetch("/api/users/update", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ ...inputs, profile: imgUrl ? imgUrl : inputs.profile, _id: user?._id })
            })

            if (res.ok) {

                onClose()
                setInputs({
                    username: "",
                    email: "",
                    profile: "",
                    bio: ""
                })
                router.push("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display={"flex"} flexDir={"column"} gap={4}>
                        <Input
                            type='text'
                            value={inputs.username}
                            onChange={(ev) => setInputs({ ...inputs, username: ev.target.value })}
                        />
                        <Input
                            type='email'
                            value={inputs.email}
                            onChange={(ev) => setInputs({ ...inputs, email: ev.target.value })}
                        />

                        <HStack align={"center"} justify={"space-between"}>
                            <CldUploadButton options={{ maxFiles: 1 }} onUpload={uploadPhoto} uploadPreset="kk8uk4rv">
                                <Image src={"/upload.png"} h={6} w={6} />
                            </CldUploadButton>
                            {
                                <Image src='/cancel.png' h={6} w={6} onClick={() => setImgUrl("")} />
                            }

                        </HStack>
                        <Input
                            placeholder='bio'
                            type='text'
                            value={inputs.bio}
                            onChange={(ev) => setInputs({ ...inputs, bio: ev.target.value })}
                        />

                        {
                            <Image src={imgUrl || inputs.profile} />
                        }


                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='solid' colorScheme={"teal"} onClick={handleUpdateProfile}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default ModalUi