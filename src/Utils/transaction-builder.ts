import { v4 as uuidv4 } from "uuid";

import { UTXO, Transaction } from "../Store/Features/Ledger/LedgerSlice";

export function buildTransaction({
    utxos,
    senderAddress,
    recipientAddress,
    amountToSend,
    fee,
}: {
    utxos: UTXO[];
    senderAddress: string;
    recipientAddress: string;
    amountToSend: number;
    fee: number;
}): Transaction | null {
    const availableUTXOs = utxos.filter((u) => !u.spent && u.address === senderAddress);

    let selectedUTXOs: UTXO[] = [];
    let totalSelected = 0;

    for (const utxo of availableUTXOs) {
        selectedUTXOs.push(utxo);
        totalSelected += utxo.amount;
        if (totalSelected >= amountToSend + fee) break;
    }

    if (totalSelected < amountToSend + fee) {
        console.warn("Insufficient funds");
        return null;
    }

    const change = totalSelected - amountToSend - fee;

    const outputs = [
        {
            address: recipientAddress,
            amount: amountToSend,
        },
    ];

    if (change > 0) {
        outputs.push({
            address: senderAddress,
            amount: change,
        });
    }

    const transaction: Transaction = {
        txid: uuidv4(),
        timestamp: new Date().toISOString(),
        inputs: selectedUTXOs,
        outputs,
        fee,
    };

    return transaction;
}
