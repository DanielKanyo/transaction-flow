import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Button, Drawer, Flex, NativeSelect, Stack, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

import { resetLedger } from "../../../Store/Features/Ledger/LedgerSlice";
import LanguageSelect from "./LanguageSelect";
import ModeControl from "./ModeControl";
import classes from "./SettingsModal.module.css";
import UnitSelect from "./UnitSelect";

interface SettingsDrawerProps {
    opened: boolean;
    setOpened: (value: boolean) => void;
}

function SettingsDrawer({ opened, setOpened }: SettingsDrawerProps) {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title={t("settings")}
            size="100%"
            position="bottom"
            classNames={{ body: classes.body }}
        >
            <Flex direction="column" justify="space-between" h="100%">
                <Stack gap="md">
                    <ModeControl />
                    <UnitSelect native />
                    <LanguageSelect native />
                    <NativeSelect
                        value={computedColorScheme}
                        label={t("toggleColorScheme")}
                        variant="filled"
                        data={[
                            { value: "dark", label: t("dark") },
                            { value: "light", label: t("light") },
                        ]}
                        onChange={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                        radius="md"
                    />
                </Stack>
                <Button
                    color="red"
                    aria-label="Reset"
                    fullWidth
                    radius="md"
                    leftSection={<IconReload size={20} />}
                    onClick={() => dispatch(resetLedger())}
                >
                    {t("reset")}
                </Button>
            </Flex>
        </Drawer>
    );
}

export default SettingsDrawer;
