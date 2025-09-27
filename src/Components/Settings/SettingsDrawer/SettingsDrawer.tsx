import { useTranslation } from "react-i18next";

import { Drawer, Flex, Group, NativeSelect, Stack, useComputedColorScheme, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

import { useAppSelector } from "../../../Store/hook";
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
    const { advancedMode } = useAppSelector((state) => state.settings);
    const { t } = useTranslation();
    const theme = useMantineTheme();

    return (
        <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            title={t("settings")}
            size="lg"
            position="bottom"
            classNames={{ body: classes.body }}
            overlayProps={{
                backgroundOpacity: 0.6,
                blur: 3,
            }}
            closeButtonProps={{
                radius: "xl",
            }}
            styles={{
                content: {
                    borderTopLeftRadius: theme.radius.lg,
                    borderTopRightRadius: theme.radius.lg,
                },
            }}
        >
            <Flex direction="column" justify="space-between" h="100%">
                <Stack gap="md">
                    <ModeControl />
                    <UnitSelect native />
                    <LanguageSelect native />
                    <NativeSelect
                        value={computedColorScheme}
                        label={t("toggleColorScheme")}
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
                        {!advancedMode ? <GettingStartedButton /> : null}
                    </Group>
                    <ResetButton fullWidth />
                </Stack>
            </Flex>
        </Drawer>
    );
}

export default SettingsDrawer;
