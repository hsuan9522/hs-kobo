import { BookDrawer } from '@/components/bookDrawer'
import NoteCollapse from '@/components/noteCollapse'
import { useAppSelector } from '@/hooks/useRedux'
import { useRoute } from '@/hooks/useRoute'
import { NoteInfo } from '@/store/statistics.slice'
// import { NoteType } from '@/types/enums'
import {
    Grid,
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
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { LuDownload } from 'react-icons/lu'
import { useNavigate } from 'react-router'
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
        // const notes: NoteInfo[] = [
        //     {
        //         text: '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         annotation: '',
        //         date: '2025-03-30',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-03-30T12:07:25.538',
        //     },
        //     {
        //         text: '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         annotation:
        //             '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被並且再沒有別的影在黑暗裡。只有我被並且再沒有別的影在黑暗裡。只有我被並且再沒有別的影在黑暗裡。只有我被並且再沒有別的影在黑暗裡。只有我被並且再沒有別的影在黑暗裡。只有我被並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         date: '2025-03-30',
        //         type: NoteType.Note,
        //         isoDate: '2025-03-30T12:07:25.538',
        //     },
        //     {
        //         text: '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         annotation:
        //             '我獨自遠行，不但沒有你，並且再自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我界全屬於我自己。',
        //         date: '2025-03-30',
        //         type: NoteType.Note,
        //         isoDate: '2025-03-30T12:07:25.538',
        //     },
        //     {
        //         text: '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         annotation:
        //             '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         date: '2025-03-30',
        //         type: NoteType.Note,
        //         isoDate: '2025-03-30T12:07:25.538',
        //     },
        //     {
        //         text: '無數個世界任憑我隨意出入，而這世界只是其中的一個罷了。',
        //         annotation: '',
        //         date: '2025-03-30',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-03-30T12:08:29.196',
        //     },
        //     {
        //         text: '「蒼然暮色，自遠而至，至無所見而猶不欲歸。心凝形釋，與萬化冥合」',
        //         annotation: '',
        //         date: '2025-03-30',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-04-16T13:48:57.299',
        //     },
        //     {
        //         text: '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         annotation:
        //             '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         date: '2025-03-30',
        //         type: NoteType.Note,
        //         isoDate: '2025-03-30T12:07:25.538',
        //     },
        //     {
        //         text: '無數個世界任憑我隨意出入，而這世界只是其中的一個罷了。',
        //         annotation: '',
        //         date: '2025-03-30',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-03-30T12:08:29.196',
        //     },
        //     {
        //         text: '「蒼然暮色，自遠而至，至無所見而猶不欲歸。心凝形釋，與萬化冥合」',
        //         annotation: '',
        //         date: '2025-04-16',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-04-16T13:48:57.299',
        //     },
        //     {
        //         text: '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         annotation:
        //             '我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。我獨自遠行，不但沒有你，並且再沒有別的影在黑暗裡。只有我被黑暗沉沒，那世界全屬於我自己。',
        //         date: '2025-04-16',
        //         type: NoteType.Note,
        //         isoDate: '2025-03-30T12:07:25.538',
        //     },
        //     {
        //         text: '無數個世界任憑我隨意出入，而這世界只是其中的一個罷了。',
        //         annotation: '',
        //         date: '2025-04-16',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-03-30T12:08:29.196',
        //     },
        //     {
        //         text: '「蒼然暮色，自遠而至，至無所見而猶不欲歸。心凝形釋，與萬化冥合」',
        //         annotation: '',
        //         date: '2025-04-16',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-04-16T13:48:57.299',
        //     },
        //     {
        //         text: '饕餮過諸神的盛宴，從此人間膾炙都索然無味。',
        //         annotation: '',
        //         date: '2025-04-16',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-04-16T14:50:52.228',
        //     },
        //     {
        //         text: '我站在分岔處，前方有許多通道，每一條都深不見底。隨手扔進一顆石子，數十年後仍傳來回聲。我知道隨便選一個洞口進去，沿途都有奇妙的鐘乳和璀璨的結晶，每一條通道都無窮無盡，引人著魔。但我就是下不了決心去選擇。',
        //         annotation: '',
        //         date: '2025-04-27',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-04-27T15:13:14.822',
        //     },
        //     {
        //         text: '像你說的，每個洞穴都充滿誘惑，難以取捨。我年輕時也在分岔處猶豫過。後來我才明白，不是所有洞口都陳列在那裡，任人選擇；有的埋伏在暗處：我一腳踏空，就一頭栽了下來，到現在也沒有落到底。',
        //         annotation: '',
        //         date: '2025-04-27',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-04-27T15:14:24.493',
        //     },
        //     {
        //         text: '也許每個人無可名狀的命運都和現實中某樣具體的事物相牽連，但你無從得知究竟是何物。',
        //         annotation: '',
        //         date: '2025-08-31',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-08-31T08:01:01.466',
        //     },
        //     {
        //         text: '細小的齒輪像星體一樣完美地運轉著，將時間研磨成均等的顆粒。',
        //         annotation: '',
        //         date: '2025-10-02',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-10-01T22:05:19.331',
        //     },
        //     {
        //         text: '他們像飄墜在旁的枯葉，脆弱無用，卻藏著整座森林的祕密。',
        //         annotation: '',
        //         date: '2025-10-02',
        //         type: NoteType.Highlight,
        //         isoDate: '2025-10-01T22:20:22.285',
        //     },
        // ]
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
            <Flex flexDirection="column" px="6" w="full" h="full" overflow="hidden">
                <Heading mb="1">
                    <Flex px="4" justifyContent="space-between">
                        <Text
                            textDecoration="underline"
                            onClick={() => setOpenDrawer(!openDrawer)}
                            cursor="pointer"
                        >
                            《{book?.title || '夜晚的潛水艇'}》
                        </Text>
                        <Box alignSelf="flex-end">
                            ── <Em textStyle="md">{book?.author || '程春成'}</Em>
                        </Box>
                    </Flex>
                </Heading>
                {book?.title && (
                    <BookDrawer
                        title={book?.title}
                        open={openDrawer}
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
                    <Grid templateColumns="repeat(2, 1fr)" gapX={14} mb="14">
                        <GridItem>
                            <For each={left}>
                                {(item, idx) => (
                                    <NoteCollapse
                                        item={item}
                                        key={`note-${idx}`}
                                        separator={idx !== left.length - 1}
                                    />
                                )}
                            </For>
                        </GridItem>
                        <GridItem>
                            <For each={right}>
                                {(item, idx) => (
                                    <NoteCollapse
                                        item={item}
                                        key={`note-${idx}`}
                                        separator={idx !== right.length - 1}
                                    />
                                )}
                            </For>
                        </GridItem>
                    </Grid>
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
