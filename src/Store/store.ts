import { configureStore } from "@reduxjs/toolkit";

import ledgerReducer from "./Features/Ledger/LedgerSlice";
import mempoolReducer from "./Features/Mempool/MempoolSlice";
import settingsReducer from "./Features/Settings/SettingsSlice";

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        ledger: ledgerReducer,
        mempool: mempoolReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
