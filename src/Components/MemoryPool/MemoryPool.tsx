import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
} from "@mantine/core";
import {
    IconClockHour10,
    IconInfoSquareRoundedFilled,
    IconPick,
    IconPlayerPlayFilled,
    IconPlayerTrackNextFilled,
} from "@tabler/icons-react";

import { addNewBlock, settleTransaction } from "../../Store/Features/Ledger/LedgerSlice";
import { clearMempool } from "../../Store/Features/Mempool/MempoolSlice";
import { useAppSelector } from "../../Store/hook";
import BackgroundBlobs from "./BackgroundBlobs/BackgroundBlobs";

const DEFAULT_CYCLE_DURATION = 600_000; // 10 minutes in ms

function MemoryPool() {
    const [cycle, setCycle] = useState(0);
    const theme = useMantineTheme();
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
        <Card shadow="sm" padding="md" radius="md" h="100%">
            <Card shadow="sm" padding="sm" radius="md" bg="dark.7" c="white" mb="sm" mih={50} mah={50}>
                <Flex justify="space-between" align="center" h="100%">
                    <Flex gap="sm" align="center" lh={1}>
                        <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-start" radius="md">
                            <HoverCard.Target>
                                <IconInfoSquareRoundedFilled />
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <Stack align="stretch" justify="center" gap="xs">
                                    <Text fw={600}>Memory Pool (Mempool)</Text>
                                    <Text fz="sm">
                                        When you send a Bitcoin transaction, it doesn't go straight into the blockchain. First, it enters a
                                        waiting area called the memory pool (or <i>mempool</i> for short). Think of it like a{" "}
                                        <b>queue at the post office</b>: your transaction waits there until a miner picks it up and includes
                                        it in the next block.
                                    </Text>
                                    <Divider />
                                    <Text fz="sm">
                                        If you set a <b>higher fee</b>, your transaction usually gets picked faster. If the fee is low, it
                                        may stay longer in the mempool until space is available.
                                    </Text>
                                </Stack>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        {t("memoryPool")}
                    </Flex>
                    <Flex gap="xs" align="center">
                        <ActionIcon.Group>
                            <Tooltip label={t("setSpeedTo1x")} radius="md" withArrow>
                                <ActionIcon
                                    variant="filled"
                                    color="dark.5"
                                    aria-label="Play"
                                    radius="md"
                                    onClick={() => setSpeed(1)}
                                    w={32}
                                >
                                    <IconPlayerPlayFilled size={14} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label={t("setSpeedTo10x")} radius="md" withArrow>
                                <ActionIcon
                                    variant="filled"
                                    color="dark.5"
                                    aria-label="Next"
                                    radius="md"
                                    onClick={() => setSpeed(10)}
                                    w={32}
                                >
                                    <IconPlayerTrackNextFilled size={16} />
                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Confirm transactions now - instant mining" radius="md" withArrow>
                                <ActionIcon
                                    variant="filled"
                                    color="teal"
                                    aria-label="Mine"
                                    radius="md"
                                    onClick={() => setCountdown(0)}
                                    w={32}
                                >
                                    <IconPick size={16} />
                                </ActionIcon>
                            </Tooltip>
                        </ActionIcon.Group>
                        <Flex gap={4} align="center">
                            <HoverCard width={260} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end" radius="md">
                                <HoverCard.Target>
                                    <Badge
                                        color="dark.5"
                                        variant="filled"
                                        radius="md"
                                        size="lg"
                                        h={28}
                                        leftSection={<IconClockHour10 size={16} />}
                                    >
                                        <Text fz={14} lh={1} w={43} ta="right">
                                            {formatTime(countdown)}
                                        </Text>
                                    </Badge>
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Stack align="stretch" justify="center" gap="xs">
                                        <Text fw={600}>Block Mining Time</Text>
                                        <Text fz="sm">
                                            On average, Bitcoin miners find a new block every <b>10 minutes</b>. This countdown simulates
                                            that cycle. When it reaches 0, it restarts, just like the mempool is cleared into a new block.
                                        </Text>
                                        <Button fullWidth component="a" href="https://mempool.space/" target="_blank" color="violet">
                                            {t("learnMore")}
                                        </Button>
                                    </Stack>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>

            <Card h="100%" radius="md" bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]} p={0} shadow="none">
                <Flex direction="row" justify="center" align="center" h="100%" gap="lg" pos={"relative"}>
                    <BackgroundBlobs cycle={cycle} />

                    <AnimatePresence>
                        {transactions.map((tx) => (
                            <motion.div
                                key={tx.txid}
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="transaction"></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Flex>
            </Card>
        </Card>
    );
}

export default MemoryPool;
