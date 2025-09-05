import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { Button, Card, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NumberFlow from "@number-flow/react";
import { IconArrowDown, IconArrowUp, IconExchange, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { ADDRESSES } from "../../Store/Features/Ledger/LedgerSlice";
import { DEFAULT_NUMBER_OF_DIGITS, Units, updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import { btcToSat } from "../../Utils/btc-to-sat-converter";
import SendModal from "../Modals/SendModal";

function Exchange() {
    const [opened, { open, close }] = useDisclosure(false);
    const { unit } = useAppSelector((state) => state.settings);
    const { balanceOnExchange: balance } = useAppSelector((state) => state.ledger);
    const { exhangeUtxos } = useAppSelector((state) => state.ledger);
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
            numOfDig: unit === Units.Bitcoin ? DEFAULT_NUMBER_OF_DIGITS.BTC : 0,
        };
    }, [balance, unit]);

    return (
        <>
            <Flex direction="column" gap="xs" h="100%">
                <Card shadow="sm" padding="md" radius="md" h="100%">
                    <Card shadow="sm" padding="md" radius="md" bg="blue" mb="sm" c={"white"}>
                        <Flex justify="space-between" align="center">
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
                                            An exchange is a platform where you can buy, sell, or trade Bitcoin (and other cryptocurrencies)
                                            using regular money (like USD, EUR) or other digital assets. It works like a marketplace - you
                                            deposit money, then use it to purchase Bitcoin, which you can later withdraw to your own wallet.
                                        </Text>
                                        <Text fz="sm">
                                            On an exchange, <b>you don't control the private keys</b> to your Bitcoin - the exchange holds
                                            them for you. That's why people say <i>"Not your keys, not your Bitcoin"</i> - if you don't
                                            control the keys, you don't fully control your Bitcoin.
                                        </Text>
                                    </Stack>
                                    <Text></Text>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Flex>
                    </Card>
                    <Flex my="xl" justify="center">
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
                </Card>
            </Flex>
            <SendModal
                title="Send Bitcoin from Exchange"
                color="blue"
                opened={opened}
                senderAddress={ADDRESSES.EXCHANGE_ADDRESS}
                recipientAddress={ADDRESSES.WALLET_ADDRESS}
                utxos={exhangeUtxos}
                close={close}
            />
        </>
    );
}

export default Exchange;
