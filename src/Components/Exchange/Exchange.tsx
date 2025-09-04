import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { ActionIcon, Button, Card, Flex, HoverCard, Stack, Text } from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconExchange, IconInfoSquareRoundedFilled } from "@tabler/icons-react";

import { updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { Units } from "../../Store/Features/Settings/unit";
import { useAppSelector } from "../../Store/hook";
import ValueDisplay from "../ValueDisplay/ValueDisplay";

function Exchange() {
    const { unit } = useAppSelector((state) => state.settings);
    const { onExchange: value } = useAppSelector((state) => state.balance);
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
                                        On an exchange, <b>you don't control the private keys</b> to your Bitcoin - the exchange holds them
                                        for you. That's why people say <i>"Not your keys, not your Bitcoin"</i> - if you don't control the
                                        keys, you don't fully control your Bitcoin.
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

export default Exchange;
