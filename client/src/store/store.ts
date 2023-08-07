'use client'
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import {
    configureStore,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';
import mainSlice from './reducers/mainSlice';
import type { ThunkAction, Action } from "@reduxjs/toolkit"
import { UserState } from '@/types/types';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['messages']
}


const persistedReducer = persistReducer(persistConfig, mainSlice)

export const store = configureStore({

    reducer: {
        main: persistedReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({

            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<UserState>
> 