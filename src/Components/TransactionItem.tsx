import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Badge, Card, Divider, Group, Stack, Text, NumberFormatter, useMantineColorScheme, useMantineTheme, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";

import { Transaction } from "../Store/Features/Ledger/LedgerSlice";
import { RESPONSIVE_BREAKPOINT, Units } from "../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../Store/hook";
import { determineDisplayedValueAndNumOfDecimals } from "../Utils/number-of-decimals";

enum AccountType {
    WALLET = "wallet",
    EXCHANGE = "exchange",
    UNKNOWN = "unknown",
}

const ADDRESS_BREAKPOINT_INDEX = 11;

function UnitLabel({ children }: { children: React.ReactNode }) {
    return (
        <Text size="xs" c="dimmed">
            {children}
        </Text>
    );
}

interface AddressListProps {
    label: string;
    items: { address: string; amount: number }[];
    unit: Units;
    formattedUnit: string;
    isMobile: boolean;
}

function AddressList({ label, items, unit, formattedUnit, isMobile }: AddressListProps) {
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
                            <Text size="xs" style={{ wordBreak: "break-all" }}>
                                {isMobile
                                    ? `${item.address.slice(0, ADDRESS_BREAKPOINT_INDEX)}...${item.address.slice(-ADDRESS_BREAKPOINT_INDEX)}`
                                    : item.address}
                            </Text>
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

interface TransactionItemProps {
    tx: Transaction;
    index: number;
}

function TransactionItem({ tx, index }: TransactionItemProps) {
    const { walletAddresses, exchangeAddresses } = useAppSelector((state) => state.ledger);
    const { unit, advancedMode } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);

    const { from, to } = useMemo(() => {
        const inputFromExchange = tx.inputs.some((i) => exchangeAddresses.includes(i.address));
        const inputFromWallet = tx.inputs.some((i) => walletAddresses.includes(i.address));
        const outputToWallet = walletAddresses.includes(tx.outputs[0].address);
        const outputToExchange = exchangeAddresses.includes(tx.outputs[0].address);
        const outputToUnknown = !walletAddresses.includes(tx.outputs[0].address) && !exchangeAddresses.includes(tx.outputs[0].address);

        // input from exchange, output to wallet
        if (inputFromExchange && outputToWallet) {
            return { from: AccountType.EXCHANGE, to: AccountType.WALLET };
        }
        // input from wallet, output to exchange
        if (inputFromWallet && outputToExchange) {
            return { from: AccountType.WALLET, to: AccountType.EXCHANGE };
        }
        // input from wallet, output to wallet
        if (inputFromWallet && outputToWallet) {
            return { from: AccountType.WALLET, to: AccountType.WALLET };
        }
        // input from wallet, output to unknown
        if (inputFromWallet && outputToUnknown) {
            return { from: AccountType.WALLET, to: AccountType.UNKNOWN };
        }
        // input from exchange, output to unknown
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
        <Card shadow="xs" padding="md" radius="lg" bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}>
            <Group justify="space-between">
                <Group align="center" gap={6}>
                    <Badge color="gray" variant="light" radius="xl">
                        {index + 1}
                    </Badge>
                    <Badge color={from === AccountType.EXCHANGE ? "blue" : "teal"} radius="xl">
                        {t(from)}
                    </Badge>
                    <IconArrowRight color="gray" size={16} />
                    <Badge color={toBadgeColor} variant={to === AccountType.UNKNOWN ? "light" : "filled"} radius="xl">
                        {t(to)}
                    </Badge>
                    {to === AccountType.UNKNOWN ? (
                        <Badge color="red" radius="xl">
                            {t("unrecoverable")}
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
                    <AddressList label={t("inputs")} items={tx.inputs} unit={unit} formattedUnit={formattedUnit} isMobile={isMobile} />
                    <Divider my="sm" />
                    <AddressList label={t("outputs")} items={tx.outputs} unit={unit} formattedUnit={formattedUnit} isMobile={isMobile} />
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
