import { contextBridge, ipcRenderer, shell } from 'electron';
import { StoreData } from 'src/stores/schemas/storeData.schema';
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
    // Events
    sendToMain: (channel: string, data: any) => {
        ipcRenderer.send(channel, data);
    },
    onFromElectron: (callback: (data: { type: VueMessageToApp; data: any }) => void) => {
        ipcRenderer.on(AppMessageToVue.MSG_VUE, (_event, data) => callback(data));
    },

    // Store
    getStoreValue: async (key: string) => await ipcRenderer.invoke(VueMessageToApp.GET_STORE, key),
    setStoreValue: async <T>(key: keyof StoreData, value: T) =>
        await ipcRenderer.invoke(VueMessageToApp.SET_STORE, key, value),
    removeStoreValue: async <T>(key: keyof StoreData, value: T) =>
        await ipcRenderer.invoke(VueMessageToApp.REMOVE_STORE, key, value),
    clearKeyStore: async (key: keyof StoreData) => await ipcRenderer.invoke(VueMessageToApp.CLEAR_KEY_STORE, key),

    // System
    openInBrowser: (url: string) => {
        console.log('Open external link:', url);
        shell.openExternal(url);
    }
});
