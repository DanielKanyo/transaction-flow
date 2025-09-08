import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Card, Divider, Flex, HoverCard, Stack, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NumberFlow from "@number-flow/react";
import { IconArrowDown, IconArrowUp, IconInfoSquareRoundedFilled, IconWallet } from "@tabler/icons-react";

import { selectLatestWalletAddress } from "../../Store/Features/Ledger/LedgerSlice";
import { DEFAULT_NUMBER_OF_DIGITS, Units, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { btcToSat } from "../../Utils/btc-to-sat-converter";
import ReceiveModal from "../Modals/ReceiveModal";
import SendModal from "../Modals/SendModal";
import UtxoList from "./UtxoList";

function Wallet() {
    const [sendModalOpened, { open: openSendModal, close: closeSendModal }] = useDisclosure(false);
    const [receiveModalOpened, { open: openReceiveModal, close: closeReceiveModal }] = useDisclosure(false);
    const { unit } = useAppSelector((state) => state.settings);
    const { balanceInWallet: balance, walletAddresses } = useAppSelector((state) => state.ledger);
    const latestAddress = useSelector(selectLatestWalletAddress);
    const { walletUtxos } = useAppSelector((state) => state.ledger);
    const { colorScheme } = useMantineColorScheme();
    const theme = useMantineTheme();
    const dispatch = useDispatch();

    const { displayedValue, numOfDig } = useMemo(() => {
        if (!balance) {
            return {
                displayedValue: 0,
                numOfDig: unit === Units.Bitcoin ? DEFAULT_NUMBER_OF_DIGITS.BTC : DEFAULT_NUMBER_OF_DIGITS.SAT,
            };
        }

        return {
            displayedValue: unit === Units.Bitcoin ? balance : btcToSat(balance),
            numOfDig: unit === Units.Bitcoin ? DEFAULT_NUMBER_OF_DIGITS.BTC : DEFAULT_NUMBER_OF_DIGITS.SAT,
        };
    }, [balance, unit]);

    return (
        <>
            <Flex direction="column" gap="xs" h="100%">
                <Card
                    shadow="sm"
                    padding="md"
                    radius="md"
                    h="100%"
                    bg={colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[6]}
                >
                    <Flex h="50%" direction="column" justify="space-between" pb={84}>
                        <Card shadow="sm" padding="md" radius="md" bg="teal" c="white">
                            <Flex justify="space-between" align="center">
                                <Flex gap="sm" align="center">
                                    <IconWallet />
                                    Your Wallet
                                </Flex>
                                <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={200} position="bottom-end">
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
                        <Flex justify="center">
                            <Button
                                variant="transparent"
                                color="gray"
                                h="fit-content"
                                fullWidth
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
                                        format={{ minimumFractionDigits: numOfDig }}
                                    />
                                    <Text mt={-15} c="dimmed">
                                        balance
                                    </Text>
                                </Stack>
                            </Button>
                        </Flex>
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
                    </Flex>

                    <UtxoList walletUtxos={walletUtxos} />
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
