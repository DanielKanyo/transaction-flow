import { configureStore } from "@reduxjs/toolkit";

import balanceReducer from "./Features/Balance/BalanceSlice";
import settingsReducer from "./Features/Settings/SettingsSlice";

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        balance: balanceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
