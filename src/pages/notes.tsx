import { useAppSelector } from '@/hooks/useRedux'
import {
    Box,
    Card,
    EmptyState,
    Flex,
    For,
    HStack,
    Icon,
    Link,
    Show,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react'
import { LuBookText, LuDot, LuNotebookText } from 'react-icons/lu'
import { useNavigate } from 'react-router'

const Notes = () => {
    const books = useAppSelector((state) => state.statistics.books)
    const bookIdMap = useAppSelector((state) => state.statistics.bookIdMap)
    const booksHasNotes = books.filter((item) => item.notes.length > 0)

    const navigate = useNavigate()

    const goToBook = (title: string) => {
        const bookId = bookIdMap[title]
        navigate(`/notes/${bookId}`)
    }

    const emptyElement = (
        <EmptyState.Root h="full" display="flex" flexDir="column" justifyContent="center">
            <EmptyState.Indicator>
                <LuNotebookText />
            </EmptyState.Indicator>
            <VStack align="center" mb="12">
                <EmptyState.Description pt="4">
                    這裡沒有留下什麼，開始筆記吧！
                </EmptyState.Description>
            </VStack>
        </EmptyState.Root>
    )

    return (
        <Box
            w="full"
            h="full"
            overflow="auto"
            mt={{ base: '4', md: '3' }}
            px={{ base: '2', md: '6' }}
            pb="12"
        >
            <Show when={booksHasNotes.length !== 0} fallback={emptyElement}>
                <SimpleGrid gap="4" minChildWidth={{ base: 'xs', md: 'sm' }} pb="9">
                    <For each={booksHasNotes}>
                        {(item) => (
                            // <GridItem key={`note-${idx}`}>
                            <Card.Root
                                overflow="hidden"
                                flexShrink="1"
                                cursor="pointer"
                                onClick={() => goToBook(item.title)}
                            >
                                <Card.Body colorPalette="teal">
                                    <Card.Title mb="2" fontSize="lg">
                                        <HStack>
                                            <LuBookText />
                                            {item.title}
                                        </HStack>
                                    </Card.Title>
                                    <Card.Description>
                                        <Flex gap="1" pl="1">
                                            <Icon strokeWidth="7" color="teal.500" mt="3px">
                                                <LuDot />
                                            </Icon>
                                            <Text lineClamp="2">{item.notes[0].text}</Text>
                                        </Flex>
                                    </Card.Description>
                                </Card.Body>
                                <Card.Footer justifyContent="flex-end">
                                    <Link
                                        onClick={() => goToBook(item.title)}
                                        variant="underline"
                                        colorPalette="teal"
                                        fontSize="sm"
                                        textAlign="right"
                                    >
                                        + More
                                    </Link>
                                </Card.Footer>
                            </Card.Root>
                            // </GridItem>
                        )}
                    </For>
                </SimpleGrid>
            </Show>
        </Box>
    )
}

export default Notes
