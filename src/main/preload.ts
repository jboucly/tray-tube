import { contextBridge, ipcRenderer } from 'electron';
import { AppMessageToVue } from './enums/AppMessageToVue.enum';
import { VueMessageToApp } from './enums/vueMessageToApp.enum';
import { Logger } from './utils/logger.utils';

Logger.info('✅ Preload script loaded');

console.log = (...args) => {
    Logger.info('[Renderer]', ...args);
};

console.error = (...args) => {
    Logger.error('[Renderer]', ...args);
};

contextBridge.exposeInMainWorld('electronAPI', {
    sendToMain: (channel: string, data: any) => {
        ipcRenderer.send(channel, data);
    },
    onFromElectron: (callback: (data: { type: VueMessageToApp; data: any }) => void) => {
        ipcRenderer.on(AppMessageToVue.MSG_VUE, (_event, data) => callback(data));
    },
    getStoreValue: async (key: string) => await ipcRenderer.invoke(VueMessageToApp.GET_STORE, key)
});
