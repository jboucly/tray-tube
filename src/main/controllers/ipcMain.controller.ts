import { app, dialog } from 'electron';
import { TrayModel } from '../models/tray.model';
import { YtDownloadService } from '../services/ytDownload.service';
import { Logger } from '../utils/logger.utils';

export class IpcMainController {
    private ipcMain: Electron.IpcMain;
    private ytDownloaderService: YtDownloadService;

    constructor(ipcMain: Electron.IpcMain) {
        this.ipcMain = ipcMain;
        this.ytDownloaderService = new YtDownloadService();
    }

    public async init(): Promise<void> {
        // Set log from renderer
        this.ipcMain.on('log-from-renderer', (_event, message) => {
            Logger.info('[Renderer]', message);
        });
    }

    public async setTrayIpcEvent(trayModel: TrayModel): Promise<void> {
        this.ipcMain.on('choose-folder', async (event) => {
            const result = await dialog.showOpenDialog({
                properties: ['openDirectory'],
                defaultPath: app.getPath('desktop'),
                title: 'Select a folder to save the file'
            });

            if (result.canceled || !result.filePaths[0]) return;

            event.reply('selected-folder', result.filePaths[0]);
        });

        this.ipcMain.on('download-video', async (event, { urlVideo, format, outputFolder }) => {
            Logger.info('Download video', urlVideo, format, outputFolder);
            trayModel.win?.close();
            await this.ytDownloaderService.downloadVideo(urlVideo, format, outputFolder);
        });
    }
}
