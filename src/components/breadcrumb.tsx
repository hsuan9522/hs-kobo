import { useRoute } from '@/hooks/useRoute'
import { Breadcrumb, Bleed, Box } from '@chakra-ui/react'
import { LiaSlashSolid } from 'react-icons/lia'
import { LuHouse } from 'react-icons/lu'

export const HBreadcrumb = () => {
    const { currentRoute } = useRoute()
    const pathName = currentRoute?.path

    return (
        <Box>
            <Bleed>
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href="/">
                                <LuHouse />
                            </Breadcrumb.Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Separator>
                            <LiaSlashSolid />
                        </Breadcrumb.Separator>
                        <Breadcrumb.Item>
                            <Breadcrumb.Link href={pathName}>{currentRoute?.label}</Breadcrumb.Link>
                        </Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </Bleed>
        </Box>
    )
}
