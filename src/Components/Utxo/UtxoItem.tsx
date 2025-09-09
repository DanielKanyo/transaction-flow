import { Card, Group, NumberFormatter, Badge, Text } from "@mantine/core";

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
    return (
        <Card shadow="xs" p="md" radius="md">
            <Group justify="space-between" align="center">
                <Group gap={6} align="baseline">
                    <Text size="lg" lh={1}>
                        <NumberFormatter
                            value={determineDisplayedValueAndNumOfDecimals(amount, unit).displayedValue}
                            thousandSeparator
                            decimalScale={determineDisplayedValueAndNumOfDecimals(amount, unit).numOfDecimals}
                        />
                    </Text>
                    <Text lh={1} size="sm" c="dimmed">
                        {formatedUnit}
                    </Text>
                </Group>
                <Badge color={spent ? "red" : "teal"}>{spent ? "Spent" : "Unspent"}</Badge>
            </Group>
            <Text size="xs" c="dimmed" mt={4} style={{ wordBreak: "break-all" }}>
                {address}
            </Text>
        </Card>
    );
}

export default UtxoItem;
