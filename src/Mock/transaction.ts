import { ADDRESSES, Transaction } from "../Store/Features/Ledger/LedgerSlice";

export const mockTransaction: Transaction = {
    txid: "36d37216-fc5b-444d-a14e-ad8371e771a0",
    timestamp: "2025-09-05T07:45:00Z",
    inputs: [
        {
            address: ADDRESSES.EXCHANGE_ADDRESS,
            amount: 1.0,
            index: 0,
            spent: false,
            txid: "5bc8ba09-02a9-4f33-9495-9e16e20959f9",
        },
    ],
    outputs: [
        {
            address: ADDRESSES.WALLET_ADDRESS,
            amount: 0.6,
        },
        {
            address: ADDRESSES.EXCHANGE_ADDRESS, // change back to exchange
            amount: 0.3999,
        },
    ],
    fee: 0.0001,
};
