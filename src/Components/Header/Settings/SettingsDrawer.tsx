import { useTranslation } from "react-i18next";

import { Drawer, Flex, NativeSelect, Stack, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

import LanguageSelect from "./LanguageSelect";
import ModeControl from "./ModeControl";
import ResetButton from "./ResetButton";
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
                <ResetButton fullWidth />
            </Flex>
        </Drawer>
    );
}

export default SettingsDrawer;
