import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { ActionIcon, Button, Card, Flex } from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconWallet } from "@tabler/icons-react";

import { updateUnit } from "../../Store/Features/Settings/SettingsSlice";
import { Unit } from "../../Store/Features/Settings/unit";
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
                numOfDig: unit === Unit.Bitcoin ? 2 : 0,
            };
        }

        return {
            displayedValue: unit === Unit.Bitcoin ? value : value * 100_000_000,
            numOfDig: unit === Unit.Bitcoin ? 2 : 0,
        };
    }, [value, unit]);

    return (
        <Flex direction="column" gap="xs" h="100%">
            <Card shadow="sm" padding="md" radius="md" h="100%">
                <Card shadow="sm" padding="md" radius="md" bg="teal" mb="sm" c={"white"}>
                    <Flex gap={"sm"} align="center">
                        <IconWallet />
                        Your Wallet
                    </Flex>
                </Card>
                <Flex my="xl" justify="center">
                    <Button
                        variant="transparent"
                        color="gray"
                        h="fit-content"
                        miw={430}
                        onClick={() => dispatch(updateUnit(unit === Unit.Bitcoin ? Unit.Satoshi : Unit.Bitcoin))}
                    >
                        <ValueDisplay
                            value={displayedValue}
                            size={66}
                            justify="center"
                            label="balance"
                            numOfDig={numOfDig}
                            unit={unit === Unit.Bitcoin ? Unit.Bitcoin.toUpperCase() : Unit.Satoshi}
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
