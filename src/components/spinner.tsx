import { Spinner as ChakraSpinner, Center } from '@chakra-ui/react'
export const Spinner = () => {
    return (
        <Center pos="absolute" w="full" h="full" top="0" left="0" zIndex="9999" bg="gray.500/75">
            <ChakraSpinner size="lg" />
        </Center>
    )
}
