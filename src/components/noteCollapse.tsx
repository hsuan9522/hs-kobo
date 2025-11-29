import { NoteInfo } from '@/store/statistics.slice'
import { NoteType } from '@/types/enums'
import { Box, Collapsible, Flex, Icon, Show, Text } from '@chakra-ui/react'
import { LuPencil, LuPencilLine } from 'react-icons/lu'

const NoteCollapse = ({ item }: { item: NoteInfo }) => {

    // 有選取文字時，就不要收合了
    const handleClick = (event: React.MouseEvent) => {
        const selectedText = window.getSelection()?.toString()

        if (selectedText && selectedText.length > 0) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    return (
        <Collapsible.Root unmountOnExit defaultOpen={item.type === NoteType.Note}>
            <Collapsible.Trigger
                paddingY="3"
                textAlign="left"
                as="div"
                asChild
                onClick={handleClick}
            >
                <Flex gap="2">
                    <Box flexShrink="1">
                        <Icon color="gray.400">
                            {item.type === NoteType.Note ? (
                                <LuPencilLine />
                            ) : (
                                <LuPencil />
                            )}
                        </Icon>
                    </Box>
                    <Text>{item.text}</Text>
                </Flex>
            </Collapsible.Trigger>
            <Show when={item.type === NoteType.Note}>
                <Collapsible.Content>
                    <Box
                        padding="4"
                        ml="5"
                        mb="2"
                        borderWidth="1px"
                        rounded="lg"
                        borderColor="gray.300"
                    >
                        {item.annotation}
                    </Box>
                </Collapsible.Content>
            </Show>
        </Collapsible.Root>
    )
}

export default NoteCollapse
