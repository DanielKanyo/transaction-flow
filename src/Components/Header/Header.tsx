import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { ActionIcon, Burger, Button, em, Flex, Group, Text, Tooltip, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useFullscreen, useMediaQuery } from "@mantine/hooks";
import {
    IconArrowsMaximize,
    IconArrowsMinimize,
    IconBolt,
    IconBrandGithub,
    IconMoon,
    IconReload,
    IconSettings,
    IconSun,
} from "@tabler/icons-react";

import { resetLedger } from "../../Store/Features/Ledger/LedgerSlice";
import { RESPONSIVE_BREAKPOINT } from "../../Store/Features/Settings/SettingsSlice";
import LanguageSelect from "./Settings/LanguageSelect";
import SettingsDrawer from "./Settings/SettingsDrawer";
import SettingsModal from "./Settings/SettingsModal";

function Header() {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const [settingsModalOpened, { open: openSetingsModal, close: closeSetingsModal }] = useDisclosure(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(`(max-width: ${em(RESPONSIVE_BREAKPOINT)})`);
    const { toggle: toggleFullScreen, fullscreen } = useFullscreen();
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Flex align="center" justify="space-between" h="100%" lh={1}>
                <Flex align="center" gap="sm">
                    <IconBolt size={34} />
                    <Group gap={4}>
                        <Text fw={800} fz={27} fs="italic" lh={1}>
                            TX
                        </Text>
                        <Text fw={400} fz={27} fs="italic" lh={1}>
                            FLOW
                        </Text>
                    </Group>
                </Flex>

                <Burger hiddenFrom="sm" opened={opened} onClick={() => setOpened((o) => !o)} aria-label="Toggle drawer" size="sm" />

                <Group gap="xs" visibleFrom="sm">
                    <Button
                        color="red"
                        aria-label="Reset"
                        radius="md"
                        leftSection={<IconReload size={20} />}
                        onClick={() => dispatch(resetLedger())}
                    >
                        {t("reset")}
                    </Button>
                    <LanguageSelect />
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
                    <Tooltip label={t("settings")} radius="md" withArrow>
                        <ActionIcon size={36} variant="light" color="gray" aria-label="Settings" radius="md" onClick={openSetingsModal}>
                            <IconSettings size={20} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Flex>

            <SettingsModal opened={settingsModalOpened} close={closeSetingsModal} />
            <SettingsDrawer opened={opened} setOpened={setOpened} />
        </>
    );
}

export default Header;
