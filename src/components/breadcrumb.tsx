import { useAppSelector } from '@/hooks/useRedux'
import { useRoute } from '@/hooks/useRoute'
import { Breadcrumb, Bleed, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { LiaSlashSolid } from 'react-icons/lia'
import { LuHouse } from 'react-icons/lu'
import { Link } from 'react-router'

export const HBreadcrumb = () => {
    const { rootRoute, routerParams } = useRoute()
    const pathName = rootRoute?.path || ''
    const books = useAppSelector((state) => state.statistics.books)

    const [bookName, setBookName] = useState('')

    useEffect(() => {
        const bookId = routerParams.bookId || null
        if (!bookId || rootRoute?.path !== 'notes' || !books[+bookId]) {
            setBookName('')
        } else {
            setBookName(books[+bookId].title)
        }
    }, [routerParams, rootRoute, books])

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
                            <Breadcrumb.Link asChild>
                                <Link to={pathName}>{rootRoute?.label}</Link>
                            </Breadcrumb.Link>
                        </Breadcrumb.Item>
                        {bookName && (
                            <>
                                <Breadcrumb.Separator>
                                    <LiaSlashSolid />
                                </Breadcrumb.Separator>
                                <Breadcrumb.Item>{bookName}</Breadcrumb.Item>
                            </>
                        )}
                    </Breadcrumb.List>
                </Breadcrumb.Root>
            </Bleed>
        </Box>
    )
}
