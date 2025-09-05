import { useMemo, useState } from "react";

import {
    Card,
    ScrollArea,
    Stack,
    Group,
    NumberFormatter,
    Badge,
    Text,
    useMantineColorScheme,
    useMantineTheme,
    Flex,
    Switch,
    HoverCard,
    Divider,
    Button,
    Tooltip,
    Center,
} from "@mantine/core";
import { IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { UTXO } from "../../Store/Features/Ledger/LedgerSlice";
import { Units, DEFAULT_NUMBER_OF_DIGITS } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { btcToSat } from "../../Utils/btc-to-sat-converter";

interface UtxoListProps {
    walletUtxos: UTXO[];
}

function UtxoList({ walletUtxos }: UtxoListProps) {
    const { unit } = useAppSelector((state) => state.settings);
    const [unspentChecked, setUnspentChecked] = useState<boolean>(true);
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();

    const formatAmount = (amount: number) => (unit === Units.Bitcoin ? amount.toFixed(DEFAULT_NUMBER_OF_DIGITS.BTC) : btcToSat(amount));

    const formatUnit = unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi;

    const unspentUtxos = useMemo(() => walletUtxos.filter((utxo) => !utxo.spent), [walletUtxos]);
    const spentUtxos = useMemo(() => walletUtxos.filter((utxo) => utxo.spent), [walletUtxos]);

    const displayedUtxos = useMemo(() => (unspentChecked ? unspentUtxos : walletUtxos), [unspentChecked, unspentUtxos, walletUtxos]);

    return (
        <>
            <Flex align="center" justify="space-between" m="xs">
                <Flex align="center" gap="xs">
                    <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="right">
                        <HoverCard.Target>
                            <IconInfoSquareRoundedFilled />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>UTXO (Unspent Transaction Output)</Text>
                                <Text fz="sm">
                                    When you receive Bitcoin, it comes in pieces called UTXOs. You can think of them like coins in your
                                    wallet: if someone sends you 0.3 BTC and later another 0.2 BTC, your wallet is holding two “coins” (two
                                    UTXOs). When you send Bitcoin, your wallet uses these coins (UTXOs) as inputs.
                                </Text>
                                <Divider />
                                <Text fz="sm">
                                    The number of UTXOs matters for the transaction fee — more UTXOs usually mean a higher fee, even if the
                                    total amount is the same. That's why it can sometimes make sense to consolidate your UTXOs (combine
                                    smaller ones into a bigger one) when fees are low.
                                </Text>
                                <Group>
                                    <Button
                                        fullWidth
                                        size="xs"
                                        component="a"
                                        href="https://en.wikipedia.org/wiki/Unspent_transaction_output"
                                        target="_blank"
                                    >
                                        Learn more
                                    </Button>
                                </Group>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                    <Text c="dimmed">Your UTXOs</Text>
                </Flex>
                <Group gap={6}>
                    <Badge variant="light" color="gray">
                        {spentUtxos.length}
                    </Badge>
                    <Tooltip label={`You have currently ${unspentUtxos.length} UTXO(s) in your wallet`} withArrow>
                        <Badge color="teal">{unspentUtxos.length}</Badge>
                    </Tooltip>
                    <Tooltip label="Show/hide spent UTXOs as well" withArrow position="top">
                        <div>
                            <Switch
                                checked={unspentChecked}
                                onChange={(event) => setUnspentChecked(event.currentTarget.checked)}
                                color="teal"
                                withThumbIndicator={false}
                            />
                        </div>
                    </Tooltip>
                </Group>
            </Flex>
            <Card h="50%" radius="md" bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[7]} p={0} pl="xs">
                <ScrollArea h="100%" scrollbarSize={6}>
                    <Stack gap="xs" my="xs" me="xs">
                        {walletUtxos.length === 0 ? (
                            <Center p="xs">
                                <Text c="dimmed">No UTXOs available...</Text>
                            </Center>
                        ) : (
                            displayedUtxos.map(({ txid, index, amount, spent }) => (
                                <Card key={`${txid}-${index}`} shadow="xs" p="md" radius="md">
                                    <Group justify="space-between" align="center">
                                        <Group gap={6} align="baseline">
                                            <Text size="lg" lh={1} fw={500}>
                                                <NumberFormatter value={formatAmount(amount)} thousandSeparator />
                                            </Text>
                                            <Text lh={1} size="sm" c="dimmed">
                                                {formatUnit}
                                            </Text>
                                        </Group>
                                        <Badge color={spent ? "red" : "teal"}>{spent ? "Spent" : "Unspent"}</Badge>
                                    </Group>
                                </Card>
                            ))
                        )}
                    </Stack>
                </ScrollArea>
            </Card>
        </>
    );
}

export default UtxoList;
