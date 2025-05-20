import i18next from 'i18next';
import { Store } from '../stores/store.client';
import en from './en';
import fr from './fr';

export const initI18nextSync = async () => {
    const savedLang = await Store.get('language');

    if (!savedLang) {
        await Store.set('language', 'en');
    }

    i18next.init({
        lng: savedLang,
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
