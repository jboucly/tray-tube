import { VueMessageTypeValue } from '../main/enums/vueMessageToApp.enum';

declare global {
    interface Window {
        electronAPI: {
            sendToMain: (channel: VueMessageTypeValue, data?: any) => void;
            onFromElectron: (callback: (data: { type: VueMessageTypeValue; data: any }) => void) => void;
        };
    }
}

export {};
