import i18next from 'i18next';
import en from './en';
import fr from './fr';

export const initI18next = (locale: string) => {
    i18next.init({
        lng: locale,
        debug: true,
        resources: {
            en: {
                translation: en
            },
            fr: {
                translation: fr
            }
        }
    });
};
