import { useState, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { AnimatePresence, motion } from "framer-motion";

import {
    Card,
    Divider,
    Flex,
    HoverCard,
    Stack,
    Text,
    useMantineColorScheme,
    useMantineTheme,
    ActionIcon,
    Badge,
    Tooltip,
    Button,
    em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
    IconBlocks,
    IconClockHour10,
    IconInfoSquareRoundedFilled,
    IconPick,
    IconPlayerPlayFilled,
    IconPlayerTrackNextFilled,
} from "@tabler/icons-react";

import BackgroundBlobs from "../Components/BackgroundBlobs/BackgroundBlobs";
import GroupCard from "../Components/GroupCard";
import { addNewBlock, settleTransaction } from "../Store/Features/Ledger/LedgerSlice";
import { clearMempool } from "../Store/Features/Mempool/MempoolSlice";
import { RESPONSIVE_BREAKPOINT } from "../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../Store/hook";
import { COLORS } from "../Utils/colors";

const DEFAULT_CYCLE_DURATION = 600_000; // 10 minutes in ms

function MemoryPool() {
    const [cycle, setCycle] = useState(0);
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { colorScheme } = useMantineColorScheme();
    const [countdown, setCountdown] = useState(DEFAULT_CYCLE_DURATION / 1000); // seconds
    const [speed, setSpeed] = useState(1); // 1x or 10x
    const { t } = useTranslation();
    const { transactions } = useAppSelector((state) => state.mempool);
    const dispatch = useDispatch();

    // reset countdown when props change
    useEffect(() => {
        setCountdown(DEFAULT_CYCLE_DURATION / 1000);
    }, [DEFAULT_CYCLE_DURATION]);

    // pure countdown updater
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((c) => (c > 0 ? c - 1 : 0));
        }, 1000 / speed);

        return () => clearInterval(interval);
    }, [speed]);

    // mining logic when countdown hits 0
    useEffect(() => {
        if (countdown === 0) {
            transactions.forEach((tx) => {
                dispatch(settleTransaction(tx));
            });
            dispatch(clearMempool());
            dispatch(addNewBlock(Boolean(transactions.length)));

            // restart cycle
            setCountdown(DEFAULT_CYCLE_DURATION / 1000);
        }
    }, [countdown, transactions, dispatch]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (countdown === 0) {
            // reset countdown
            setCountdown(DEFAULT_CYCLE_DURATION / 1000);
            setCycle((c) => c + 1); // trigger new cycle
        }
    }, [countdown]);

    return (
        <Card shadow="sm" padding={isMobile ? "xs" : "md"} radius="lg" h="100%" style={{ boxShadow: "none" }}>
            <GroupCard bgImage="linear-gradient(90deg, var(--mantine-color-dark-filled), var(--mantine-color-dark-7))">
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <IconBlocks />
                        {t("memoryPool")}
                    </Flex>
                    <Flex gap="xs" align="center">
                        <ActionIcon.Group>
                            <Tooltip label={t("setSpeedTo1x")} radius="xl" withArrow>
                                <ActionIcon
                                    variant="filled"
                                    color="dark.5"
                                    aria-label="Play"
                                    radius="xl"
                                    onClick={() => setSpeed(1)}
                                    w={34}
                                >
                                    <IconPlayerPlayFilled size={14} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label={t("setSpeedTo10x")} radius="xl" withArrow>
                                <ActionIcon variant="filled" color="dark.5" aria-label="Next" onClick={() => setSpeed(10)} w={34}>
                                    <IconPlayerTrackNextFilled size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label={t("confirmTransactions")} radius="xl" withArrow>
                                <ActionIcon
                                    variant="filled"
                                    color="teal"
                                    aria-label="Mine"
                                    radius="xl"
                                    onClick={() => setCountdown(0)}
                                    w={34}
                                >
                                    <IconPick size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </ActionIcon.Group>
                        <HoverCard width={320} shadow="md" openDelay={200} closeDelay={200} position="bottom-end" radius="lg">
                            <HoverCard.Target>
                                <IconInfoSquareRoundedFilled />
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <Stack align="stretch" justify="center" gap="xs">
                                    <Text fw={600}>{t("memoryPool")} (Mempool)</Text>
                                    <Text fz="sm">
                                        <Trans
                                            i18nKey="memoryPoolExplanationPart1"
                                            components={{
                                                bold: <b />,
                                                italic: <i />,
                                            }}
                                        />
                                    </Text>
                                    <Divider />
                                    <Text fz="sm">
                                        <Trans
                                            i18nKey="memoryPoolExplanationPart2"
                                            components={{
                                                bold: <b />,
                                                italic: <i />,
                                            }}
                                        />
                                    </Text>
                                </Stack>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Flex>
                </Flex>
            </GroupCard>

            <Card
                h="100%"
                mih={106}
                radius="lg"
                bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]}
                p={0}
                shadow="none"
            >
                <Flex direction="row" justify="center" align="center" h="100%" mih={106} gap="lg" pos="relative">
                    <BackgroundBlobs cycle={cycle} />

                    <AnimatePresence>
                        {transactions.map((tx) => (
                            <Tooltip key={tx.txid} label={t("yourTransactionWaiting")} withArrow radius="xl">
                                <motion.div
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 50, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className="transaction"></div>
                                </motion.div>
                            </Tooltip>
                        ))}
                    </AnimatePresence>

                    <HoverCard width={260} shadow="md" openDelay={200} closeDelay={200} position="bottom-end" radius="lg">
                        <HoverCard.Target>
                            <Badge
                                pos="absolute"
                                variant="filled"
                                radius="xl"
                                size="lg"
                                h={28}
                                leftSection={<IconClockHour10 size={16} />}
                                style={{
                                    top: isMobile ? 9 : 12,
                                    right: isMobile ? 9 : 12,
                                    background: "rgba(46, 46, 46, 0.4)",
                                    backdropFilter: "blur(3px)",
                                }}
                            >
                                <Text fz={14} lh={1} miw={43} ta="right">
                                    {formatTime(countdown)}
                                </Text>
                            </Badge>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>{t("blockMiningTime")}</Text>
                                <Text fz="sm">
                                    <Trans
                                        i18nKey="blockMiningExplanation"
                                        components={{
                                            bold: <b />,
                                            italic: <i />,
                                        }}
                                    />
                                </Text>
                                <Button
                                    fullWidth
                                    variant="gradient"
                                    gradient={{ from: "violet", to: COLORS.PURPLE, deg: 90 }}
                                    component="a"
                                    href="https://mempool.space/"
                                    target="_blank"
                                    mt="sm"
                                    radius="xl"
                                >
                                    {t("learnMore")}
                                </Button>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                </Flex>
            </Card>
        </Card>
    );
}

export default MemoryPool;
