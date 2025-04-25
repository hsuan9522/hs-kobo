import { Outlet } from 'react-router'
import { Box } from '@chakra-ui/react'
import { Menu } from '@/components/menu'
import { HBreadcrumb } from '@/components/breadcrumb'

const BaseLayout = () => {
    return (
        <Box padding={{ md: '10', base: '4' }} height="100%" width="100%">
            <HBreadcrumb />
            <Outlet />
            <Menu />
        </Box>
    )
}

export default BaseLayout
