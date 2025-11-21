import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bgColors: [
        '#F6D7C8',
        '#d3dee9',
        '#E2D0EB',
        '#BAE5D5',
        '#F8EDD1',
        '#C4DCF2',
        '#FBD3D7',
        '#D8E7F5',
        '#D6F5D6',
        '#E8DCCB',
    ],
    bdrColors: [
        '#d15700',
        '#41698A',
        '#542a87',
        '#0a5049',
        '#cb9800',
        '#183c8c',
        '#ab1f1f',
        '#0277a3',
        '#2f8f2f',
        '#8A5E3C',
    ],
    filename: '',
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setFile: (state, action) => {
            state.filename = action.payload
        }
    }
})

export const { setFile } = commonSlice.actions

export default commonSlice.reducer