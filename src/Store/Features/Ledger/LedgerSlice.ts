import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const INITIAL_BTC_AMOUNT = 1;

export const DEFAULT_FEE = 0.0001;

export enum ADDRESSES {
    EXCHANGE_ADDRESS = "exchange_address_1",
    WALLET_ADDRESS = "wallet_address_1",
}

export type UTXO = {
    txid: string;
    index: number;
    amount: number;
    address: string;
    spent: boolean;
};

export type Transaction = {
    txid: string;
    timestamp: string;
    inputs: UTXO[];
    outputs: {
        address: string;
        amount: number;
    }[];
    fee: number;
};

export type LedgerState = {
    balanceOnExchange: number;
    exhangeUtxos: UTXO[];
    balanceInWallet: number;
    walletUtxos: UTXO[];
    transactions: Transaction[];
};

const initialState: LedgerState = {
    balanceOnExchange: INITIAL_BTC_AMOUNT,
    exhangeUtxos: [
        {
            txid: "genesis_exchange_tx",
            index: 0,
            amount: INITIAL_BTC_AMOUNT,
            address: ADDRESSES.EXCHANGE_ADDRESS,
            spent: false,
        },
    ],
    balanceInWallet: 0,
    walletUtxos: [],
    transactions: [],
};

export const ledgerSlice = createSlice({
    name: "ledger",
    initialState,
    reducers: {
        createTransaction: (state, action: PayloadAction<Transaction>) => {
            const tx = action.payload;

            // Mark inputs as spent and deduct from balances
            tx.inputs.forEach((input) => {
                const isWallet = input.address === ADDRESSES.WALLET_ADDRESS;
                const utxoList = isWallet ? state.walletUtxos : state.exhangeUtxos;

                const utxo = utxoList.find((u) => u.txid === input.txid && u.index === input.index);
                if (utxo) utxo.spent = true;

                if (isWallet) {
                    state.balanceInWallet -= input.amount;
                } else {
                    state.balanceOnExchange -= input.amount;
                }
            });

            // Add outputs as new UTXOs and update balances
            tx.outputs.forEach((output, index) => {
                const isWallet = output.address === ADDRESSES.WALLET_ADDRESS;
                const utxoList = isWallet ? state.walletUtxos : state.exhangeUtxos;

                utxoList.push({
                    txid: tx.txid,
                    index,
                    amount: output.amount,
                    address: output.address,
                    spent: false,
                });

                if (isWallet) {
                    state.balanceInWallet += output.amount;
                } else {
                    state.balanceOnExchange += output.amount;
                }
            });

            // Add transaction to history
            state.transactions.push(tx);
        },

        resetState: () => initialState,
    },
});

export const { createTransaction, resetState } = ledgerSlice.actions;
export default ledgerSlice.reducer;
