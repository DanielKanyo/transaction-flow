import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Button, Drawer, Flex, NativeSelect, Stack, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";

import { resetLedger } from "../../../Store/Features/Ledger/LedgerSlice";
import { Languages } from "../../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../../Store/hook";
import ModeControl from "./ModeControl";
import classes from "./SettingsModal.module.css";
import UnitSelect from "./UnitSelect";

interface SettingsDrawerProps {
    opened: boolean;
    availableLanguages: { key: Languages; label: string }[];
    setOpened: (value: boolean) => void;
    handleLanguageSelect: (key: Languages) => void;
}

function SettingsDrawer({ opened, availableLanguages, setOpened, handleLanguageSelect }: SettingsDrawerProps) {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { language } = useAppSelector((state) => state.settings);

    const languageOptions = useMemo(
        () =>
            availableLanguages.map((l) => ({
                value: l.key,
                label: l.label,
            })),
        []
    );

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
                    <NativeSelect
                        value={language}
                        label={t("language")}
                        variant="filled"
                        data={languageOptions}
                        onChange={(event) => handleLanguageSelect(event.currentTarget.value as Languages)}
                        radius="md"
                    />
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
