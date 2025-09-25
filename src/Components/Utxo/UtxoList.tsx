import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

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
    em,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { UTXO } from "../../Store/Features/Ledger/LedgerSlice";
import { RESPONSIVE_BREAKPOINT, Units } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import UtxoItem from "./UtxoItem";
import classes from "./UtxoList.module.css";

const UTXO_TITLE_MARGIN = 10;
const UTXO_TITLE_CONTENT_HEIGHT = 25;

interface UtxoListProps {
    walletUtxos: UTXO[];
}

function UtxoList({ walletUtxos }: UtxoListProps) {
    const { unit } = useAppSelector((state) => state.settings);
    const formatedUnit = unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi;
    const { t } = useTranslation();
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);

    const unspentUtxos = useMemo(() => walletUtxos.filter((utxo) => !utxo.spent), [walletUtxos]);
    const spentUtxos = useMemo(() => walletUtxos.filter((utxo) => utxo.spent), [walletUtxos]);

    return (
        <>
            <Flex align="center" justify="space-between" my={UTXO_TITLE_MARGIN}>
                <Flex align="center" gap="xs" h={UTXO_TITLE_CONTENT_HEIGHT}>
                    <HoverCard width={320} shadow="md" openDelay={200} closeDelay={200} position="bottom-start" radius="lg">
                        <HoverCard.Target>
                            <IconInfoSquareRoundedFilled color={colorScheme === "light" ? theme.colors.dark[2] : theme.colors.dark[1]} />
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                            <Stack align="stretch" justify="center" gap="xs">
                                <Text fw={600}>{t("utxo")}</Text>
                                <Text fz="sm">{t("utxoExplanationPart1")}</Text>
                                <Divider />
                                <Text fz="sm">{t("utxoExplanationPart2")}</Text>
                                <Button
                                    fullWidth
                                    variant="gradient"
                                    gradient={{ from: "violet", to: "grape", deg: 90 }}
                                    component="a"
                                    href="https://en.wikipedia.org/wiki/Unspent_transaction_output"
                                    target="_blank"
                                    mt="sm"
                                    radius="xl"
                                >
                                    {t("learnMore")}
                                </Button>
                            </Stack>
                        </HoverCard.Dropdown>
                    </HoverCard>
                    <Text c="dimmed">{t("yourUtxos")}</Text>
                </Flex>
                <Group gap={6}>
                    <Tooltip label={<Trans i18nKey="xSpentUtxo" count={spentUtxos.length} />} radius="xl" withArrow>
                        <Badge color="gray" variant="light" radius="xl">
                            {spentUtxos.length}
                        </Badge>
                    </Tooltip>
                    <Tooltip label={<Trans i18nKey="xUnspentUtxo" count={unspentUtxos.length} />} radius="xl" withArrow>
                        <Badge color="teal" radius="xl">
                            {unspentUtxos.length}
                        </Badge>
                    </Tooltip>
                </Group>
            </Flex>
            <Card
                h={`calc(100% - ${UTXO_TITLE_MARGIN * 2 + UTXO_TITLE_CONTENT_HEIGHT}px`}
                radius="lg"
                bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[5]}
                p={0}
                pl="xs"
                shadow="none"
            >
                <ScrollArea classNames={{ viewport: isMobile ? classes.viewport : undefined }} scrollbarSize={2}>
                    <Stack gap="xs" my="xs" me="xs">
                        {walletUtxos.length === 0 ? (
                            <Center p="xs">
                                <Text c="dimmed">{t("noUtxosAvailable")}</Text>
                            </Center>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {[...walletUtxos]
                                    .sort((a, b) => Number(a.spent) - Number(b.spent))
                                    .map(({ txid, index, amount, spent, address }) => (
                                        <motion.div
                                            key={`${txid}-${index}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                            layout="position"
                                        >
                                            <UtxoItem
                                                amount={amount}
                                                spent={spent}
                                                address={address}
                                                formatedUnit={formatedUnit}
                                                unit={unit}
                                            />
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
