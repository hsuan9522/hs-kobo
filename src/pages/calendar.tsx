import FullCalendar from '@fullcalendar/react'
import { EventContentArg } from '@fullcalendar/core/index.js'
import multiMonthPlugin from '@fullcalendar/multimonth'
import dayjs from 'dayjs'
import { Flex, Text } from '@chakra-ui/react'

const Calendar = () => {
    const events = [
        {
            title: '1到時候會是中文字啊',
            date: dayjs().format('YYYY-MM-DD'),
        },
        {
            title: '2Meeting1',
            date: dayjs().format('YYYY-MM-DD'),
        },
        {
            title: '3到時候會是中文字啊',
            date: dayjs().format('YYYY-MM-DD'),
        },
        {
            title: '4Meeting1',
            date: dayjs().format('YYYY-MM-DD'),
        },
        {
            title: '5Meeting1',
            date: dayjs().format('YYYY-MM-DD'),
        },
    ]

    function renderEventContent(eventInfo: EventContentArg) {
        console.log(eventInfo)
        return (
            <>
                <Text textStyle="xs" lineHeight="1" p="2px" truncate>
                    {eventInfo.event.title}
                </Text>
            </>
        )
    }

    const calendarViews = {
        multiMonthTwoMonth: {
            type: 'multiMonth',
            duration: { months: 2 },
        },
    }

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            py="2"
            height="90%"
            px={{ md: '20' }}
            mx={{ md: '20' }}
        >
            <FullCalendar
                height={'100%'}
                aspectRatio={1.25}
                contentHeight={'auto'}
                plugins={[multiMonthPlugin]}
                initialView="multiMonthTwoMonth"
                multiMonthMaxColumns={2}
                views={calendarViews}
                events={events}
                eventContent={renderEventContent}
            />
        </Flex>
    )
}

export default Calendar
