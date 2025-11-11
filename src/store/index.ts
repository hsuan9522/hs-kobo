import { configureStore } from '@reduxjs/toolkit'
import loadingReducer from './loading.slice'
import statisticsReducer from './statistics.slice'
import commonReducer from './common.slice'

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        statistics: statisticsReducer,
        common: commonReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
