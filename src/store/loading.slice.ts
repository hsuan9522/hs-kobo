import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'

interface State {
    loadingCount: number
}

const initialState: State = {
    loadingCount: 0,
}

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        startLoading: (state) => {
            state.loadingCount++
        },
        endLoading: (state) => {
            state.loadingCount--
        },
    },
})

export const { startLoading, endLoading } = loadingSlice.actions
export const isLoading = (state: RootState) => state.loading.loadingCount > 0

export default loadingSlice.reducer
