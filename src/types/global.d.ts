import { VueMessageTypeValue } from '../main/enums/vueMessageToApp.enum';
import { StoreData } from '../stores/schemas/storeData.schema';

declare global {
    interface Window {
        electronAPI: {
            // Events
            sendToMain: (channel: VueMessageTypeValue, data?: any) => void;
            onFromElectron: (callback: (data: { type: VueMessageTypeValue; data: any }) => void) => void;

            // Store
            getStoreValue: <T>(key: keyof StoreData) => Promise<T>;
            setStoreValue: <T>(key: keyof StoreData, value: T) => Promise<void>;
            removeStoreValue: <T>(key: keyof StoreData, value: T) => Promise<void>;
            clearKeyStore: (key: keyof StoreData) => Promise<void>;

            // System
            openInBrowser: (url: string) => void;
        };
    }
}

export {};
