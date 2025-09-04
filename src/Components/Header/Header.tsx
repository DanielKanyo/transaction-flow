import { useDispatch } from "react-redux";

import { ActionIcon, Flex, Menu, Text } from "@mantine/core";
import { IconLanguage, IconTransactionBitcoin } from "@tabler/icons-react";

import { updateLanguage } from "../../Store/Features/Settings/SettingsSlice";
import { Languages } from "../../Store/Features/Settings/language";
import { useAppSelector } from "../../Store/hook";

function Header() {
    const { language } = useAppSelector((state) => state.settings);
    const dispatch = useDispatch();

    const languages = [
        { key: Languages.English, label: "English" },
        { key: Languages.German, label: "Deutsch" },
        { key: Languages.Spanish, label: "Español" },
        { key: Languages.Hungarian, label: "Magyar" },
    ];

    return (
        <Flex align="center" justify="space-between" h="100%" lh={1}>
            <Flex align="center" gap="sm">
                <IconTransactionBitcoin size={24} />
                <Text tt="uppercase" fw={600} fz="lg">
                    Transaction Flow
                </Text>
            </Flex>

            <Menu withArrow withinPortal position="bottom-end">
                <Menu.Target>
                    <ActionIcon size={36} variant="light" color="gray" aria-label="Change language" title="Change language">
                        <IconLanguage size={20} />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown w={160}>
                    {languages.map((lng) => (
                        <Menu.Item
                            key={lng.key}
                            color={language === lng.key ? "white" : undefined}
                            bg={language === lng.key ? "teal" : ""}
                            onClick={() => dispatch(updateLanguage(lng.key))}
                        >
                            {lng.label}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </Flex>
    );
}

export default Header;
