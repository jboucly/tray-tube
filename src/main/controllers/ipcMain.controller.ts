import { app, dialog } from 'electron';
import i18next from 'i18next';
import { AppMessageToVue } from '../enums/AppMessageToVue.enum';
import { VueMessageToApp } from '../enums/vueMessageToApp.enum';
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

    public async setTrayIpcEvent(trayModel: TrayModel): Promise<void> {
        this.ipcMain.on(VueMessageToApp.CHOOSE_FOLDER, async (event) => {
            if (trayModel.win === null) throw new Error('Window is null');

            const result = await dialog.showOpenDialog(trayModel.win, {
                properties: ['openDirectory'],
                defaultPath: app.getPath('desktop'),
                title: i18next.t('electron.select_folder_dialog.title'),
                message: i18next.t('electron.select_folder_dialog.message'),
                buttonLabel: i18next.t('electron.select_folder_dialog.button_label')
            });

            if (result.canceled || !result.filePaths[0]) return;

            event.reply(AppMessageToVue.MSG_VUE, {
                type: VueMessageToApp.SELECTED_FOLDER,
                data: result.filePaths[0]
            });
        });

        this.ipcMain.on(VueMessageToApp.DOWNLOAD_VIDEO, async (event, { urlVideo, format, outputFolder }) => {
            Logger.info('Download video', urlVideo, format, outputFolder);
            await this.ytDownloaderService.downloadVideo(urlVideo, format, outputFolder);
        });
    }
}
