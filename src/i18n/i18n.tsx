import { initReactI18next } from "react-i18next";

import i18next from "i18next";

import { Languages } from "../Store/Features/Settings/SettingsSlice";
import translationEnglish from "./Translations/English/translations.json";
import translationHungarian from "./Translations/Hungarian/translations.json";

const resources = {
    en: {
        translation: translationEnglish,
    },
    hu: {
        translation: translationHungarian,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: Languages.English,
});

export default i18next;
