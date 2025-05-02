import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loading.slice'
import statisticsReducer from './statistics.slice'

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        statistics: statisticsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
