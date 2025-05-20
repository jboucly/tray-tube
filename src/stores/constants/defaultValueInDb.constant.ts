import { StoreData } from '../schemas/storeData.schema';
import { Language } from './../../common/enums/language.enum';

export const DefaultValueInDb: StoreData = {
    language: Language.EN,
    ytDownloadHistory: []
};
