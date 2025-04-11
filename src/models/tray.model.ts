import { BrowserWindow, Menu, Tray } from 'electron';
import { join } from 'path';
import { Logger } from '../utils/logger.utils';

export class TrayModel {
    public win: BrowserWindow | null = null;

    private tray: Tray | null = null;

    public initTray(): void {
        this.tray = new Tray(join(__dirname, '../../src/assets/logo-32x32.png'));

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Open Yt-Tray',
                click: () => this.createPopupWindow()
            },
            { type: 'separator' },
            { role: 'quit' }
        ]);

        this.tray.setToolTip('Downloader for Youtube');
        this.tray.setContextMenu(contextMenu);
    }

    public createPopupWindow(): void {
        if (this.win) {
            this.win.focus();
            return;
        }

        this.win = new BrowserWindow({
            frame: true,
            closable: true,
            resizable: true,
            alwaysOnTop: true,
            skipTaskbar: true,
            webPreferences: {
                preload: join(__dirname, '../preload.js'),
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        this.win.loadFile(join(__dirname, '../../src/ui/index.html'));

        this.win.on('closed', () => {
            this.win = null;
            Logger.info('Tray window closed');
        });
    }
}
