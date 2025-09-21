import { Trans, useTranslation } from "react-i18next";

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
import GroupCard from "../GroupCard";
import classes from "./History.module.css";
import TransactionItem from "./TransactionItem";

function History() {
    const { transactions } = useAppSelector((state) => state.ledger);
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Card shadow="sm" padding={isMobile ? "xs" : "md"} radius="lg" h="110%">
            <GroupCard bg="linear-gradient(90deg, var(--mantine-color-dark-filled), var(--mantine-color-dark-5))">
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <IconHistory />
                        {t("transactionHistory")}
                    </Flex>
                    <HoverCard width={320} shadow="md" openDelay={200} closeDelay={200} position="bottom-end" radius="lg">
                        <HoverCard.Target>
                            <IconInfoSquareRoundedFilled />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>Bitcoin {t("transactions")}</Text>
                                <Text fz="sm">{t("transactionProcessExplanationPart1")}</Text>
                                <Divider />
                                <Text fz="sm">{t("transactionProcessExplanationPart2")}</Text>
                                <List>
                                    <List.Item maw={260}>
                                        <Text fz="sm">
                                            <Trans
                                                i18nKey="transactionProcessExplanationPart3"
                                                components={{
                                                    bold: <b />,
                                                }}
                                            />
                                        </Text>
                                    </List.Item>
                                    <List.Item maw={260}>
                                        <Text fz="sm">
                                            <Trans
                                                i18nKey="transactionProcessExplanationPart4"
                                                components={{
                                                    bold: <b />,
                                                }}
                                            />
                                        </Text>
                                    </List.Item>
                                    <List.Item maw={260}>
                                        <Text fz="sm">
                                            <Trans
                                                i18nKey="transactionProcessExplanationPart5"
                                                components={{
                                                    bold: <b />,
                                                }}
                                            />
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
                radius="lg"
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
