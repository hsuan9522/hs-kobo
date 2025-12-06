import { NoteInfo } from '@/store/statistics.slice'
import { NoteType } from '@/types/enums'
import {
    Blockquote,
    Box,
    Circle,
    Clipboard,
    Collapsible,
    Flex,
    Float,
    Icon,
    Separator,
    Show,
    Text,
} from '@chakra-ui/react'
import { LuPencil, LuQuote } from 'react-icons/lu'

const NoteCollapse = ({ item, separator = true }: { item: NoteInfo; separator?: boolean }) => {
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
            <Collapsible.Trigger pt="4" textAlign="left" as="div" asChild onClick={handleClick}>
                <Flex gap="2">
                    <Box flexShrink="1">
                        <Icon color="teal">
                            {/* <FaPen /> */}
                            <LuPencil strokeWidth="2.5" />
                        </Icon>
                    </Box>
                    <Text>{item.text}</Text>
                </Flex>
            </Collapsible.Trigger>
            <Show when={item.type === NoteType.Note}>
                <Collapsible.Content>
                    <Blockquote.Root mt="3" ml="5" mb="2" borderLeftColor="teal.600">
                        <Float placement="middle-start">
                            <Circle bg="teal.600" size="5">
                                <Icon color="gray.100" fontSize="10px">
                                    <LuQuote />
                                </Icon>
                            </Circle>
                        </Float>
                        <Blockquote.Content>{item.annotation}</Blockquote.Content>
                    </Blockquote.Root>
                </Collapsible.Content>
            </Show>

            <Text
                textStyle="xs"
                textAlign="right"
                color="gray.400"
                mb="4"
                pt="2px"
                cursor="default"
                as="div"
            >
                <Flex justifyContent="flex-end" alignItems="center" gap="1">
                    <Clipboard.Root
                        asChild
                        value={item.annotation ? `${item.text}\n\n${item.annotation}` : item.text}
                        cursor="pointer"
                        _hover={{ color: 'teal.700' }}
                    >
                        <Clipboard.Trigger>
                            <Clipboard.Indicator />
                        </Clipboard.Trigger>
                    </Clipboard.Root>
                    {item.date}
                </Flex>
            </Text>
            <Show when={separator}>
                <Separator variant="dashed" size="md" />
            </Show>
        </Collapsible.Root>
    )
}

export default NoteCollapse
