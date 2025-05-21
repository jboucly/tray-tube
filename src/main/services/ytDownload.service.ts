import { spawn } from 'child_process';
import { BrowserWindow, nativeImage, shell } from 'electron';
import { promises } from 'fs';
import i18next from 'i18next';
import { join, normalize } from 'path';
import * as readline from 'readline';
import { FileAudio, FileFormat, FileFormatAudio, FileFormatVideo, FileVideo } from '../../common/types/fileFormat.type';
import { YtDownloadHistoryProperty } from '../../stores/schemas/ytDownloadHistory.schema';
import { Store } from '../../stores/store.client';
import { AppMessageToVue } from '../enums/AppMessageToVue.enum';
import { VueMessageToApp } from '../enums/vueMessageToApp.enum';
import { GetBinaries } from '../utils/getBinary.utils';
import { Logger } from '../utils/logger.utils';
import { sendNotification } from '../utils/notification.utils';
import { sanitizePath } from '../utils/path.utils';

export class YtDownloadService {
    private readonly binaries = GetBinaries();

    public async downloadVideo(urlVideo: string, format: FileFormat, outputFolder: string): Promise<void> {
        try {
            let args: string[] = [];
            const { format: audioFormat, isAudio } = this.isAudioFormat(format);
            const { format: videoFormat, isVideo } = this.isVideoFormat(format);

            if (isAudio) {
                args = [
                    '--ffmpeg-location',
                    this.binaries.ffmpegPath,
                    '-x', // Extract only audio
                    '--audio-format',
                    audioFormat,
                    '-o',
                    sanitizePath(join(outputFolder, '%(title)s.%(ext)s')),
                    urlVideo
                ];
            } else if (isVideo) {
                args = [
                    '--ffmpeg-location',
                    this.binaries.ffmpegPath,
                    '-f',
                    'bv*+ba/best', // Best video + best audio
                    '--merge-output-format',
                    videoFormat,
                    '-o',
                    sanitizePath(join(outputFolder, '%(title)s.%(ext)s')),
                    urlVideo
                ];
            } else throw new Error('Invalid format type');

            const metadata = await this.getVideoMetadata(urlVideo);
            await this.runDownloadProcess(args, outputFolder, metadata);
        } catch (err) {
            console.error('❌ [YtDownloadService] Error :', err);
        }
    }

    private async runDownloadProcess(
        args: string[],
        outputFolder: string,
        metadata: YtDownloadHistoryProperty
    ): Promise<void> {
        await this.checkBinaryExists();
        // Is not possible to have multiple windows. Not get focused window because it can be closed
        const window = BrowserWindow.getAllWindows()[0];
        let isAlreadyDownloaded = false;

        await new Promise<void>((resolve, reject) => {
            Logger.info('🚀 [yt-dlp] Run download with args :', this.binaries, args);
            const ytDlp = spawn(this.binaries.ytDlpPath, args);

            ytDlp.on('spawn', () => {
                Logger.info('🚀 [yt-dlp] Process spawned');
            });

            ytDlp.on('error', (err) => {
                Logger.error('❌ Error when spawn yt-dlp :', err);
                reject(err);
            });

            readline.createInterface({ input: ytDlp.stdout }).on('line', (line) => {
                const res = this.sendProgressToRenderer(line, window);
                if (res.isAlreadyDownloaded) {
                    isAlreadyDownloaded = true;
                }
            });

            ytDlp.stderr.on('data', (data) => {
                Logger.error(`🚀 [yt-dlp] stderr : ${data}`);
            });

            ytDlp.stdout.on('data', (data: string) => {
                Logger.info(`🚀 [yt-dlp] stdout : ${data}`);
            });

            ytDlp.on('close', async (code) => {
                if (code === 0) {
                    Logger.info('✅ [yt-dlp] finished successfully');

                    if (!isAlreadyDownloaded) {
                        await Store.insert<YtDownloadHistoryProperty>('ytDownloadHistory', metadata);
                    }

                    window?.webContents.send(AppMessageToVue.MSG_VUE, {
                        type: VueMessageToApp.DOWNLOAD_PROGRESS_END
                    });

                    sendNotification({
                        onClick: () => shell.openPath(normalize(outputFolder)),
                        body: i18next.t('electron.notifications.download_complete.body'),
                        title: i18next.t('electron.notifications.download_complete.title'),
                        icon: nativeImage.createFromPath(join(__dirname, '../../assets/icons/downloaded.png'))
                    });

                    resolve();
                } else {
                    reject(new Error(`yt-dlp terminated with error code : ${code}`));
                }
            });
        });
    }

    /**
     * @description Get video metadata using yt-dlp, this is used to get all information about the video
     */
    private async getVideoMetadata(urlVideo: string): Promise<YtDownloadHistoryProperty> {
        return new Promise((resolve, reject) => {
            let output = '';
            const ytDlp = spawn(this.binaries.ytDlpPath, ['-j', urlVideo]);

            ytDlp.stdout.on('data', (data) => {
                output += data.toString();
            });

            ytDlp.on('close', () => {
                try {
                    const json = JSON.parse(output);
                    const metadata: YtDownloadHistoryProperty = {
                        id: json.id,
                        title: json.title,
                        url: json.webpage_url,
                        thumbnail: json.thumbnail,
                        createdAt: new Date().toISOString()
                    };

                    Logger.info('🚀 [yt-dlp] Metadata :', metadata);
                    resolve(metadata);
                } catch (e) {
                    reject(e);
                }
            });

            ytDlp.on('error', (err) => {
                Logger.error('❌ Error when spawn for metadata yt-dlp :', err);
                reject(err);
            });
        });
    }

    private isAudioFormat(format: FileFormat): { format: FileFormatAudio; isAudio: boolean } {
        return {
            format: format as FileFormatAudio,
            isAudio: FileAudio.includes(format as FileFormatAudio)
        };
    }

    private isVideoFormat(format: FileFormat): { format: FileFormatVideo; isVideo: boolean } {
        return {
            format: format as FileFormatVideo,
            isVideo: FileVideo.includes(format as FileFormatVideo)
        };
    }

    private async checkBinaryExists(): Promise<void> {
        const isFileExist = await promises
            .access(this.binaries.ytDlpPath)
            .then(() => true)
            .catch(() => false);

        if (!isFileExist) {
            Logger.error('❌ yt-dlp binary not found at', this.binaries);
            return;
        }
    }

    private sendProgressToRenderer(data: string, window: BrowserWindow | null): { isAlreadyDownloaded: boolean } {
        let valToReturn = { isAlreadyDownloaded: false };
        const match = data.match(/\[download\]\s+(\d{1,3}\.\d+)%/);
        const matchAlreadyDownloaded = data.includes('has already been downloaded');

        if (window && match) {
            const progress = parseFloat(match[1]);

            window.webContents.send(AppMessageToVue.MSG_VUE, {
                type: VueMessageToApp.DOWNLOAD_PROGRESS,
                data: progress
            });
        }

        if (window && matchAlreadyDownloaded) {
            valToReturn.isAlreadyDownloaded = true;

            window.webContents.send(AppMessageToVue.MSG_VUE, {
                type: VueMessageToApp.DOWNLOAD_PROGRESS,
                data: 100
            });

            window.webContents.send(AppMessageToVue.MSG_VUE, {
                type: VueMessageToApp.DOWNLOAD_ALREADY_EXISTS
            });
        }

        return valToReturn;
    }
}
