import { Outlet, useLocation } from 'react-router'
import { Flex } from '@chakra-ui/react'
import { Menu } from '@/components/menu'
import { HBreadcrumb } from '@/components/breadcrumb'
import { UploadField } from '@/components/uploadField'

const BaseLayout = () => {
    const location = useLocation()

    return (
        <Flex padding={{ md: '8', base: '4' }} h="full" w="full" flexDir="column">
            <Flex w="full" justify="space-between" align="center" pb={{ xl: '4', base: '2' }}>
                <HBreadcrumb />
                {location.pathname === '/' ? <></> : <UploadField />}
            </Flex>
            <Outlet />
            <Menu />
        </Flex>
    )
}

export default BaseLayout
