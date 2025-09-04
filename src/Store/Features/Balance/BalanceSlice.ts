import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Balance = {
    onExchange: number;
    inWallet: number;
};

const initBalance: Balance = {
    onExchange: 1,
    inWallet: 0,
};

export const balanceSlice = createSlice({
    name: "balance",
    initialState: initBalance,
    reducers: {
        updateBalanceOnExchange: (state, action: PayloadAction<number>) => {
            state.onExchange = action.payload;
        },
        updateBalanceInWallet: (state, action: PayloadAction<number>) => {
            state.inWallet = action.payload;
        },
    },
});

export const { updateBalanceOnExchange, updateBalanceInWallet } = balanceSlice.actions;
export default balanceSlice.reducer;
