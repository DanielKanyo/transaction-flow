import { useMemo } from "react";

import { Flex, NumberFormatter, Stack, Text } from "@mantine/core";

interface ValueDisplayProps {
    value: number | null;
    justify: string;
    size: "sm" | "md" | "lg" | "xl" | number;
    unit?: string;
    label?: string;
    labelFontSize?: number;
    numOfDig?: number;
    signed?: boolean;
}

export default function ValueDisplay({ value, unit, justify, size, label, labelFontSize = 14, numOfDig, signed }: ValueDisplayProps) {
    const sign = useMemo(() => {
        if (!signed || value == null) {
            return "";
        }

        return value >= 0 ? "+" : "-";
    }, [signed, value]);

    return (
        <Stack gap={0}>
            <Flex align="baseline" gap={4} justify={justify}>
                <Text lh={1} fz={size}>
                    {value != null ? (
                        <NumberFormatter value={value} thousandSeparator decimalScale={numOfDig} fixedDecimalScale prefix={sign} />
                    ) : (
                        "--"
                    )}
                </Text>
                {unit ? (
                    <Text lh={1} size="sm" c="dimmed">
                        {unit}
                    </Text>
                ) : null}
            </Flex>
            {label ? (
                <Flex align="baseline" justify={justify}>
                    <Text fz={labelFontSize} c="dimmed">
                        {label}
                    </Text>
                </Flex>
            ) : null}
        </Stack>
    );
}
