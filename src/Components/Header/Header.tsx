import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import {
    ActionIcon,
    Button,
    Flex,
    Group,
    Menu,
    Text,
    Tooltip,
    useComputedColorScheme,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconArrowsExchange,
    IconBrandGithub,
    IconCheck,
    IconLanguage,
    IconMoon,
    IconReload,
    IconSettings,
    IconSun,
} from "@tabler/icons-react";

import { resetLedger } from "../../Store/Features/Ledger/LedgerSlice";
import { Languages, updateLanguage } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import SettingsModal from "./SettingsModal";

function Header() {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const { language } = useAppSelector((state) => state.settings);
    const [settingsModalOpened, { open: openSetingsModal, close: closeSetingsModal }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const availableLanguages = [
        { key: Languages.English, label: "English" },
        { key: Languages.Hungarian, label: "Magyar" },
    ];

    const handleLanguageSelect = useCallback((key: Languages) => {
        dispatch(updateLanguage(key));
        i18n.changeLanguage(key);
    }, []);

    return (
        <>
            <Flex align="center" justify="space-between" h="100%" lh={1}>
                <Flex align="center" gap="sm">
                    <IconArrowsExchange size={34} color={theme.colors.violet[8]} />
                    <Text fw={600} fz="xl" fs="italic">
                        TX FLOW
                    </Text>
                </Flex>

                <Group gap="xs">
                    <Button
                        color="red"
                        aria-label="Reset"
                        radius="md"
                        leftSection={<IconReload size={20} />}
                        onClick={() => dispatch(resetLedger())}
                    >
                        {t("reset")}
                    </Button>
                    <Menu withArrow withinPortal position="bottom">
                        <Menu.Target>
                            <ActionIcon size={36} variant="light" radius="md" color="gray" aria-label="Change language">
                                <IconLanguage size={20} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown w={160}>
                            {availableLanguages.map((lng) => (
                                <Menu.Item
                                    key={lng.key}
                                    leftSection={language === lng.key ? <IconCheck size={14} /> : null}
                                    onClick={() => handleLanguageSelect(lng.key)}
                                >
                                    {lng.label}
                                </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                    <Tooltip label={t("toggleColorScheme")} withArrow>
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
                    <Tooltip label={t("sourceCode")} withArrow>
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
                    <Tooltip label={t("settings")} withArrow>
                        <ActionIcon size={36} variant="light" color="gray" aria-label="Settings" radius="md" onClick={openSetingsModal}>
                            <IconSettings size={20} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Flex>

            <SettingsModal opened={settingsModalOpened} close={closeSetingsModal} />
        </>
    );
}

export default Header;
