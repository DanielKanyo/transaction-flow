import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";

import { Button, Card, Divider, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NumberFlow from "@number-flow/react";
import { IconArrowDown, IconArrowUp, IconInfoSquareRoundedFilled, IconWallet } from "@tabler/icons-react";

import { selectLatestWalletAddress } from "../../Store/Features/Ledger/LedgerSlice";
import { Units, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { determineDisplayedValueAndNumOfDecimals } from "../../Utils/number-of-decimals";
import ReceiveModal from "../Modals/ReceiveModal";
import SendModal from "../Modals/SendModal";
import UtxoList from "../Utxo/UtxoList";

const PADDING_FOR_BALANCE = {
    BASIC_MODE: 84,
    ADVANCED_MODE: 24,
};

function Wallet() {
    const [sendModalOpened, { open: openSendModal, close: closeSendModal }] = useDisclosure(false);
    const [receiveModalOpened, { open: openReceiveModal, close: closeReceiveModal }] = useDisclosure(false);
    const { unit, advancedMode } = useAppSelector((state) => state.settings);
    const { balanceInWallet: balance, walletAddresses } = useAppSelector((state) => state.ledger);
    const latestAddress = useSelector(selectLatestWalletAddress);
    const { walletUtxos } = useAppSelector((state) => state.ledger);
    const dispatch = useDispatch();

    const { displayedValue, numOfDecimals } = useMemo(() => {
        return determineDisplayedValueAndNumOfDecimals(balance, unit);
    }, [balance, unit]);

    return (
        <>
            <Flex direction="column" gap="xs" h="100%">
                <Card shadow="sm" padding="md" radius="md" h="100%">
                    <Flex h="100%" direction="column">
                        <Card shadow="sm" padding="sm" radius="md" bg="teal" c="white" mih={50}>
                            <Flex justify="space-between" align="center" h="100%">
                                <Flex gap="sm" align="center">
                                    <IconWallet />
                                    Your Wallet
                                </Flex>
                                <HoverCard
                                    width={320}
                                    shadow="md"
                                    withArrow
                                    openDelay={0}
                                    closeDelay={200}
                                    position="bottom-end"
                                    radius="md"
                                >
                                    <HoverCard.Target>
                                        <IconInfoSquareRoundedFilled />
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                        <Stack align="stretch" justify="center" gap="xs">
                                            <Text fw={600}>Wallet</Text>
                                            <Text fz="sm">
                                                A wallet is a tool that lets you store, send, and receive Bitcoin. Unlike an exchange, a
                                                wallet gives <b>you control of the private keys</b> - which means you truly own your
                                                Bitcoin. Wallets can be apps on your phone/computer (software wallets) or special devices
                                                (hardware wallets). People say
                                                <i> "Not your keys, not your Bitcoin"</i> because with a wallet, the keys are yours - and so
                                                is your Bitcoin.
                                            </Text>
                                            <Divider />
                                            <Text fz="sm">
                                                Your Bitcoin itself is always on the blockchain, not inside your phone or device. The wallet
                                                simply
                                                <b> keeps your private key safe</b>. If you lose the wallet, you can restore access using
                                                your private key (usually written as 12 or 24 recovery words).
                                            </Text>
                                        </Stack>
                                        <Text></Text>
                                    </HoverCard.Dropdown>
                                </HoverCard>
                            </Flex>
                        </Card>
                        <Flex
                            direction="column"
                            justify="center"
                            align="center"
                            h="100%"
                            pb={advancedMode ? PADDING_FOR_BALANCE.ADVANCED_MODE : PADDING_FOR_BALANCE.BASIC_MODE}
                        >
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
                                    onClick={() => dispatch(updateUnit(unit === Units.Bitcoin ? Units.Satoshi : Units.Bitcoin))}
                                    mb={41}
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

                    <AnimatePresence mode="popLayout">
                        {advancedMode && (
                            <motion.div
                                key="utxolist"
                                layout
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "80%", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, type: "spring", bounce: 0 }}
                                style={{ overflow: "hidden" }}
                            >
                                <UtxoList walletUtxos={walletUtxos} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </Flex>
            <SendModal
                title="Send Bitcoin from Wallet"
                color="teal"
                opened={sendModalOpened}
                senderAddresses={walletAddresses}
                utxos={walletUtxos}
                close={closeSendModal}
            />
            <ReceiveModal
                title="Receive Bitcoin to Wallet"
                color="teal"
                latestAddress={latestAddress}
                opened={receiveModalOpened}
                close={closeReceiveModal}
            />
        </>
    );
}

export default Wallet;
