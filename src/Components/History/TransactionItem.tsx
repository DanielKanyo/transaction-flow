import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Badge, Card, Divider, Group, Stack, Text, NumberFormatter, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";

import { Transaction } from "../../Store/Features/Ledger/LedgerSlice";
import { Units } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { determineDisplayedValueAndNumOfDecimals } from "../../Utils/number-of-decimals";

enum AccountType {
    WALLET = "wallet",
    EXCHANGE = "exchange",
    UNKNOWN = "unknown",
}

interface TransactionItemProps {
    tx: Transaction;
    index: number;
}

function UnitLabel({ children }: { children: React.ReactNode }) {
    return (
        <Text size="xs" c="dimmed">
            {children}
        </Text>
    );
}

function AddressList({
    label,
    items,
    unit,
    formattedUnit,
}: {
    label: string;
    items: { address: string; amount: number }[];
    unit: Units;
    formattedUnit: string;
}) {
    return (
        <>
            <Text size="sm" mb="xs" c="dimmed">
                {label}
            </Text>
            <Stack gap={2}>
                {items.map((item, idx) => {
                    const { displayedValue, numOfDecimals } = determineDisplayedValueAndNumOfDecimals(item.amount, unit);
                    return (
                        <Group key={idx} justify="space-between" align="center">
                            <Text size="xs">{item.address}</Text>
                            <Group align="center" gap={4}>
                                <Text size="xs">
                                    <NumberFormatter value={displayedValue} thousandSeparator decimalScale={numOfDecimals} />
                                </Text>
                                <UnitLabel>{formattedUnit}</UnitLabel>
                            </Group>
                        </Group>
                    );
                })}
            </Stack>
        </>
    );
}

function TransactionItem({ tx, index }: TransactionItemProps) {
    const { walletAddresses } = useAppSelector((state) => state.ledger);
    const { unit, advancedMode } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    // Determine from/to
    const { from, to } = useMemo(() => {
        const inputFromWallet = tx.inputs.some((i) => walletAddresses.includes(i.address));
        const outputToWallet = tx.outputs.some((o) => walletAddresses.includes(o.address));
        const outputToExternal = tx.outputs.some((o) => !walletAddresses.includes(o.address));

        if (inputFromWallet && outputToExternal) {
            return { from: AccountType.WALLET, to: AccountType.EXCHANGE };
        }
        if (!inputFromWallet && outputToWallet) {
            return { from: AccountType.EXCHANGE, to: AccountType.WALLET };
        }
        if (inputFromWallet && outputToWallet && !outputToExternal) {
            return { from: AccountType.WALLET, to: AccountType.WALLET };
        }
        return { from: AccountType.EXCHANGE, to: AccountType.UNKNOWN };
    }, [tx, walletAddresses]);

    // Precompute values
    const fee = useMemo(() => determineDisplayedValueAndNumOfDecimals(tx.fee, unit), [tx.fee, unit]);
    const transferred = useMemo(() => determineDisplayedValueAndNumOfDecimals(tx.transferredAmount, unit), [tx.transferredAmount, unit]);
    const formattedUnit = useMemo(() => (unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi), [unit]);

    const toBadgeColor = useMemo(() => {
        switch (to) {
            case AccountType.EXCHANGE:
                return "blue";
            case AccountType.WALLET:
                return "teal";
            default:
                return "gray";
        }
    }, [to]);

    return (
        <Card shadow="xs" padding="md" radius="md" bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}>
            <Group justify="space-between">
                <Group align="center" gap={6}>
                    <Badge color="gray" variant="light" radius="md">
                        {index + 1}
                    </Badge>
                    <Badge color={from === AccountType.EXCHANGE ? "blue" : "teal"} radius="md">
                        {t(from)}
                    </Badge>
                    <IconArrowRight color="gray" size={16} />
                    <Badge color={toBadgeColor} radius="md">
                        {t(to)}
                    </Badge>
                    {to === AccountType.UNKNOWN ? (
                        <Badge color="red" radius="md">
                            Lost coins
                        </Badge>
                    ) : null}
                </Group>

                <Text size="xs" c="dimmed">
                    {new Intl.DateTimeFormat(undefined, {
                        dateStyle: "short",
                        timeStyle: "short",
                    }).format(new Date(tx.timestamp))}
                </Text>
            </Group>

            <Divider my="sm" />

            {advancedMode ? (
                <>
                    <AddressList label="Inputs" items={tx.inputs} unit={unit} formattedUnit={formattedUnit} />
                    <Divider my="sm" />
                    <AddressList label="Outputs" items={tx.outputs} unit={unit} formattedUnit={formattedUnit} />
                    <Divider my="sm" />
                    <Group justify="space-between" align="baseline">
                        <Text size="sm" c="dimmed">
                            {t("transactionFee")}
                        </Text>
                        <Group align="center" gap={4}>
                            <Text size="xs">{fee.displayedValue}</Text>
                            <UnitLabel>{formattedUnit}</UnitLabel>
                        </Group>
                    </Group>
                </>
            ) : (
                <Group align="baseline" justify="space-between">
                    <Group gap={4}>
                        <Text size="xs">
                            <NumberFormatter
                                value={transferred.displayedValue}
                                thousandSeparator
                                decimalScale={transferred.numOfDecimals}
                            />
                        </Text>
                        <UnitLabel>{formattedUnit}</UnitLabel>
                    </Group>
                    <Group gap={4}>
                        <UnitLabel>{t("transactionFee")}:</UnitLabel>
                        <Text size="xs">
                            <NumberFormatter value={fee.displayedValue} thousandSeparator decimalScale={fee.numOfDecimals} />
                        </Text>
                        <UnitLabel>{formattedUnit}</UnitLabel>
                    </Group>
                </Group>
            )}
        </Card>
    );
}

export default TransactionItem;
