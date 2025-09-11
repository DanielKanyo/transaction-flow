import { useMemo } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
    Card,
    ScrollArea,
    Stack,
    Group,
    Badge,
    Text,
    useMantineColorScheme,
    useMantineTheme,
    Flex,
    HoverCard,
    Divider,
    Button,
    Tooltip,
    Center,
} from "@mantine/core";
import { IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { UTXO } from "../../Store/Features/Ledger/LedgerSlice";
import { Units } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import UtxoItem from "./UtxoItem";

const UTXO_TITLE_MARGIN = 10;
const UTXO_TITLE_CONTENT_HEIGHT = 25;

interface UtxoListProps {
    walletUtxos: UTXO[];
}

function UtxoList({ walletUtxos }: UtxoListProps) {
    const { unit } = useAppSelector((state) => state.settings);
    const formatedUnit = unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi;
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const unspentUtxos = useMemo(() => walletUtxos.filter((utxo) => !utxo.spent), [walletUtxos]);
    const spentUtxos = useMemo(() => walletUtxos.filter((utxo) => utxo.spent), [walletUtxos]);

    return (
        <>
            <Flex align="center" justify="space-between" m={UTXO_TITLE_MARGIN}>
                <Flex align="center" gap="xs" h={UTXO_TITLE_CONTENT_HEIGHT}>
                    <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-start">
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
                                    The number of UTXOs matters for the transaction fee - more UTXOs usually mean a higher fee, even if the
                                    total amount is the same. That's why it can sometimes make sense to consolidate your UTXOs (combine
                                    smaller ones into a bigger one) when fees are low.
                                </Text>
                                <Button
                                    fullWidth
                                    component="a"
                                    href="https://en.wikipedia.org/wiki/Unspent_transaction_output"
                                    target="_blank"
                                >
                                    Learn more
                                </Button>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                    <Text c="dimmed">Your UTXOs</Text>
                </Flex>
                <Group gap={6}>
                    <Tooltip label={`${spentUtxos.length} spent UTXO${spentUtxos.length > 0 ? 's' : ''}`} withArrow>
                        <Badge variant="light" color="gray">
                            {spentUtxos.length}
                        </Badge>
                    </Tooltip>
                    <Tooltip label={`${unspentUtxos.length} unspent UTXO${unspentUtxos.length > 0 ? 's' : ''}`} withArrow>
                        <Badge color="teal">{unspentUtxos.length}</Badge>
                    </Tooltip>
                </Group>
            </Flex>
            <Card
                h={`calc(100% - ${UTXO_TITLE_MARGIN * 2 + UTXO_TITLE_CONTENT_HEIGHT}px`}
                radius="md"
                bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]}
                p={0}
                pl="xs"
                shadow="none"
            >
                <ScrollArea scrollbarSize={6}>
                    <Stack gap="xs" my="xs" me="xs">
                        {walletUtxos.length === 0 ? (
                            <Center p="xs">
                                <Text c="dimmed">No UTXOs available...</Text>
                            </Center>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {walletUtxos.map(({ txid, index, amount, spent, address }) => (
                                    <motion.div
                                        key={`${txid}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25 }}
                                        layout
                                    >
                                        <UtxoItem amount={amount} spent={spent} address={address} formatedUnit={formatedUnit} unit={unit} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </Stack>
                </ScrollArea>
            </Card>
        </>
    );
}

export default UtxoList;
