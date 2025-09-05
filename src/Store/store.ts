import { configureStore } from "@reduxjs/toolkit";

import ledgerReducer from "./Features/Ledger/LedgerSlice";
import settingsReducer from "./Features/Settings/SettingsSlice";

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        ledger: ledgerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
