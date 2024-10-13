import { configureStore } from '@reduxjs/toolkit';
import artReducer from './artSlice';

const store = configureStore({
    reducer: {
        art: artReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;