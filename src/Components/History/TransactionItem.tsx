import { useMemo } from "react";

import { Badge, Card, Divider, Group, Stack, Text, NumberFormatter } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

import { Transaction } from "../../Store/Features/Ledger/LedgerSlice";
import { Units } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { determineDisplayedValueAndNumOfDecimals } from "../../Utils/number-of-decimals";

enum AccountType {
    WALLET = "Wallet",
    EXCHANGE = "Exchange",
}

interface TransactionItemProps {
    tx: Transaction;
    index: number;
}

function TransactionItem({ tx, index }: TransactionItemProps) {
    const { walletAddresses } = useAppSelector((state) => state.ledger);
    const { unit, advancedMode } = useAppSelector((state) => state.settings);

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

    const fee = useMemo(() => determineDisplayedValueAndNumOfDecimals(tx.fee, unit), [tx, unit]);
    const formattedUnit = useMemo(() => (unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi), [unit]);

    return (
        <Card shadow="xs" padding="md" radius="md" bg="dark.7">
            <Group justify="space-between">
                <Group align="center" gap={6}>
                    <Badge color="gray" size="sm" variant="light">
                        {index + 1}
                    </Badge>
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
            {advancedMode ? (
                <>
                    <Divider my="sm" />
                    <Text size="sm" fw={500} mb="xs" c="dimmed">
                        Inputs
                    </Text>
                    <Stack gap={2}>
                        {tx.inputs.map((input, idx) => (
                            <Group key={idx} justify="space-between" align="center">
                                <Text size="xs">{input.address}</Text>
                                <Group align="center" gap={4}>
                                    <Text size="xs">
                                        <NumberFormatter
                                            value={determineDisplayedValueAndNumOfDecimals(input.amount, unit).displayedValue}
                                            thousandSeparator
                                            decimalScale={determineDisplayedValueAndNumOfDecimals(input.amount, unit).numOfDecimals}
                                        />
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {" "}
                                        {formattedUnit}
                                    </Text>
                                </Group>
                            </Group>
                        ))}
                    </Stack>
                    <Divider my="sm" />
                    <Text size="sm" fw={500} mb="xs" c="dimmed">
                        Outputs
                    </Text>
                    <Stack gap={2}>
                        {tx.outputs.map((output, idx) => (
                            <Group key={idx} justify="space-between" align="center">
                                <Text size="xs">{output.address}</Text>
                                <Group align="center" gap={4}>
                                    <Text size="xs">
                                        <NumberFormatter
                                            value={determineDisplayedValueAndNumOfDecimals(output.amount, unit).displayedValue}
                                            thousandSeparator
                                            decimalScale={determineDisplayedValueAndNumOfDecimals(output.amount, unit).numOfDecimals}
                                        />
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {" "}
                                        {formattedUnit}
                                    </Text>
                                </Group>
                            </Group>
                        ))}
                    </Stack>
                    <Divider my="sm" />
                    <Group justify="space-between" align="baseline">
                        <Text size="sm" fw={500} c="dimmed">
                            Fee
                        </Text>
                        <Group align="center" gap={4}>
                            <Text size="xs">{fee.displayedValue}</Text>
                            <Text size="xs" c="dimmed">
                                {" "}
                                {formattedUnit}
                            </Text>
                        </Group>
                    </Group>
                </>
            ) : (
                <>
                    <Divider my="md" />
                    <Group align="baseline" justify="space-between">
                        <Group gap={4}>
                            <Text size="xs">
                                <NumberFormatter
                                    value={determineDisplayedValueAndNumOfDecimals(tx.transferredAmount, unit).displayedValue}
                                    thousandSeparator
                                    decimalScale={determineDisplayedValueAndNumOfDecimals(tx.transferredAmount, unit).numOfDecimals}
                                />
                            </Text>
                            <Text size="xs" c="dimmed">
                                {" "}
                                {formattedUnit}
                            </Text>
                        </Group>
                        <Group gap={4}>
                            <Text size="xs" c="dimmed">
                                Fee:
                            </Text>
                            <Text size="xs">
                                <NumberFormatter value={fee.displayedValue} thousandSeparator decimalScale={fee.numOfDecimals} />
                            </Text>
                            <Text size="xs" c="dimmed">
                                {" "}
                                {formattedUnit}
                            </Text>
                        </Group>
                    </Group>
                </>
            )}
        </Card>
    );
}

export default TransactionItem;
