import { useRef, useEffect } from "react";

import QRCodeStyling from "qr-code-styling";

import { em, Paper, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { RESPONSIVE_BREAKPOINT } from "../../Store/Features/Settings/SettingsSlice";

const SIZE = 384;
const LIGHTNING_ADDRESS = "danielkanyo@strike.me";

function QrCode() {
    const qrRef = useRef<HTMLDivElement | null>(null);
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);

    useEffect(() => {
        if (!qrRef.current) return;

        // Clear previous QR code
        qrRef.current.innerHTML = "";

        const size = isMobile ? SIZE / 2 : SIZE;

        const qrCode = new QRCodeStyling({
            width: size,
            height: size,
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

        qrCode.append(qrRef.current);
    }, [isMobile, theme]);

    const size = isMobile ? SIZE / 2 : SIZE;

    return (
        <Paper shadow="xs" radius="xl" p="sm" bg="white" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ height: size, width: size }} ref={qrRef} />
        </Paper>
    );
}

export default QrCode;
