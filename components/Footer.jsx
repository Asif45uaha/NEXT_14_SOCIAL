import { HStack, Text } from '@chakra-ui/react'
import Link from 'next/link'
const Footer = () => {
    return (
        <HStack w={["100%", "65%"]} mx={"auto"} py={4} justify={"space-between"} align={"center"}>
            <Text fontSize={"12px"} color={"gray"}>
                Copyright © 2024 - All right reserved
            </Text>
            <Text fontSize={"12px"} color={"gray"}>
                Powered by <Link href={'https://github.com/Asif45uaha'}>Aasif Ali</Link>
            </Text>
        </HStack>
    )
}
export default Footer