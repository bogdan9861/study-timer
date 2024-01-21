import { configureStore } from '@reduxjs/toolkit';

import clock from '../slices/ClockSlice';
import main from '../slices/MainSlice'
import indicator from '../slices/IndicatorSlice'

const Store = configureStore({
    reducer: { clock, main, indicator },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
})

export default Store;