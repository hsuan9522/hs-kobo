import { useAppSelector } from '@/hooks/useRedux'
import { useTimeUtils } from '@/hooks/useTimeUtils'
import { DataList, Drawer, Em } from '@chakra-ui/react'
import { Chart, useChart } from '@chakra-ui/charts'
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from 'recharts'

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
                                    content={<Chart.Tooltip formatter={(value) => `時數: ${formatToHrMin(value)}`} hideSeriesLabel/>}
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
                    </Drawer.Body>
                    <Drawer.Footer />
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    )
}
