import { useTranslation } from "react-i18next";

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
    em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconHistory, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { RESPONSIVE_BREAKPOINT } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import GroupCard from "../GroupCard/GroupCard";
import classes from "./History.module.css";
import TransactionItem from "./TransactionItem";

function History() {
    const { transactions } = useAppSelector((state) => state.ledger);
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Card shadow="sm" padding={isMobile ? "xs" : "md"} radius="md" h="110%">
            <GroupCard bg="dark.7">
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <IconHistory />
                        {t("transactionHistory")}
                    </Flex>
                    <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end" radius="md">
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
                                    <List.Item maw={260}>
                                        <Text fz="sm">
                                            <b>Inputs</b> - the Bitcoin you already have (your UTXOs).
                                        </Text>
                                    </List.Item>
                                    <List.Item maw={260}>
                                        <Text fz="sm">
                                            <b>Outputs</b> - where the Bitcoin is going (the recipient address and, if needed, your change
                                            address).
                                        </Text>
                                    </List.Item>
                                    <List.Item maw={260}>
                                        <Text fz="sm">
                                            <b>Fee</b> - a small amount paid to miners so they include your transaction in the blockchain.
                                        </Text>
                                    </List.Item>
                                </List>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Flex>
            </GroupCard>
            <Card
                h="100%"
                radius="md"
                bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]}
                p={0}
                pl="xs"
                shadow="none"
            >
                <ScrollArea scrollbarSize={6} classNames={{ viewport: isMobile ? classes.viewport : undefined }}>
                    <Stack gap="xs" my="xs" me="xs">
                        {transactions.length === 0 ? (
                            <Center p="xs">
                                <Text c="dimmed">{t("noTransactionsFound")}</Text>
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
                                        layout="position"
                                    >
                                        <TransactionItem tx={tx} index={index} />
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
