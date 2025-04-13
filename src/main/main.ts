import { app, ipcMain } from 'electron';
import log from 'electron-log/main';
import { AppController } from './controllers/app.controller';
import { IpcMainController } from './controllers/ipcMain.controller';
import { Logger } from './utils/logger.utils';

async function main() {
    try {
        await app.whenReady();
        log.initialize();

        const appController = new AppController();
        const ipcMainController = new IpcMainController(ipcMain);

        await appController.init();
        await ipcMainController.setTrayIpcEvent(appController.tray);

        console.info('🚀 Yt-Tray app is running');

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
