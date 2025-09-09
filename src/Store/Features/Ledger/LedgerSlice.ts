import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { generateDummyBTCAddress } from "../../../Utils/address";

const INITIAL_BTC_AMOUNT = 1;
const DUST_THRESHOLD = 0.00000546; // ~546 satoshis

export const DEFAULT_FEE = 0.000001;

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
    exchangeAddresses: string[];
    walletAddresses: string[];
    balanceOnExchange: number;
    exhangeUtxos: UTXO[];
    balanceInWallet: number;
    walletUtxos: UTXO[];
    transactions: Transaction[];
};

const createInitialLedgerState = (): LedgerState => {
    const exchangeAddr = generateDummyBTCAddress("3");
    const walletAddr = generateDummyBTCAddress("bc1q");

    return {
        exchangeAddresses: [exchangeAddr],
        walletAddresses: [walletAddr],
        balanceOnExchange: INITIAL_BTC_AMOUNT,
        exhangeUtxos: [
            {
                txid: "genesis_exchange_tx",
                index: 0,
                amount: INITIAL_BTC_AMOUNT,
                address: exchangeAddr, // set properly
                spent: false,
            },
        ],
        balanceInWallet: 0,
        walletUtxos: [],
        transactions: [],
    };
};

const initialState = createInitialLedgerState();

export const ledgerSlice = createSlice({
    name: "ledger",
    initialState,
    reducers: {
        createTransaction: (state, action: PayloadAction<Transaction>) => {
            const tx = action.payload;

            // Mark inputs as spent and deduct balances
            tx.inputs.forEach((input) => {
                const isWallet = state.walletAddresses.includes(input.address);
                const isExchange = state.exchangeAddresses.includes(input.address);
                const utxoList = isWallet ? state.walletUtxos : state.exhangeUtxos;

                const utxo = utxoList.find((u) => u.txid === input.txid && u.index === input.index);
                if (utxo) utxo.spent = true;

                if (isWallet) {
                    state.balanceInWallet -= input.amount;
                } else if (isExchange) {
                    state.balanceOnExchange -= input.amount;
                }
            });

            // Add outputs (only if above dust threshold)
            tx.outputs.forEach((output, index) => {
                if (output.amount < DUST_THRESHOLD) {
                    return;
                }

                const isWallet = state.walletAddresses.includes(output.address);
                const isExchange = state.exchangeAddresses.includes(output.address);
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
                } else if (isExchange) {
                    state.balanceOnExchange += output.amount;
                }
            });

            state.transactions.push(tx);
        },

        generateNewWalletAddress: (state) => {
            const newAddr = generateDummyBTCAddress("bc1q");

            state.walletAddresses.push(newAddr);
        },

        generateNewExchangeAddress: (state) => {
            const newAddr = generateDummyBTCAddress("3"); // P2SH-like

            state.exchangeAddresses.push(newAddr);
        },

        resetLedger: () => createInitialLedgerState(),
    },
});

export const selectLatestWalletAddress = (state: { ledger: LedgerState }) => {
    const { walletAddresses } = state.ledger;

    return walletAddresses[walletAddresses.length - 1];
};

export const selectLatestExchangeAddress = (state: { ledger: LedgerState }) => {
    const { exchangeAddresses } = state.ledger;

    return exchangeAddresses[exchangeAddresses.length - 1];
};

export const { createTransaction, generateNewWalletAddress, generateNewExchangeAddress, resetLedger } = ledgerSlice.actions;
export default ledgerSlice.reducer;
