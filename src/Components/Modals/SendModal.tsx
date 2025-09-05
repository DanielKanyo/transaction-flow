import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, TextInput, NumberInput, Button, Group, Text, Stack } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";

import { ADDRESSES, createTransaction, DEFAULT_FEE, UTXO } from "../../Store/Features/Ledger/LedgerSlice";
import { buildTransaction } from "../../Utils/transaction-builder";

type SendModalProps = {
    title: string;
    opened: boolean;
    senderAddress: ADDRESSES;
    recipientAddress: ADDRESSES;
    utxos: UTXO[];
    color: string;
    close: () => void;
};

function SendModal({ title, opened, senderAddress, recipientAddress, utxos, color, close }: SendModalProps) {
    const [dummyRecipentAddress, setDummyRecipentAddress] = useState("");
    const [amount, setAmount] = useState<string | number>("");
    const dispatch = useDispatch();

    const totalBalance = useMemo(() => {
        return utxos.filter((utxo) => !utxo.spent && utxo.address === senderAddress).reduce((sum, utxo) => sum + utxo.amount, 0);
    }, [utxos, senderAddress]);

    const send = useCallback(
        (_recipient: string, amount: number, fee: number) => {
            const tx = buildTransaction({
                utxos,
                senderAddress,
                recipientAddress,
                amountToSend: amount,
                fee,
            });

            if (tx) {
                dispatch(createTransaction(tx));

                close();
            }
        },
        [utxos, senderAddress, recipientAddress, dispatch, close]
    );

    const isValid = dummyRecipentAddress.length > 0 && typeof amount === "number" && amount > 0 && amount + DEFAULT_FEE <= totalBalance;

    return (
        <Modal opened={opened} onClose={close} title={title} centered>
            <Stack>
                <TextInput
                    label="Recipient Address"
                    placeholder="Paste wallet address"
                    value={dummyRecipentAddress}
                    onChange={(e) => setDummyRecipentAddress(e.currentTarget.value)}
                    required
                />

                <NumberInput label="Amount to Send (BTC)" placeholder="e.g. 0.5" value={amount} onChange={setAmount} min={0} required />

                <Text mt="sm">
                    Transaction Fee: <strong>{DEFAULT_FEE} BTC</strong>
                </Text>
            </Stack>

            <Group justify="flex-end" mt="xl" gap="xs">
                <Button variant="light" color="gray" onClick={close}>
                    Cancel
                </Button>
                <Button
                    color={color}
                    onClick={() => {
                        if (isValid) send(dummyRecipentAddress, amount as number, DEFAULT_FEE);
                    }}
                    disabled={!isValid}
                    leftSection={<IconArrowUp size={20} />}
                >
                    Send
                </Button>
            </Group>
        </Modal>
    );
}

export default SendModal;
