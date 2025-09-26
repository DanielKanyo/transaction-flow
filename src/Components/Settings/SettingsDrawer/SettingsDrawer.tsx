import { useTranslation } from "react-i18next";

import { Drawer, Flex, Group, NativeSelect, Stack, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

import Donate from "../../Donate/Donate";
import GettingStartedButton from "../GettingStartedButton";
import LanguageSelect from "../LanguageSelect";
import ModeControl from "../ModeControl/ModeControl";
import ResetButton from "../ResetButton";
import SourceCodeButton from "../SourceCodeButton";
import UnitSelect from "../UnitSelect";
import classes from "./SettingsDrawer.module.css";

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
            size="lg"
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
                        styles={{ label: { marginBottom: 4 } }}
                        leftSectionPointerEvents="none"
                        leftSection={computedColorScheme === "light" ? <IconSun size={16} /> : <IconMoon size={16} />}
                        variant="filled"
                        data={[
                            { value: "dark", label: t("dark") },
                            { value: "light", label: t("light") },
                        ]}
                        onChange={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                        radius="lg"
                    />
                </Stack>

                <Stack>
                    <Group justify="flex-end" gap="xs">
                        <Donate />
                        <SourceCodeButton />
                        <GettingStartedButton />
                    </Group>
                    <ResetButton fullWidth />
                </Stack>
            </Flex>
        </Drawer>
    );
}

export default SettingsDrawer;
