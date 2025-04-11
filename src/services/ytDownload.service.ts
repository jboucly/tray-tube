import { spawn } from 'child_process';
import { promises } from 'fs';
import { FileAudio, FileFormat, FileFormatAudio, FileFormatVideo, FileVideo } from '../common/types/fileFormat.type';
import { GetBinaries } from '../utils/getBinary.utils';
import { Logger } from '../utils/logger.utils';

export class YtDownloadService {
    private binaries = GetBinaries();

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
                    `${outputFolder}/%(title)s.%(ext)s`,
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
                    `${outputFolder}/%(title)s.%(ext)s`,
                    urlVideo
                ];
            } else throw new Error('Invalid format type');

            await this.runDownloadProcess(args);
        } catch (err) {
            console.error('❌ [YtDownloadService] Error :', err);
        }
    }

    private async runDownloadProcess(args: string[]): Promise<void> {
        await this.checkBinaryExists();

        await new Promise<void>((resolve, reject) => {
            Logger.info('🚀 [yt-dlp] Run download with args :', this.binaries, args);
            const ytDlp = spawn(this.binaries.ytDlpPath, args);

            ytDlp.on('spawn', () => {
                Logger.info('🚀 [yt-dlp] Process spawned');
            });

            ytDlp.on('message', (msg) => {
                Logger.info('🚀 [yt-dlp] Message from process :', msg);
            });

            ytDlp.on('disconnect', () => {
                Logger.info('🚀 [yt-dlp] Process disconnected');
            });

            ytDlp.on('error', (err) => {
                Logger.error('❌ Error when spawn yt-dlp :', err);
                reject(err);
            });

            ytDlp.stdout.on('data', (data) => {
                Logger.info(`🚀 [yt-dlp] stdout : ${data}`);
            });

            ytDlp.stderr.on('data', (data) => {
                Logger.error(`🚀 [yt-dlp] stderr : ${data}`);
            });

            ytDlp.on('close', (code) => {
                if (code === 0) {
                    Logger.info('✅ yt-dlp finished successfully');
                    resolve();
                } else {
                    reject(new Error(`yt-dlp terminated with error code : ${code}`));
                }
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
}
