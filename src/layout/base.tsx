import { Outlet, useLocation } from 'react-router'
import { Box, Flex } from '@chakra-ui/react'
import { Menu } from '@/components/menu'
import { HBreadcrumb } from '@/components/breadcrumb'
import { UploadField } from '@/components/uploadField'

const BaseLayout = () => {
    const location = useLocation()

    return (
        <Flex p={{ md: '8', base: '4' }} h="full" w="full" flexDir="column" overflow="hidden">
            <Flex w="full" justify="space-between" align="center" pb={{ xl: '4', base: '2' }}>
                <HBreadcrumb />
                {location.pathname === '/' ? <></> : <UploadField />}
            </Flex>
            <Box
                w="full"
                flexGrow="1"
                overflow="hidden"
                css={{
                    maskImage:
                        'linear-gradient(0deg,rgba(241, 241, 241, 0) 1%, rgba(241, 241, 241, 1) 15%)',
                }}
            >
                <Outlet />
            </Box>
            <Menu />
        </Flex>
    )
}

export default BaseLayout
