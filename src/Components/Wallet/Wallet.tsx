import { useMemo } from "react";
import { useDispatch } from "react-redux";

import {
    Badge,
    Button,
    Card,
    Divider,
    Flex,
    Group,
    HoverCard,
    ScrollArea,
    Stack,
    Switch,
    Text,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NumberFlow from "@number-flow/react";
import { IconArrowDown, IconArrowUp, IconInfoSquareRoundedFilled, IconWallet } from "@tabler/icons-react";

import { ADDRESSES } from "../../Store/Features/Ledger/LedgerSlice";
import { DEFAULT_NUMBER_OF_DIGITS, Units, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { btcToSat } from "../../Utils/btc-to-sat-converter";
import SendModal from "../Modals/SendModal";

function Wallet() {
    const [opened, { open, close }] = useDisclosure(false);
    const { unit } = useAppSelector((state) => state.settings);
    const { balanceInWallet: balance } = useAppSelector((state) => state.ledger);
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

    const unspentUtxos = useMemo(() => walletUtxos.filter((utxo) => !utxo.spent), [walletUtxos]);
    const spentUtxos = useMemo(() => walletUtxos.filter((utxo) => utxo.spent), [walletUtxos]);

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
                                            fontWeight: 100,
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
                            <Button variant="light" color="gray" size="lg" radius="xl" leftSection={<IconArrowUp />} onClick={open}>
                                Send
                            </Button>
                            <Button variant="light" color="gray" size="lg" radius="xl" leftSection={<IconArrowDown />}>
                                Receive
                            </Button>
                        </Flex>
                    </Flex>

                    <Flex align="center" justify="space-between" m="xs">
                        <Flex align="center" gap="xs">
                            <IconInfoSquareRoundedFilled />
                            <Text c="dimmed" mt={2}>
                                Your UTXOs
                            </Text>
                        </Flex>
                        <Group gap={6}>
                            <Badge variant="light" color="gray">
                                {spentUtxos.length}
                            </Badge>
                            <Badge color="teal">{unspentUtxos.length}</Badge>
                            <Switch defaultChecked color="teal" withThumbIndicator={false} />
                        </Group>
                    </Flex>

                    <Card
                        h="50%"
                        radius="md"
                        bg={colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[7]}
                        py={0}
                        pe={0}
                        ps="xs"
                    >
                        <ScrollArea h="100%" scrollbarSize={6}>
                            <Stack gap="xs" my="xs" me="xs">
                                {walletUtxos.length === 0 ? (
                                    <Text size="sm" c="dimmed">
                                        No UTXOs available
                                    </Text>
                                ) : (
                                    walletUtxos.map((utxo) => (
                                        <Card key={`${utxo.txid}-${utxo.index}`} shadow="xs" padding="sm" radius="md">
                                            <Group justify="space-between">
                                                <Text size="sm">
                                                    Amount: <strong>{utxo.amount} BTC</strong>
                                                </Text>
                                                <Badge color={utxo.spent ? "red" : "teal"} variant="light">
                                                    {utxo.spent ? "Spent" : "Unspent"}
                                                </Badge>
                                            </Group>
                                            <Text size="xs" mt={4} c="dimmed">
                                                TXID: {utxo.txid.slice(0, 10)}... Index: {utxo.index}
                                            </Text>
                                        </Card>
                                    ))
                                )}
                            </Stack>
                        </ScrollArea>
                    </Card>
                </Card>
            </Flex>
            <SendModal
                title="Send Bitcoin from Wallet"
                color="teal"
                opened={opened}
                senderAddress={ADDRESSES.WALLET_ADDRESS}
                recipientAddress={ADDRESSES.EXCHANGE_ADDRESS}
                utxos={walletUtxos}
                close={close}
            />
        </>
    );
}

export default Wallet;
