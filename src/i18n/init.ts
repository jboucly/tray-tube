import i18next from 'i18next';
import { Language } from './../common/enums/language.enum';
import en from './en';
import fr from './fr';

export const initI18next = () => {
    i18next.init({
        lng: Language.EN,
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
