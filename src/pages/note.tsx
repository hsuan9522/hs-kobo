import { BookDrawer } from '@/components/bookDrawer'
import NoteCollapse from '@/components/noteCollapse'
import { useAppSelector } from '@/hooks/useRedux'
import { useRoute } from '@/hooks/useRoute'
import { NoteInfo } from '@/store/statistics.slice'
import {
    GridItem,
    For,
    Heading,
    Em,
    Show,
    Text,
    Flex,
    Box,
    ActionBar,
    Portal,
    DownloadTrigger,
    IconButton,
    SimpleGrid,
    HStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { LuArrowLeft, LuDownload } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router'
import useGeneratePdf from '@/hooks/useGeneratePdf'

const Note = () => {
    const { routerParams } = useRoute()
    const navigate = useNavigate()
    const books = useAppSelector((state) => state.statistics.books)

    const bookId = routerParams.bookId || 0
    const book = books[+bookId]
    const [openDrawer, setOpenDrawer] = useState(false)

    useEffect(() => {
        if (!book) {
            navigate('/notes')
        }
    }, [book, navigate])

    // 計算內容權重，句子文字比重較高，註解文字比重次之
    const getContentWeight = (note: NoteInfo) => {
        const textLength = note.text.length
        const annotationLength = note.annotation.length ? note.annotation.length + 50 : 0
        return textLength * 2 + annotationLength
    }

    // 貪心演算法：將卡片分配到目前較矮的欄位
    const { left, right } = useMemo(() => {
        const notes = book?.notes || []
        const left: NoteInfo[] = []
        const right: NoteInfo[] = []
        let leftWeight = 0
        let rightWeight = 0
        const noteLength = notes.length - 1

        notes.forEach((note: NoteInfo, idx) => {
            const weight = getContentWeight(note)
            if (leftWeight <= rightWeight || idx === noteLength) {
                left.push(note)
                leftWeight += weight
            } else {
                right.push(note)
                rightWeight += weight
            }
        })

        return { left, right }
    }, [book])

    const { generatePDF, downloadLoading } = useGeneratePdf({
        title: book?.title,
        author: book?.author,
        notes: book?.notes,
    })

    return (
        <Show when={true}>
            <Flex
                flexDirection="column"
                pt="2"
                px={{ base: 4, md: 6 }}
                w="full"
                h="full"
                overflow="hidden"
            >
                <Heading my="1">
                    <Flex
                        px={{ base: 0, lg: 4 }}
                        ml={{ md: -2 }}
                        justifyContent="space-between"
                        flexDirection={{ base: 'column', md: 'row' }}
                    >
                        <HStack>
                            <Link to="/notes">
                                <IconButton rounded="full" size="xs" variant="subtle">
                                    <LuArrowLeft strokeWidth="3" />
                                </IconButton>
                            </Link>
                            <Text
                                textDecoration="underline"
                                onClick={() => setOpenDrawer(!openDrawer)}
                                cursor="pointer"
                                _hover={{ color: 'teal.700' }}
                            >
                                《{book?.title || ''}》
                            </Text>
                        </HStack>
                        <Box alignSelf="flex-end" ml="auto">
                            ── <Em textStyle="md">{book?.author || ''}</Em>
                        </Box>
                    </Flex>
                </Heading>
                {book?.title && (
                    <BookDrawer
                        title={book?.title}
                        open={openDrawer}
                        hideNotes={true}
                        onClose={() => setOpenDrawer(false)}
                    />
                )}
                <Box
                    flexGrow="1"
                    overflow="auto"
                    pt="28px"
                    mt="-3"
                    css={{
                        maskImage:
                            'linear-gradient(180deg,rgba(241, 241, 241, 0) 0.5%, rgba(241, 241, 241, 1) 9%)',
                    }}
                >
                    <SimpleGrid columns={[1, 1, 2]} gapX="14" mb="14">
                        <GridItem>
                            <For each={left}>
                                {(item, idx) => <NoteCollapse item={item} key={`note-${idx}`} />}
                            </For>
                        </GridItem>
                        <GridItem>
                            <For each={right}>
                                {(item, idx) => <NoteCollapse item={item} key={`note-${idx}`} />}
                            </For>
                        </GridItem>
                    </SimpleGrid>
                </Box>
            </Flex>
            <ActionBar.Root open={true}>
                <Portal>
                    <ActionBar.Positioner justifyContent="flex-end" pr="6">
                        <ActionBar.Content rounded="full" p="1">
                            <DownloadTrigger
                                data={generatePDF}
                                mimeType="application/pdf"
                                fileName="d.pdf"
                                as="div"
                            >
                                <IconButton
                                    rounded="full"
                                    variant="ghost"
                                    size="sm"
                                    loading={downloadLoading}
                                >
                                    <LuDownload />
                                </IconButton>
                            </DownloadTrigger>
                        </ActionBar.Content>
                    </ActionBar.Positioner>
                </Portal>
            </ActionBar.Root>
        </Show>
    )
}

export default Note
