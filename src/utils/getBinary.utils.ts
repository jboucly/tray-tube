import { app } from 'electron';
import { platform } from 'os';
import { join } from 'path';

export const GetBinary = (): string => {
    let ytDlpPath = '';
    const isDev = !app.isPackaged;

    ytDlpPath = isDev ? join(process.resourcesPath, 'binaries') : join(__dirname, '../../binaries');

    if (platform() === 'win32') {
        ytDlpPath = join(ytDlpPath, 'yt-dlp.exe');
    } else if (platform() === 'darwin') {
        ytDlpPath = join('yt-dlp');
    } else {
        ytDlpPath = join('yt-dlp');
    }

    return ytDlpPath;
};
