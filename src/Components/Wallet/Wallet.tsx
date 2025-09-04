import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { ActionIcon, Button, Card, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconInfoSquareRoundedFilled, IconWallet } from "@tabler/icons-react";

import { updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { Units } from "../../Store/Features/Settings/unit";
import { useAppSelector } from "../../Store/hook";
import ValueDisplay from "../ValueDisplay/ValueDisplay";

function Wallet() {
    const { unit } = useAppSelector((state) => state.settings);
    const { inWallet: value } = useAppSelector((state) => state.balance);
    const dispatch = useDispatch();

    const { displayedValue, numOfDig } = useMemo(() => {
        if (!value) {
            return {
                displayedValue: 0,
                numOfDig: unit === Units.Bitcoin ? 2 : 0,
            };
        }

        return {
            displayedValue: unit === Units.Bitcoin ? value : value * 100_000_000,
            numOfDig: unit === Units.Bitcoin ? 2 : 0,
        };
    }, [value, unit]);

    return (
        <Flex direction="column" gap="xs" h="100%">
            <Card shadow="sm" padding="md" radius="md" h="100%">
                <Card shadow="sm" padding="md" radius="md" bg="teal" mb="sm" c={"white"}>
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
                                        A wallet is a tool that lets you store, send, and receive Bitcoin. Unlike an exchange, a wallet
                                        gives <b>you control of the private keys</b> - which means you truly own your Bitcoin. Wallets can
                                        be apps on your phone/computer (software wallets) or special devices (hardware wallets). People say
                                        <i>"Not your keys, not your Bitcoin"</i> because with a wallet, the keys are yours - and so is your
                                        Bitcoin.
                                    </Text>
                                    <Text fz="sm">
                                        Your Bitcoin itself is always on the blockchain, not inside your phone or device. The wallet simply
                                        keeps your private key safe. If you lose the wallet, you can restore access using your private key
                                        (usually written as 12 or 24 recovery words).
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
                        miw={430}
                        onClick={() => dispatch(updateUnit(unit === Units.Bitcoin ? Units.Satoshi : Units.Bitcoin))}
                    >
                        <ValueDisplay
                            value={displayedValue}
                            size={66}
                            justify="center"
                            label="balance"
                            numOfDig={numOfDig}
                            unit={unit === Units.Bitcoin ? Units.Bitcoin.toUpperCase() : Units.Satoshi}
                        />
                    </Button>
                </Flex>
                <Flex justify="center" gap="md">
                    <ActionIcon variant="light" color="gray" size={64} aria-label="Receive" radius={64}>
                        <IconArrowUp />
                    </ActionIcon>
                    <ActionIcon variant="light" color="gray" size={64} aria-label="Send" radius={64}>
                        <IconArrowDown />
                    </ActionIcon>
                </Flex>
            </Card>
        </Flex>
    );
}

export default Wallet;
