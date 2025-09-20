import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ActionIcon, Popover, Stack, Group, Tooltip, em, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useMediaQuery, useFullscreen } from "@mantine/hooks";
import { IconSettings, IconBrandGithub, IconSun, IconMoon, IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";

import { RESPONSIVE_BREAKPOINT } from "../../../Store/Features/Settings/SettingsSlice";
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
        <Popover
            position="bottom-end"
            withArrow
            arrowPosition="center"
            radius="md"
            opened={opened}
            onChange={setOpened}
            closeOnClickOutside
        >
            <Popover.Target>
                <ActionIcon size={36} variant="light" color="gray" aria-label="Settings" radius="md" onClick={() => setOpened((o) => !o)}>
                    <IconSettings size={20} />
                </ActionIcon>
            </Popover.Target>

            <Popover.Dropdown p="md" w={350} onMouseDown={(e) => e.stopPropagation()}>
                <ModeControl />
                <Stack my="xl" gap="sm">
                    <UnitSelect />
                    <LanguageSelect />
                </Stack>
                <Group justify="flex-end" gap="xs" grow>
                    <Tooltip label={t("sourceCode")} radius="md" withArrow>
                        <ActionIcon
                            size={36}
                            variant="light"
                            color="gray"
                            aria-label="Source-code"
                            radius="md"
                            component="a"
                            href="https://github.com/DanielKanyo/transaction-flow"
                            target="_blank"
                        >
                            <IconBrandGithub size={20} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label={t("toggleColorScheme")} radius="md" withArrow>
                        <ActionIcon
                            size={36}
                            variant="light"
                            color="gray"
                            aria-label="Toggle-color-scheme"
                            radius="md"
                            onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                        >
                            {computedColorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
                        </ActionIcon>
                    </Tooltip>

                    {!isMobile && (
                        <Tooltip label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} radius="md" withArrow>
                            <ActionIcon
                                size={36}
                                variant="light"
                                color="gray"
                                aria-label="Full-screen"
                                radius="md"
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
