import { AnimatePresence, motion } from "framer-motion";

import { Card, Text, Stack, ScrollArea, Flex, useMantineTheme, useMantineColorScheme, Center } from "@mantine/core";
import { IconHistory, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { useAppSelector } from "../../Store/hook";
import TransactionItem from "./TransactionItem";

function History() {
    const { transactions } = useAppSelector((state) => state.ledger);
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Card shadow="sm" padding="md" radius="md" h="110%">
            <Card shadow="sm" padding="sm" radius="md" bg="gray" c="white" mb="sm" mih={50}>
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center">
                        <IconHistory />
                        Transaction History
                    </Flex>
                    <IconInfoSquareRoundedFilled />
                </Flex>
            </Card>
            <Card h="100%" radius="md" bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[7]} p={0} pl="xs">
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
