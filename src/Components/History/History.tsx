import { AnimatePresence, motion } from "framer-motion";

import {
    Card,
    Text,
    Stack,
    ScrollArea,
    Flex,
    useMantineTheme,
    useMantineColorScheme,
    Center,
    Divider,
    HoverCard,
    List,
    Code,
} from "@mantine/core";
import { IconChevronRight, IconHistory, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { useAppSelector } from "../../Store/hook";
import TransactionItem from "./TransactionItem";

function History() {
    const { transactions } = useAppSelector((state) => state.ledger);
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const arrow = <IconChevronRight size={14} />;

    return (
        <Card shadow="sm" padding="md" radius="md" h="110%">
            <Card shadow="sm" padding="sm" radius="md" bg="dark.7" c="white" mb="sm" mih={50}>
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center">
                        <IconHistory />
                        Transaction History
                    </Flex>
                    <HoverCard width={495} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end">
                        <HoverCard.Target>
                            <IconInfoSquareRoundedFilled />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>Bitcoin Transaction</Text>
                                <Text fz="sm">
                                    A Bitcoin transaction is the process of sending Bitcoin from one address to another. It works like
                                    moving digital coins from your wallet to someone else's.
                                </Text>
                                <Divider />
                                <Text fz="sm">Each transaction has three main parts:</Text>
                                <List>
                                    <List.Item maw={430}>
                                        <Text fz="sm">
                                            <b>Inputs</b> - the Bitcoin you already have (your UTXOs).
                                        </Text>
                                    </List.Item>
                                    <List.Item maw={430}>
                                        <Text fz="sm">
                                            <b>Outputs</b> - where the Bitcoin is going (the recipient address and, if needed, your change
                                            address).
                                        </Text>
                                    </List.Item>
                                    <List.Item maw={430}>
                                        <Text fz="sm">
                                            <b>Fee</b> - a small amount paid to miners so they include your transaction in the blockchain.
                                        </Text>
                                    </List.Item>
                                </List>
                                <Divider />
                                <Text fw={600}>How a Transaction Flows</Text>
                                <Code color="dark" block>
                                    <Flex align="center">
                                        Wallet or Exchange {arrow} Mempool {arrow} Miner {arrow} New Block {arrow} Blockchain
                                    </Flex>
                                </Code>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Flex>
            </Card>
            <Card h="100%" radius="md" bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]} p={0} pl="xs" shadow="none">
                <ScrollArea scrollbarSize={6}>
                    <Stack gap="xs" my="xs" me="xs">
                        {transactions.length === 0 ? (
                            <Center p="xs">
                                <Text c="dimmed">No transactions found...</Text>
                            </Center>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {transactions.map((tx, index) => (
                                    <motion.div
                                        key={`${tx.txid}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25 }}
                                        layout
                                    >
                                        <TransactionItem tx={tx} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </Stack>
                </ScrollArea>
            </Card>
        </Card>
    );
}

export default History;
