import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";

import { Button, Card, Divider, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NumberFlow from "@number-flow/react";
import { IconArrowDown, IconArrowUp, IconExchange, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { selectLatestExchangeAddress } from "../../Store/Features/Ledger/LedgerSlice";
import { Units, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { determineDisplayedValueAndNumOfDecimals } from "../../Utils/number-of-decimals";
import ReceiveModal from "../Modals/ReceiveModal";
import SendModal from "../Modals/SendModal";

function Exchange() {
    const [sendModalOpened, { open: openSendModal, close: closeSendModal }] = useDisclosure(false);
    const [receiveModalOpened, { open: openReceiveModal, close: closeReceiveModal }] = useDisclosure(false);
    const { unit } = useAppSelector((state) => state.settings);
    const { balanceOnExchange: balance, exchangeAddresses } = useAppSelector((state) => state.ledger);
    const { exhangeUtxos } = useAppSelector((state) => state.ledger);
    const latestAddress = useSelector(selectLatestExchangeAddress);
    const dispatch = useDispatch();

    const { displayedValue, numOfDecimals } = useMemo(() => {
        return determineDisplayedValueAndNumOfDecimals(balance, unit);
    }, [balance, unit]);

    return (
        <>
            <Flex direction="column" gap="xs" h="100%">
                <Card shadow="sm" padding="md" radius="md" h="100%">
                    <Flex h="100%" direction="column">
                        <Card shadow="sm" padding="sm" radius="md" bg="blue" c="white" mih={50}>
                            <Flex justify="space-between" align="center" h="100%">
                                <Flex gap="sm" align="center">
                                    <IconExchange />
                                    Exchange
                                </Flex>
                                <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end">
                                    <HoverCard.Target>
                                        <IconInfoSquareRoundedFilled />
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                        <Stack align="stretch" justify="center" gap="xs">
                                            <Text fw={600}>Exchange</Text>
                                            <Text fz="sm">
                                                An exchange is a platform where you can buy, sell, or trade Bitcoin (and other
                                                cryptocurrencies) using regular money (like USD, EUR) or other digital assets. It works like
                                                a marketplace - you deposit money, then use it to purchase Bitcoin, which you can later
                                                withdraw to your own wallet.
                                            </Text>
                                            <Divider />
                                            <Text fz="sm">
                                                On an exchange, <b>you don't control the private keys</b> to your Bitcoin - the exchange
                                                holds them for you. That's why people say <i>"Not your keys, not your Bitcoin"</i> - if you
                                                don't control the keys, you don't fully control your Bitcoin.
                                            </Text>
                                        </Stack>
                                        <Text></Text>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            </Flex>
                        </Card>
                        <Flex direction="column" justify="center" align="center" h="100%" pb={84}>
                            <motion.div
                                key="balance"
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.25 }}
                                style={{ overflow: "hidden", width: "100%" }}
                            >
                                <Button
                                    variant="transparent"
                                    color="gray"
                                    h="fit-content"
                                    fullWidth
                                    mb={41}
                                    onClick={() => dispatch(updateUnit(unit === Units.Bitcoin ? Units.Satoshi : Units.Bitcoin))}
                                >
                                    <Stack gap={0}>
                                        <NumberFlow
                                            className="balance"
                                            value={displayedValue}
                                            suffix={unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi}
                                            style={{
                                                fontSize: 66,
                                                fontWeight: 400,
                                            }}
                                            format={{ maximumFractionDigits: numOfDecimals }}
                                        />
                                        <Text mt={-15} c="dimmed">
                                            balance
                                        </Text>
                                    </Stack>
                                </Button>
                                <Flex justify="center" gap="xs">
                                    <Button
                                        variant="light"
                                        color="gray"
                                        size="lg"
                                        radius="xl"
                                        leftSection={<IconArrowUp />}
                                        onClick={openSendModal}
                                    >
                                        Send
                                    </Button>
                                    <Button
                                        variant="light"
                                        color="gray"
                                        size="lg"
                                        radius="xl"
                                        leftSection={<IconArrowDown />}
                                        onClick={openReceiveModal}
                                    >
                                        Receive
                                    </Button>
                                </Flex>
                            </motion.div>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
            <SendModal
                title="Send Bitcoin from Exchange"
                color="blue"
                opened={sendModalOpened}
                senderAddresses={exchangeAddresses}
                utxos={exhangeUtxos}
                close={closeSendModal}
            />
            <ReceiveModal
                title="Receive Bitcoin to Exchange"
                color="teal"
                latestAddress={latestAddress}
                opened={receiveModalOpened}
                close={closeReceiveModal}
            />
        </>
    );
}

export default Exchange;
