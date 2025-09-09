import { v4 as uuidv4 } from "uuid";

import { UTXO, Transaction, DUST_THRESHOLD } from "../Store/Features/Ledger/LedgerSlice";
import { btcToSat } from "./btc-to-sat-converter";

export function buildTransaction({
    utxos,
    senderAddresses,
    recipientAddress,
    amountToSend,
    fee,
}: {
    utxos: UTXO[];
    senderAddresses: string[];
    recipientAddress: string;
    amountToSend: number;
    fee: number;
}): Transaction | null {
    const availableUTXOs = utxos.filter((u) => !u.spent);

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

    if (btcToSat(change) > DUST_THRESHOLD) {
        outputs.push({
            address: senderAddresses[senderAddresses.length - 1],
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
