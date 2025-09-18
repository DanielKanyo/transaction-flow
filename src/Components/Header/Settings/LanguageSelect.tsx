import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import { t } from "i18next";

import { Menu, ActionIcon, NativeSelect } from "@mantine/core";
import { IconLanguage, IconCheck } from "@tabler/icons-react";

import { Languages, updateLanguage } from "../../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../../Store/hook";
import i18n from "../../../i18n/i18n";

interface LanguageSelectProps {
    native?: boolean;
}

function LanguageSelect({ native = false }: LanguageSelectProps) {
    const { language } = useAppSelector((state) => state.settings);
    const dispatch = useDispatch();

    const availableLanguages = [
        { key: Languages.English, label: "English" },
        { key: Languages.Hungarian, label: "Magyar" },
    ];

    const languageOptions = useMemo(
        () =>
            availableLanguages.map((l) => ({
                value: l.key,
                label: l.label,
            })),
        []
    );

    const handleLanguageSelect = useCallback((key: Languages) => {
        dispatch(updateLanguage(key));
        i18n.changeLanguage(key);
        localStorage.setItem("appLanguage", key);
    }, []);

    if (native) {
        return (
            <NativeSelect
                value={language}
                label={t("language")}
                variant="filled"
                data={languageOptions}
                onChange={(event) => handleLanguageSelect(event.currentTarget.value as Languages)}
                radius="md"
            />
        );
    }

    return (
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
    );
}

export default LanguageSelect;
