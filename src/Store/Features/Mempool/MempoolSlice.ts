import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Transaction } from "../Ledger/LedgerSlice";

export type Mempool = {
    transactions: Transaction[];
};

const initMempool: Mempool = {
    transactions: [],
};

export const mempoolSlice = createSlice({
    name: "mempool",
    initialState: initMempool,
    reducers: {
        addTransactionToMempool: (state, action: PayloadAction<Transaction>) => {
            state.transactions.push(action.payload);
        },
        clearMempool: (state) => {
            state.transactions = [];
        },
    },
});

export const { addTransactionToMempool, clearMempool } = mempoolSlice.actions;
export default mempoolSlice.reducer;
