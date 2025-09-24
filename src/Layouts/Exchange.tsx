import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Button, Card, Divider, em, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import NumberFlow from "@number-flow/react";
import { IconArrowDown, IconArrowUp, IconExchange, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import GroupCard from "../Components/GroupCard";
import ReceiveModal from "../Components/ReceiveModal";
import SendModal from "../Components/SendModal";
import { selectLatestExchangeAddress } from "../Store/Features/Ledger/LedgerSlice";
import { RESPONSIVE_BREAKPOINT, Units, updateUnit } from "../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../Store/hook";
import { PADDING_BOTTOM_FOR_BALANCE, PADDING_TOP_FOR_BALANCE } from "../Utils/balance-padding";
import { determineDisplayedValueAndNumOfDecimals } from "../Utils/number-of-decimals";

const BUTTON_MARGIN = 5;

function Exchange() {
    const [sendModalOpened, { open: openSendModal, close: closeSendModal }] = useDisclosure(false);
    const [receiveModalOpened, { open: openReceiveModal, close: closeReceiveModal }] = useDisclosure(false);
    const { unit } = useAppSelector((state) => state.settings);
    const { balanceOnExchange: balance, exchangeAddresses } = useAppSelector((state) => state.ledger);
    const { exhangeUtxos } = useAppSelector((state) => state.ledger);
    const latestAddress = useSelector(selectLatestExchangeAddress);
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { displayedValue, numOfDecimals } = useMemo(() => {
        return determineDisplayedValueAndNumOfDecimals(balance, unit);
    }, [balance, unit]);

    return (
        <>
            <Flex direction="column" gap="xs" h="100%">
                <Card shadow="sm" padding={isMobile ? "xs" : "md"} radius="lg" h="100%">
                    <Flex h="100%" direction="column">
                        <GroupCard bgImage="linear-gradient(90deg, var(--mantine-color-indigo-filled), var(--mantine-color-indigo-5))">
                            <Flex justify="space-between" align="center" h="100%">
                                <Flex gap="sm" align="center" lh={1}>
                                    <IconExchange />
                                    {t("exchange")}
                                </Flex>
                                <HoverCard width={320} shadow="md" openDelay={200} closeDelay={200} position="bottom-end" radius="lg">
                                    <HoverCard.Target>
                                        <IconInfoSquareRoundedFilled />
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                        <Stack align="stretch" justify="center" gap="xs">
                                            <Text fw={600}>{t("exchange")}</Text>
                                            <Text fz="sm">
                                                <Trans
                                                    i18nKey="exchangeExplanationPart1"
                                                    components={{
                                                        bold: <b />,
                                                        italic: <i />,
                                                    }}
                                                />
                                            </Text>
                                            <Divider />
                                            <Text fz="sm">
                                                <Trans
                                                    i18nKey="exchangeExplanationPart2"
                                                    components={{
                                                        bold: <b />,
                                                        italic: <i />,
                                                    }}
                                                />
                                            </Text>
                                        </Stack>
                                        <Text></Text>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            </Flex>
                        </GroupCard>
                        <Flex
                            direction="column"
                            justify="center"
                            align="center"
                            h="100%"
                            pb={PADDING_BOTTOM_FOR_BALANCE.BASIC_MODE}
                            pt={isMobile ? PADDING_TOP_FOR_BALANCE : 0}
                        >
                            <motion.div
                                key="balance"
                                layout
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                style={{ overflow: "hidden", width: "100%" }}
                            >
                                <Button
                                    variant="transparent"
                                    color="gray"
                                    h="fit-content"
                                    m={BUTTON_MARGIN}
                                    w={`calc(100% - ${BUTTON_MARGIN * 2}px)`}
                                    mb={41}
                                    radius="xl"
                                    onClick={() => dispatch(updateUnit(unit === Units.Bitcoin ? Units.Satoshi : Units.Bitcoin))}
                                >
                                    <Stack gap={0}>
                                        <NumberFlow
                                            className="balance"
                                            value={displayedValue}
                                            suffix={unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi}
                                            style={{
                                                fontSize: isMobile ? 46 : 66,
                                                fontWeight: 400,
                                            }}
                                            format={{ maximumFractionDigits: numOfDecimals }}
                                        />
                                        <Text mt={isMobile ? 0 : -15} c="dimmed">
                                            {t("balance").toLowerCase()}
                                        </Text>
                                    </Stack>
                                </Button>
                                <Flex justify="center" gap="xs" py={5}>
                                    <Button
                                        variant="light"
                                        color="gray"
                                        size="lg"
                                        radius="xl"
                                        leftSection={<IconArrowUp />}
                                        onClick={openSendModal}
                                    >
                                        {t("send")}
                                    </Button>
                                    <Button
                                        variant="light"
                                        color="gray"
                                        size="lg"
                                        radius="xl"
                                        leftSection={<IconArrowDown />}
                                        onClick={openReceiveModal}
                                    >
                                        {t("receive")}
                                    </Button>
                                </Flex>
                            </motion.div>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
            <SendModal
                title={t("sendBitcoinFromExchange")}
                opened={sendModalOpened}
                senderAddresses={exchangeAddresses}
                utxos={exhangeUtxos}
                exchangeMode
                close={closeSendModal}
            />
            <ReceiveModal
                title={t("receiveBitcoinToExchange")}
                latestAddress={latestAddress}
                opened={receiveModalOpened}
                close={closeReceiveModal}
            />
        </>
    );
}

export default Exchange;
