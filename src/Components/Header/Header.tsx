import { useDispatch } from "react-redux";

import { ActionIcon, Flex, Group, Menu, Text, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconCheck, IconLanguage, IconMoon, IconSun, IconTransactionBitcoin } from "@tabler/icons-react";

import { Languages, updateLanguage } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";

function Header() {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const { language } = useAppSelector((state) => state.settings);
    const dispatch = useDispatch();

    const availableLanguages = [
        { key: Languages.English, label: "English" },
        { key: Languages.German, label: "Deutsch" },
        { key: Languages.Spanish, label: "Español" },
        { key: Languages.Hungarian, label: "Magyar" },
    ];

    return (
        <Flex align="center" justify="space-between" h="100%" lh={1}>
            <Flex align="center" gap="sm">
                <IconTransactionBitcoin size={24} />
                <Text fw={600} fz="md">
                    TX Simulator
                </Text>
            </Flex>

            <Group gap="xs">
                <Menu withArrow withinPortal position="bottom-end">
                    <Menu.Target>
                        <ActionIcon size={36} variant="light" radius="md" color="gray" aria-label="Change language" title="Change language">
                            <IconLanguage size={20} />
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown w={160}>
                        {availableLanguages.map((lng) => (
                            <Menu.Item
                                key={lng.key}
                                leftSection={language === lng.key ? <IconCheck size={14} /> : null}
                                onClick={() => dispatch(updateLanguage(lng.key))}
                            >
                                {lng.label}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
                <ActionIcon
                    size={36}
                    variant="light"
                    color="gray"
                    aria-label="Toggle color scheme"
                    radius="md"
                    onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                >
                    {computedColorScheme === "dark" ? <IconSun size={20} /> : <IconMoon size={20} />}
                </ActionIcon>
            </Group>
        </Flex>
    );
}

export default Header;
