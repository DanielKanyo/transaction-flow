import { useMemo } from "react";

import { Badge, Card, Divider, Group, Stack, Text } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

import { Transaction } from "../../Store/Features/Ledger/LedgerSlice";
import { useAppSelector } from "../../Store/hook";

enum AccountType {
    WALLET = "Wallet",
    EXCHANGE = "Exchange",
}

interface TransactionItemProps {
    tx: Transaction;
}

function TransactionItem({ tx }: TransactionItemProps) {
    const { advancedMode } = useAppSelector((state) => state.settings);
    const { walletAddresses } = useAppSelector((state) => state.ledger);

    const { from, to } = useMemo(() => {
        const inputFromWallet = tx.inputs.some((i) => walletAddresses.includes(i.address));
        const outputToWallet = tx.outputs.some((o) => walletAddresses.includes(o.address));
        const outputToExternal = tx.outputs.some((o) => !walletAddresses.includes(o.address));

        if (inputFromWallet && outputToExternal) {
            return { from: AccountType.WALLET, to: AccountType.EXCHANGE }; // Sending out (even if change comes back)
        }
        if (!inputFromWallet && outputToWallet) {
            return { from: AccountType.EXCHANGE, to: AccountType.WALLET }; // Receiving
        }
        if (inputFromWallet && outputToWallet && !outputToExternal) {
            return { from: AccountType.WALLET, to: AccountType.WALLET }; // Pure internal (consolidation)
        }
        return { from: AccountType.EXCHANGE, to: AccountType.EXCHANGE }; // No wallet involvement
    }, [tx, walletAddresses]);

    const transferredAmount = useMemo(() => {
        if (from === AccountType.WALLET && to === AccountType.EXCHANGE) {
            // Sum outputs to external addresses (not in walletAddresses)
            return tx.outputs.filter((output) => !walletAddresses.includes(output.address)).reduce((sum, output) => sum + output.amount, 0);
        }
        if (from === AccountType.EXCHANGE && to === AccountType.WALLET) {
            // Sum outputs to wallet addresses
            return tx.outputs.filter((output) => walletAddresses.includes(output.address)).reduce((sum, output) => sum + output.amount, 0);
        }
        if (from === AccountType.WALLET && to === AccountType.WALLET) {
            // Sum all outputs (all go to wallet addresses for consolidation)
            return tx.outputs.reduce((sum, output) => sum + output.amount, 0);
        }
        // Exchange → Exchange: No wallet involvement, so no transferred amount
        return 0;
    }, [tx, walletAddresses, from, to]);

    if (advancedMode) {
        return (
            <Card shadow="xs" padding="sm" radius="md" bg="dark.7">
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
                <Text size="xs" mt="xs" fw={500}>
                    Transferred: {transferredAmount} BTC
                </Text>
            </Card>
        );
    }

    return (
        <Card shadow="xs" padding="sm" radius="md" bg="dark.7">
            <Group justify="space-between" align="center">
                <Group align="center" gap={6}>
                    <Badge color={from === AccountType.EXCHANGE ? "blue" : "teal"} size="sm">
                        {from}
                    </Badge>
                    <IconArrowRight color="gray" size={16} />
                    <Badge color={to === AccountType.EXCHANGE ? "blue" : "teal"} size="sm">
                        {to}
                    </Badge>
                </Group>

                <Text size="xs" c="dimmed">
                    {new Date(tx.timestamp).toLocaleString()}
                </Text>
            </Group>

            <Divider my="sm" />

            <Group justify="space-between" align="flex-end">
                <Group gap="xs" align="baseline">
                    <Text size="xs" c="dimmed">
                        Amount:
                    </Text>
                    <Text size="xs">{transferredAmount} BTC</Text>
                </Group>
                <Group gap="xs" align="baseline">
                    <Text size="xs" c="dimmed">
                        Fee:
                    </Text>
                    <Text size="xs">{tx.fee}</Text>
                </Group>
            </Group>
        </Card>
    );
}

export default TransactionItem;
