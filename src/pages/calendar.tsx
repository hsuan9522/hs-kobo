import FullCalendar from '@fullcalendar/react'
import { EventContentArg } from '@fullcalendar/core/index.js'
import multiMonthPlugin from '@fullcalendar/multimonth'
import dayjs from 'dayjs'
import {
    Flex,
    Text,
    Button,
    Box,
    FileUpload,
    FileUploadFileChangeDetails,
    Spinner,
} from '@chakra-ui/react'
import { toaster } from '@/components/ui/toaster'
import { useState } from 'react'
import { LuUpload } from 'react-icons/lu'
import initSqlJs, { Database } from 'sql.js'

const Calendar = () => {
    const [loading, setLoading] = useState(false)
    const [database, setDatabase] = useState<Database | null>(null)

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

    const calendarViews = {
        multiMonthTwoMonth: {
            type: 'multiMonth',
            duration: { months: 2 },
        },
    }

    const renderEventContent = (eventInfo: EventContentArg) => {
        return (
            <>
                <Text textStyle="xs" lineHeight="1" p="2px" truncate>
                    {eventInfo.event.title}
                </Text>
            </>
        )
    }

    const uploadFile = async (e: FileUploadFileChangeDetails) => {
        setLoading(true)
        try {
            const SQL = await initSqlJs({
                locateFile: (file) => `https://sql.js.org/dist/${file}`,
            })
            const file = e.acceptedFiles[0]
            const arrayBuffer = await file.arrayBuffer()
            const unitArray = new Uint8Array(arrayBuffer)

            const db = new SQL.Database(unitArray)
            setDatabase(db)
            const res = db.exec(`
                SELECT Date, Title, Author,
                CAST(printf('%.1f', SUM(ReadingTime) / 60.0) AS REAL) AS TotalMinutesRead
                FROM Analytics
                GROUP BY Date, Title
                HAVING TotalMinutesRead >= 1;
            `)
        } catch (e) {
            toaster.create({
                title: `讀取失敗 (${e})`,
                type: 'error',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex
            direction="column"
            align="center"
            justify="start"
            py="4"
            gap="8"
            height="90%"
            px={{ md: '20' }}
            mx={{ md: '20' }}
        >
            <Box w="full">
                <FileUpload.Root onFileChange={uploadFile} accept={'.sqlite'}>
                    <FileUpload.HiddenInput />
                    <FileUpload.Trigger asChild>
                        <Button variant="outline" size="sm" borderColor="gray.300">
                            <LuUpload /> Upload file
                        </Button>
                    </FileUpload.Trigger>
                    <FileUpload.List />
                </FileUpload.Root>
            </Box>
            {/* <Box position="relative" width={{ md: '60%', base: '100%' }}>
                {value && (
                    <Icon
                        position="absolute"
                        right="84px"
                        top="50%"
                        translate="0 -50%"
                        color="gray.400"
                        zIndex="1"
                        onClick={() => setValue('')}
                    >
                        <LuX />
                    </Icon>
                )}
                <Group attached w="full">
                    <Input
                        value={value}
                        flex="1"
                        pr="6"
                        borderColor="gray.300"
                        placeholder="Enter your url"
                        onChange={(e) => {
                            setValue(e.currentTarget.value)
                        }}
                    />
                    <Button onClick={submit}>Submit</Button>
                </Group>
            </Box> */}
            {loading && <Spinner />}
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
