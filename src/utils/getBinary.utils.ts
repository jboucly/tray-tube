import { app } from 'electron';
import { platform } from 'os';
import { join } from 'path';
import { Logger } from './logger.utils';

export const GetBinaries = (): { ytDlpPath: string; ffmpegPath: string } => {
    let ytDlpPath = '';
    let ffmpegPath = '';
    const isDev = !app.isPackaged;

    ytDlpPath = isDev ? join(__dirname, '../../binaries') : join(process.resourcesPath, 'binaries');
    ffmpegPath = isDev ? join(__dirname, '../../binaries') : join(process.resourcesPath, 'binaries');

    if (platform() === 'win32') {
        ytDlpPath = join(ytDlpPath, 'yt-dlp.exe');
    } else if (platform() === 'darwin') {
        ytDlpPath = join(ytDlpPath, 'yt-dlp');
    } else {
        ytDlpPath = join(ytDlpPath, 'yt-dlp');
    }

    ffmpegPath = join(ffmpegPath, 'ffmpeg');

    Logger.info('🚀 [getBinary] yt-dlp path :', ytDlpPath);
    Logger.info('🚀 [getBinary] ffmpeg path :', ffmpegPath);

    return { ytDlpPath, ffmpegPath };
};
