import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

dayjs.extend(duration)
dayjs.extend(isSameOrAfter)

export const getTimeFormat = (time: number, dateType: number = 1) => {
    const dur = dayjs.duration(time, 'minutes')

    if (dateType === 2) {
        const hours = Math.floor(dur.asHours())
        const minutes = dur.minutes()
        return `${hours}h ${minutes}min`
    } else {
        const hours = String(Math.floor(dur.asHours())).padStart(2, '0')
        const minutes = String(dur.minutes()).padStart(2, '0')
        const seconds = String(Math.floor((time % 1) * 60)).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }
}

export const isOneDayDiff = (start: string, end: string) => {
    const d1 = dayjs(start).startOf('day')
    const d2 = dayjs(end).startOf('day')

    return Math.abs(d1.diff(d2, 'day')) === 1
}

export { dayjs }
