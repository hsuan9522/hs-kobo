import { useAppSelector } from '@/hooks/useRedux'
import { useTimeUtils } from '@/hooks/useTimeUtils'
import {
    Box,
    DataList,
    Drawer,
    Em,
    EmptyState,
    Flex,
    Heading,
    List,
    Separator,
    VStack,
    Link,
} from '@chakra-ui/react'
import { Chart, useChart } from '@chakra-ui/charts'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from 'recharts'
import { LuNotebookPen, LuNotepadText } from 'react-icons/lu'
import { Link as RouterLink } from 'react-router'

export const BookDrawer = ({
    open,
    onClose,
    title,
}: {
    open: boolean
    onClose?: () => void
    title: string
}) => {
    const { formatToHrMin } = useTimeUtils()
    const bookIdMap = useAppSelector((state) => state.statistics.bookIdMap)
    const bookId = bookIdMap[title]
    const book = useAppSelector((state) => state.statistics.books[bookId])
    const readingStats = book.data

    const chart = useChart({
        data: [...readingStats],
        series: [{ name: 'minutes', color: 'blue.solid' }],
    })

    return (
        <Drawer.Root open={open} onInteractOutside={onClose} size="md">
            <Drawer.Backdrop />
            <Drawer.Positioner padding={4}>
                <Drawer.Content rounded="md">
                    <Drawer.CloseTrigger />
                    <Drawer.Header>
                        <Drawer.Title>
                            《{title}》── <Em textStyle="md">{book.author}</Em>
                        </Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        {/* 資訊部分 */}
                        <DataList.Root orientation="horizontal">
                            <DataList.Item>
                                <DataList.ItemLabel>閱讀期間</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    {book.startDate} ~ {book.lastDate}
                                </DataList.ItemValue>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.ItemLabel>閱讀天數</DataList.ItemLabel>
                                <DataList.ItemValue>{book.days} 天</DataList.ItemValue>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.ItemLabel>閱讀時數</DataList.ItemLabel>
                                <DataList.ItemValue>
                                    {formatToHrMin(book.totalMinutes)}
                                </DataList.ItemValue>
                            </DataList.Item>
                        </DataList.Root>
                        {/* 閱讀時間圖表 */}
                        <Chart.Root maxH="3xs" chart={chart} pr="5" pt="5">
                            <AreaChart data={chart.data}>
                                <CartesianGrid
                                    stroke={chart.color('border.muted')}
                                    vertical={false}
                                />
                                <XAxis
                                    axisLine={false}
                                    tickLine={false}
                                    dataKey="date"
                                    angle={30}
                                    tickFormatter={chart.formatDate({
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                    textAnchor="start"
                                />
                                <Tooltip
                                    cursor={false}
                                    animationDuration={100}
                                    content={
                                        <Chart.Tooltip
                                            formatter={(value) => `時數: ${formatToHrMin(value)}`}
                                            hideSeriesLabel
                                        />
                                    }
                                />
                                {chart.series.map((item) => (
                                    <Area
                                        key={item.name}
                                        isAnimationActive={false}
                                        dataKey={chart.key(item.name)}
                                        fill={chart.color(item.color)}
                                        fillOpacity={0.2}
                                        stroke={chart.color(item.color)}
                                        stackId="a"
                                    />
                                ))}
                            </AreaChart>
                        </Chart.Root>
                        {/* 筆記 */}
                        <Box pt="6" px="1">
                            <Flex align="center" gap="1">
                                <LuNotebookPen />
                                <Heading size="lg">筆記</Heading>
                            </Flex>
                            <Separator my="2" />
                            <List.Root pl="4">
                                {book.notes.slice(0, 3).map((item) => (
                                    <List.Item key={item.date} py="1">
                                        {item.text}
                                    </List.Item>
                                ))}
                            </List.Root>
                            {book.notes.length > 0 ? (
                                <Flex justify="end" pt="5">
                                    <Link
                                        // 用 as 之後，不知道為什麼 to 還是會報錯
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        to="/notes"
                                        as={RouterLink}
                                        color="gray.500"
                                        variant="underline"
                                    >
                                        Read more...
                                    </Link>
                                </Flex>
                            ) : (
                                <EmptyState.Root>
                                    <EmptyState.Indicator>
                                        <LuNotepadText />
                                    </EmptyState.Indicator>
                                    <VStack align="center">
                                        <EmptyState.Description pt="4">
                                            Nothing here.
                                        </EmptyState.Description>
                                    </VStack>
                                </EmptyState.Root>
                            )}
                        </Box>
                    </Drawer.Body>
                    <Drawer.Footer />
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    )
}
