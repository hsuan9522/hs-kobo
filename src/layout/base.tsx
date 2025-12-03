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
            <Flex w="full" justify="space-between" align="center" pb={{ xl: '4', base: '2' }}>
                <HBreadcrumb />
                {location.pathname === '/' || hasParams ? <></> : <UploadField />}
            </Flex>
            <Box
                id="router_view"
                w="full"
                flexGrow="1"
                display="flex"
                overflow={{ md: 'hidden', base: 'auto' }}
                pb={{ md: '0', base: '10' }}
                mb={{ md: '80px', base: '0' }}
                alignItems={{ md: 'center', base: 'flex-start' }}
                css={{
                    maskImage:
                        'linear-gradient(0deg,rgba(241, 241, 241, 0) 1%, rgba(241, 241, 241, 1) 15%);',
                }}
            >
                <Outlet />
            </Box>
            <Menu />
        </Flex>
    )
}

export default BaseLayout
