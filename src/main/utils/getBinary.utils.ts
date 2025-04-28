import { app } from 'electron';
import { platform } from 'os';
import { join } from 'path';
import { Logger } from './logger.utils';
import { sanitizePath } from './path.utils';

export const GetBinaries = (): { ytDlpPath: string; ffmpegPath: string } => {
    let ytDlpPath = '';
    let ffmpegPath = '';
    const isDev = !app.isPackaged;

    ytDlpPath = isDev ? join(__dirname, '../../../binaries') : join(process.resourcesPath, 'binaries');
    ffmpegPath = isDev ? join(__dirname, '../../../binaries') : join(process.resourcesPath, 'binaries');

    if (platform() === 'win32') {
        ffmpegPath = sanitizePath(join(ffmpegPath, 'win'));
        ytDlpPath = sanitizePath(join(ytDlpPath, 'win', 'yt-dlp.exe'));
    } else if (platform() === 'darwin') {
        ytDlpPath = join(ytDlpPath, 'mac', 'yt-dlp');
        ffmpegPath = join(ffmpegPath, 'mac', 'ffmpeg');
    } else {
        throw new Error('Unsupported platform: ' + platform());
    }

    Logger.info('🚀 [getBinary] yt-dlp path :', ytDlpPath);
    Logger.info('🚀 [getBinary] ffmpeg path :', ffmpegPath);

    return { ytDlpPath, ffmpegPath };
};
