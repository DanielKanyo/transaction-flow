import { Card, Group, NumberFormatter, Badge, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";

import { Units } from "../../Store/Features/Settings/SettingsSlice";
import { determineDisplayedValueAndNumOfDecimals } from "../../Utils/number-of-decimals";

interface UtxoItemProps {
    amount: number;
    unit: Units;
    formatedUnit: string;
    spent: boolean;
    address: string;
}

function UtxoItem({ amount, unit, formatedUnit, spent, address }: UtxoItemProps) {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Card
            shadow="xs"
            p="md"
            radius="md"
            bg={colorScheme === "light" ? "white" : theme.colors.dark[7]}
            style={{ opacity: spent ? 0.6 : 1 }}
        >
            <Group justify="space-between" align="center">
                <Group gap={6} align="baseline">
                    <Text size="xs" lh={1}>
                        <NumberFormatter
                            value={determineDisplayedValueAndNumOfDecimals(amount, unit).displayedValue}
                            thousandSeparator
                            decimalScale={determineDisplayedValueAndNumOfDecimals(amount, unit).numOfDecimals}
                        />
                    </Text>
                    <Text lh={1} size="xs" c="dimmed">
                        {formatedUnit}
                    </Text>
                </Group>
                <Badge variant={spent ? "light" : "filled"} color={spent ? "gray" : "teal"} radius="md">
                    {spent ? "Spent" : "Unspent"}
                </Badge>
            </Group>
            <Text size="xs" c="dimmed" mt={4} style={{ wordBreak: "break-all" }}>
                {address}
            </Text>
        </Card>
    );
}

export default UtxoItem;
