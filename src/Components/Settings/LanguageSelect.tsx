import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

import { t } from "i18next";

import { NativeSelect, Select } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";

import { Languages, updateLanguage } from "../../Store/Features/Settings/SettingsSlice";
import { useAppSelector } from "../../Store/hook";
import i18n from "../../i18n/i18n";

interface LanguageSelectProps {
    native?: boolean;
}

function LanguageSelect({ native = false }: LanguageSelectProps) {
    const { language } = useAppSelector((state) => state.settings);
    const dispatch = useDispatch();

    const availableLanguages = [
        { key: Languages.English, label: "English" },
        { key: Languages.Hungarian, label: "Magyar" },
        { key: Languages.German, label: "Deutsch" },
    ];

    const languageOptions = useMemo(
        () =>
            availableLanguages.map((lng) => ({
                value: lng.key,
                label: lng.label,
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
                radius="xl"
            />
        );
    }

    return (
        <Select
            value={language}
            leftSectionPointerEvents="none"
            leftSection={<IconLanguage size={16} />}
            variant="filled"
            autoSelectOnBlur
            data={languageOptions}
            onChange={(value) => value && handleLanguageSelect(value as Languages)}
            radius="xl"
            comboboxProps={{ radius: "lg" }}
        />
    );
}

export default LanguageSelect;
