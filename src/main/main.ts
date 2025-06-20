import { app, ipcMain } from 'electron';
import log from 'electron-log/main';
import i18next from 'i18next';
import { initI18nextSync } from '../i18n/initSync';
import { DefaultValueInDb } from '../stores/constants/defaultValueInDb.constant';
import { Store } from '../stores/store.client';
import { AppController } from './controllers/app.controller';
import { IpcMainController } from './controllers/ipcMain.controller';
import { VueMessageToApp } from './enums/vueMessageToApp.enum';
import { Logger } from './utils/logger.utils';

async function main() {
    try {
        await app.whenReady();

        await Store.init(DefaultValueInDb);

        log.initialize();
        await initI18nextSync();

        const appController = new AppController();
        const ipcMainController = new IpcMainController(ipcMain);

        await appController.init();
        await ipcMainController.setTrayIpcEvent(appController.tray);

        console.info('🚀 Yt-Tray app is running');

        ipcMain.on(VueMessageToApp.CHANGE_LANGUAGE, async (_event, lng) => {
            Logger.info('Change language to', lng);
            await i18next.changeLanguage(lng);
            await Store.set('language', lng);

            appController.tray.destroyTray();
            appController.tray.initTray();
        });

        app.on('will-quit', () => {
            Logger.info('App is quitting...');
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        process.on('uncaughtException', (err) => {
            console.error('Uncaught Exception:', err);
        });

        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at :', promise, 'reason :', reason);
        });
    } catch (error) {
        console.error('Error during app initialization :', error);
    }
}

main();
