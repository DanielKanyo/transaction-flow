import { useRef, useEffect } from "react";

import QRCodeStyling from "qr-code-styling";

import { Paper, useMantineTheme } from "@mantine/core";

const SIZE = 384;
const LIGHTNING_ADDRESS = "danielkanyo@strike.me";

function QrCode() {
    const ref = useRef<HTMLDivElement | null>(null);
    const theme = useMantineTheme();

    const qrCode = new QRCodeStyling({
        width: SIZE,
        height: SIZE,
        type: "canvas",
        data: `lightning:${LIGHTNING_ADDRESS}`,
        dotsOptions: {
            color: theme.colors.dark[6],
            type: "rounded",
        },
        cornersSquareOptions: {
            type: "extra-rounded",
        },
    });

    useEffect(() => {
        if (ref.current) {
            qrCode.append(ref.current);
        }
    }, []);

    return (
        <Paper shadow="xs" radius="xl" p="sm" bg="white">
            <div style={{ height: SIZE, width: SIZE }} ref={ref} />
        </Paper>
    );
}

export default QrCode;
