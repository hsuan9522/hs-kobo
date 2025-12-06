import { useAppDispatch } from '@/hooks/useRedux'
import { endLoading, startLoading } from '@/store/loading.slice'
import { formatStatistics, syncNotes } from '@/store/statistics.slice'
import { FileUpload, HStack, Button, FileUploadFileChangeDetails, Box } from '@chakra-ui/react'
import { LuUpload } from 'react-icons/lu'
import { toaster } from '@/components/ui/toaster'
import initSqlJs from 'sql.js'
import { setFile, setIsKoboDataBase } from '@/store/common.slice'

export const UploadField = ({
    showFile = false,
    successCallback,
}: {
    showFile?: boolean
    successCallback?: () => void
}) => {
    const dispatch = useAppDispatch()

    const uploadFile = async (e: FileUploadFileChangeDetails) => {
        dispatch(startLoading())
        try {
            const SQL = await initSqlJs({
                locateFile: (file) => `https://sql.js.org/dist/${file}`,
            })
            const file = e.acceptedFiles[0]
            const arrayBuffer = await file.arrayBuffer()
            const unitArray = new Uint8Array(arrayBuffer)

            const db = new SQL.Database(unitArray)

            const isKoboDatabase = !db.exec(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='Analytics';"
            )[0]
            dispatch(setIsKoboDataBase(isKoboDatabase))

            let notes = []
            if (isKoboDatabase) {
                notes = db.exec(`
                    SELECT c.title AS Title, b.DateCreated, b.Text, b.Annotation, b.Type,
                    strftime('%Y-%m-%d', b.DateCreated, 'localtime') AS DateString,
                    c.Attribution AS Author
                    FROM bookmark AS b
                    JOIN content AS c
                    ON b.VolumeID = c.ContentID
                    WHERE b.Text IS NOT NULL
                    OR b.Type != 'dogear'
                    ORDER BY Title,
                    DateString ASC;
                `)
            } else {
                const res = db.exec(`
                    SELECT Date, Title, Author,
                    CAST(printf('%.1f', SUM(ReadingTime) / 60.0) AS REAL) AS TotalMinutesRead
                    FROM Analytics
                    GROUP BY Date, Title
                    HAVING TotalMinutesRead >= 1;
                `)

                await dispatch(formatStatistics(res[0].values))

                notes = db.exec(`
                    SELECT Title, DateCreated, Text, Annotation, Type,
                    strftime( '%Y-%m-%d',DateCreated, 'localtime') as DateString 
                    FROM Bookmark 
                    WHERE Text is NOT NULL OR Type != 'dogear'
                    ORDER BY Title, DateString ASC
                `)
            }
            await dispatch(syncNotes(notes[0].values))
            dispatch(setFile(file.name))
            if (successCallback) successCallback()
        } catch (e) {
            toaster.create({
                title: `讀取失敗 (${e})`,
                type: 'error',
            })
            console.log(e)
        } finally {
            dispatch(endLoading())
        }
    }

    return (
        <Box>
            <FileUpload.Root
                onFileChange={uploadFile}
                accept={'.sqlite'}
                flexDirection="row"
                alignItems="center"
            >
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                    <HStack h="54px">
                        <Button variant="outline" size="sm" borderColor="gray.300">
                            <LuUpload /> Upload file
                        </Button>
                    </HStack>
                </FileUpload.Trigger>
                {showFile ? <FileUpload.List /> : <></>}
            </FileUpload.Root>
        </Box>
    )
}
