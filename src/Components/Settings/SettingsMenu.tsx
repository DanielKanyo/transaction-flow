import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ActionIcon, Popover, Stack, Group, Tooltip, em, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery, useFullscreen } from "@mantine/hooks";
import { IconSettings, IconBrandGithub, IconSun, IconMoon, IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";

import { RESPONSIVE_BREAKPOINT } from "../../Store/Features/Settings/SettingsSlice";
import LanguageSelect from "./LanguageSelect";
import ModeControl from "./ModeControl/ModeControl";
import UnitSelect from "./UnitSelect";

function SettingsMenu() {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const { t } = useTranslation();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { toggle: toggleFullScreen, fullscreen } = useFullscreen();
    const [opened, setOpened] = useState(false);

    return (
        <Popover position="bottom-end" radius="lg" opened={opened} onChange={setOpened} closeOnClickOutside>
            <Popover.Target>
                <ActionIcon size={40} variant="light" color="gray" aria-label="Settings" radius="xl" onClick={() => setOpened((o) => !o)}>
                    <IconSettings size={20} />
                </ActionIcon>
            </Popover.Target>

            <Popover.Dropdown p="md" w={350} onMouseDown={(e) => e.stopPropagation()}>
                <ModeControl />
                <Stack my="xl" gap="sm">
                    <UnitSelect />
                    <LanguageSelect />
                </Stack>
                <Group justify="flex-end" gap="xs">
                    <Tooltip label={t("sourceCode")} radius="xl" withArrow>
                        <ActionIcon
                            size="xl"
                            variant="light"
                            color="gray"
                            aria-label="Source-code"
                            radius="xl"
                            component="a"
                            href="https://github.com/DanielKanyo/transaction-flow"
                            target="_blank"
                        >
                            <IconBrandGithub size={20} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label={t("toggleColorScheme")} radius="xl" withArrow>
                        <ActionIcon
                            size="xl"
                            variant="light"
                            color="gray"
                            aria-label="Toggle-color-scheme"
                            radius="xl"
                            onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                        >
                            {computedColorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </ActionIcon>
                    </Tooltip>

                    {!isMobile && (
                        <Tooltip label={fullscreen ? t("exitFullscreen") : t("enterFullscreen")} radius="xl" withArrow>
                            <ActionIcon
                                size="xl"
                                variant="light"
                                color="gray"
                                aria-label="Full-screen"
                                radius="xl"
                                onClick={toggleFullScreen}
                            >
                                {fullscreen ? <IconArrowsMinimize size={20} /> : <IconArrowsMaximize size={20} />}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </Group>
            </Popover.Dropdown>
        </Popover>
    );
}

export default SettingsMenu;
