import { initReactI18next } from "react-i18next";

import i18next from "i18next";

import { Languages } from "../Store/Features/Settings/SettingsSlice";
import translationGerman from "./Translations/translations.de.json";
import translationEnglish from "./Translations/translations.en.json";
import translationHungarian from "./Translations/translations.hu.json";

const resources = {
    en: {
        translation: translationEnglish,
    },
    hu: {
        translation: translationHungarian,
    },
    de: {
        translation: translationGerman,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: Languages.English,
});

export default i18next;
