import { createI18n } from 'vue-i18n';
import en from './en';
import fr from './fr';

const locale = localStorage.getItem('locale') || 'fr';

export const i18n = createI18n({
    legacy: false,
    locale: locale,
    fallbackLocale: 'en',
    messages: {
        en,
        fr
    }
});
