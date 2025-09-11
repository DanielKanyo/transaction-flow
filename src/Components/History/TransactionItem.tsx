import { useMemo } from "react";

import { Card, Divider, Group, Stack, Text } from "@mantine/core";

import { Transaction } from "../../Store/Features/Ledger/LedgerSlice";
import { useAppSelector } from "../../Store/hook";

interface TransactionItemProps {
    tx: Transaction;
}

function TransactionItem({ tx }: TransactionItemProps) {
    const { advancedMode } = useAppSelector((state) => state.settings);

    const { from, to } = useMemo(() => {
        const from = tx.inputs[0].address.startsWith("bc1") ? "Wallet" : "Exchange";
        const to = tx.outputs[0].address.startsWith("bc1") ? "Wallet" : "Exchange";

        return { from, to };
    }, [tx]);

    if (advancedMode) {
        return (
            <Card shadow="xs" padding="sm" radius="md" bg="dark.7">
                {/* TODO */}
                <Text size="sm" fw={500}>
                    TxID: {tx.txid}
                </Text>
                <Text size="xs" c="dimmed">
                    Timestamp: {new Date(tx.timestamp).toLocaleString()}
                </Text>
                <Divider my="sm" />
                <Text size="sm" fw={500}>
                    Inputs:
                </Text>
                <Stack gap={2}>
                    {tx.inputs.map((input, idx) => (
                        <Text key={idx} size="xs">
                            {input.address} - {input.amount} BTC
                        </Text>
                    ))}
                </Stack>
                <Text size="sm" fw={500} mt="sm">
                    Outputs:
                </Text>
                <Stack gap={2}>
                    {tx.outputs.map((output, idx) => (
                        <Text key={idx} size="xs">
                            {output.address} - {output.amount} BTC
                        </Text>
                    ))}
                </Stack>
                <Text size="xs" mt="sm">
                    Fee: {tx.fee} BTC
                </Text>
            </Card>
        );
    }

    return (
        <Card shadow="xs" padding="sm" radius="md" bg="dark.7">
            {/* TODO */}
            <Group justify="space-between">
                <Text size="xs" c="dimmed">
                    {from} - {to}
                </Text>
                <Text size="xs" c="dimmed">
                    {new Date(tx.timestamp).toLocaleString()}
                </Text>
            </Group>

            <Divider my="sm" />

            <Group justify="space-between" align="flex-end">
                <Text size="xs" c="dimmed">
                    Outputs:
                    {tx.outputs.map((output, idx) => (
                        <Text key={idx} size="xs">
                            {output.amount} BTC
                        </Text>
                    ))}
                </Text>
                <Text size="xs" c="dimmed">
                    Fee: {tx.fee}
                </Text>
            </Group>
        </Card>
    );
}

export default TransactionItem;
