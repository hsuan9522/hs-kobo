import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StatisticsInfo {
    start: string
    title: string
    author: string
    minutes: number
    end: string
    backgroundColor: string
    borderColor: string
}

interface State {
    data: StatisticsInfo[]
}

const initialState: State = {
    data: [],
}

const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        setStatistics: (state, action: PayloadAction<StatisticsInfo[]>) => {
            console.log('setStatistics', action.payload)
            state.data = action.payload
        },
    },
})

export const { setStatistics } = statisticsSlice.actions
export default statisticsSlice.reducer
