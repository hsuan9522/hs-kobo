import { Outlet, useLocation } from 'react-router'
import { Box, Flex } from '@chakra-ui/react'
import { Menu } from '@/components/menu'
import { HBreadcrumb } from '@/components/breadcrumb'
import { UploadField } from '@/components/uploadField'
import { useRoute } from '@/hooks/useRoute'

const BaseLayout = () => {
    const location = useLocation()
    const { routerParams } = useRoute()

    const hasParams = Object.keys(routerParams).length > 0

    return (
        <Flex p={{ md: '8', base: '4' }} h="full" w="full" flexDir="column" overflow="hidden">
            <Flex w="full" justify="space-between" align="center" pb="4" minH="70px">
                <HBreadcrumb />
                {location.pathname === '/' || hasParams ? <></> : <UploadField />}
            </Flex>
            <Box
                id="router_view"
                w="full"
                flexGrow="1"
                display="flex"
                overflow="hidden"
                alignItems={{ md: 'center', base: 'flex-start' }}
                css={{
                    maskImage:
                        'linear-gradient(0deg,rgba(241, 241, 241, 0) 1%, rgba(241, 241, 241, 1) 15%);',
                }}
            >
                <Box w="full" h="full" overflow={{ md: 'hidden', base: 'auto' }}>
                    <Outlet />
                </Box>
            </Box>
            <Menu />
        </Flex>
    )
}

export default BaseLayout
