import { useCallback } from "react"

export function useTimeUtils() {

    const formatToHrMin = useCallback((mins: number): string => {
        const hours = Math.floor(mins / 60)
        const minutes = Math.round(mins % 60)
        return `${hours} hr ${minutes < 10 ? '0' + minutes : minutes} min`
    }, [])

    return {
        formatToHrMin
    }
}