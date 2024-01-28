"use client"
import { Spinner, VStack, Box } from '@chakra-ui/react'
const LoaderComponent = () => {
    return (
        <VStack h={'90vh'} justifyContent='center'>
            <Box
                transform={'scale(3)'}
            >
                <Spinner size={'xl'} color='teal' />
            </Box>
        </VStack>
    )
}
export default LoaderComponent