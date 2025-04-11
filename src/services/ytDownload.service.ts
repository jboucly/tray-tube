import { spawn } from 'child_process';
import { FileAudio, FileFormat, FileFormatAudio, FileFormatVideo, FileVideo } from '../common/types/fileFormat.type';
import { GetBinary } from '../utils/getBinary.utils';
import { Logger } from '../utils/logger.utils';

export class YtDownloadService {
    private ytDlpBinary = GetBinary();

    public async downloadVideo(urlVideo: string, format: FileFormat, outputFolder: string): Promise<void> {
        try {
            let args: string[] = [];
            const { format: audioFormat, isAudio } = this.isAudioFormat(format);
            const { format: videoFormat, isVideo } = this.isVideoFormat(format);

            if (isAudio) {
                args = [
                    '-x', // Extract only audio
                    '--audio-format',
                    audioFormat,
                    '-o',
                    `${outputFolder}/%(title)s.%(ext)s`,
                    urlVideo
                ];
            } else if (isVideo) {
                args = [
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
        await new Promise<void>((resolve, reject) => {
            const ytDlp = spawn(this.ytDlpBinary, args);

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
}
