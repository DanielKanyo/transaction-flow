import { Card, Divider, Stack, Text } from "@mantine/core";

import { Transaction } from "../../Store/Features/Ledger/LedgerSlice";

interface TransactionItemProps {
    tx: Transaction;
}

function TransactionItem({ tx }: TransactionItemProps) {
    return (
        <Card shadow="xs" padding="sm" radius="md">
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

export default TransactionItem;
