import { VueMessageToApp, VueMessageTypeValue } from '../main/enums/vueMessageToApp.enum';

declare global {
    interface Window {
        electronAPI: {
            sendToMain: (channel: VueMessageTypeValue, data?: any) => void;
            onFromElectron: (callback: (data: { type: VueMessageToApp; data: any }) => void) => void;
        };
    }
}

export {};
