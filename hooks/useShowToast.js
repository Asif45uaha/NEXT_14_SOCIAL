import { useToast } from '@chakra-ui/react'
import { useCallback } from 'react'

const useShowToast = () => {
    const toast = useToast()
    const showToast = useCallback((title, description, status) => {
        toast({
            title: title,
            description: description,
            status: status,
            isClosable: true,
            duration: 4000,
            position: "top"
        })
    })
    return showToast
}
export default useShowToast