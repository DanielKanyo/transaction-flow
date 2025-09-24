import { describe, it, expect, vi } from "vitest";

import { UTXO, Transaction } from "../Store/Features/Ledger/LedgerSlice";
import { buildTransaction } from "./transaction-builder";

// mock uuidv4 to return deterministic value
vi.mock("uuid", () => ({
    v4: () => "test-uuid",
}));

// freeze Date for deterministic timestamp
const FIXED_DATE = "2025-01-01T00:00:00.000Z";
vi.useFakeTimers();
vi.setSystemTime(new Date(FIXED_DATE));

describe("buildTransaction", () => {
    const sender = "sender1";
    const recipient = "recipient1";

    const makeUtxo = (amount: number, overrides: Partial<UTXO> = {}): UTXO => ({
        txid: "utxo-txid",
        index: 0,
        amount,
        address: sender,
        spent: false,
        ...overrides,
    });

    it("should create a transaction with change output if change > dust threshold", () => {
        const utxos = [makeUtxo(2)];
        const amountToSend = 1;
        const fee = 0.0001;

        const tx = buildTransaction({
            utxos,
            senderAddresses: [sender],
            recipientAddress: recipient,
            amountToSend,
            fee,
        }) as Transaction;

        expect(tx).not.toBeNull();
        expect(tx.txid).toBe("test-uuid");
        expect(tx.timestamp).toBe(FIXED_DATE);
        expect(tx.inputs).toEqual([utxos[0]]);
        expect(tx.fee).toBe(fee);
        expect(tx.transferredAmount).toBe(amountToSend);

        // outputs
        expect(tx.outputs[0]).toEqual({ address: recipient, amount: amountToSend });
        expect(tx.outputs[1].address).toBe(sender);
        expect(tx.outputs[1].amount).toBeCloseTo(2 - amountToSend - fee);
    });

    it("should not include change output if change is below dust threshold", () => {
        const utxos = [makeUtxo(1)];
        const amountToSend = 1 - 0.00000001; // just enough that change is very small
        const fee = 0.00000001;

        const tx = buildTransaction({
            utxos,
            senderAddresses: [sender],
            recipientAddress: recipient,
            amountToSend,
            fee,
        }) as Transaction;

        expect(tx.outputs).toHaveLength(1);
        expect(tx.outputs[0]).toEqual({ address: recipient, amount: amountToSend });
    });

    it("should return null when funds are insufficient", () => {
        const utxos = [makeUtxo(0.5)];
        const amountToSend = 1;
        const fee = 0.0001;

        const tx = buildTransaction({
            utxos,
            senderAddresses: [sender],
            recipientAddress: recipient,
            amountToSend,
            fee,
        });

        expect(tx).toBeNull();
    });

    it("should select multiple UTXOs when one is not enough", () => {
        const utxos = [makeUtxo(0.4), makeUtxo(0.7)];
        const amountToSend = 1;
        const fee = 0.0001;

        const tx = buildTransaction({
            utxos,
            senderAddresses: [sender],
            recipientAddress: recipient,
            amountToSend,
            fee,
        }) as Transaction;

        expect(tx.inputs).toHaveLength(2);
        expect(tx.outputs[0]).toEqual({ address: recipient, amount: amountToSend });
    });

    it("should use the last sender address for change output", () => {
        const utxos = [makeUtxo(2)];
        const amountToSend = 1;
        const fee = 0.0001;
        const senderAddresses = ["sender1", "sender2", "change-address"];

        const tx = buildTransaction({
            utxos,
            senderAddresses,
            recipientAddress: recipient,
            amountToSend,
            fee,
        }) as Transaction;

        expect(tx.outputs[1].address).toBe("change-address");
    });
});
