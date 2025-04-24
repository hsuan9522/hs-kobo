import { Heading, Separator, Flex, IconButton } from '@chakra-ui/react'
import { LuHouse } from 'react-icons/lu'
import { useNavigate } from 'react-router'

const Error = () => {
    const navigate = useNavigate()

    return (
        <Flex direction="column" justify="center" align="center" height="100%" width="100%" gap="4">
            <Flex justify="center" align="center" gap="4" color="gray.700">
                <Heading size="2xl">404</Heading>
                <Separator orientation="vertical" height="8" borderColor="gray.300" />
                <Heading size="md" fontWeight="normal">
                    This page could not be found.
                </Heading>
            </Flex>
            <IconButton aria-label="home" onClick={() => navigate('/')} bg="gray.700">
                <LuHouse />
            </IconButton>
        </Flex>
    )
}

export default Error
