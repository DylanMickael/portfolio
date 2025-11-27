const DEFAULT_LANG = "EN";
let TRANSLATIONS = {};

const i18nUtil = {
    initI18N() {
        var preferedLanguage = window.localStorage.getItem("PREFERED_LANGUAGE");
        if (!preferedLanguage) {
            window.localStorage.setItem("PREFERED_LANGUAGE", DEFAULT_LANG);
        }
    },
    getCurrentLang() {
        var currentLang = window.localStorage.getItem("PREFERED_LANGUAGE");
        if (!currentLang) {
            currentLang = DEFAULT_LANG;
            window.localStorage.setItem("PREFERED_LANGUAGE", currentLang);
        }
        return currentLang;
    },
    setCurrentLang(key) {
        window.localStorage.setItem("PREFERED_LANGUAGE", key);
    },

    async loadTranslations() {
        const lang = this.getCurrentLang().toLowerCase();
        try {
            const response = await fetch(`/assets/i18n/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load translation file for ${lang}`);
            }
            TRANSLATIONS = await response.json();
        } catch (error) {
            console.error("Error loading TRANSLATIONS:", error);
            TRANSLATIONS = {};
        }
    },

    getTranslation(key) {
        return TRANSLATIONS[key] ? TRANSLATIONS[key] : `{{${key}}}`;
    }
};
