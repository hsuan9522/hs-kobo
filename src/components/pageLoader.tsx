import { Flex, Spinner } from '@chakra-ui/react'

const PageLoader = () => {
    return (
        <Flex w="full" h="full" alignItems="center" justifyContent="center">
            <Spinner />
        </Flex>
    )
}

export default PageLoader