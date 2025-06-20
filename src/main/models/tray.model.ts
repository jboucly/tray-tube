import { app, BrowserWindow, Menu, Tray } from 'electron';
import i18next from 'i18next';
import { join } from 'path';
import { Logger } from '../utils/logger.utils';

export class TrayModel {
    public win: BrowserWindow | null = null;

    private tray: Tray | null = null;

    public initTray(): void {
        this.tray = new Tray(join(__dirname, '../../assets/logo-32x32.png'));

        const contextMenu = Menu.buildFromTemplate([
            {
                label: i18next.t('electron.tray.show'),
                click: () => this.createPopupWindow()
            },
            { type: 'separator' },
            { label: i18next.t('electron.tray.exit'), click: () => app.exit(0) }
        ]);

        this.tray.setToolTip('Downloader for Youtube');
        this.tray.setContextMenu(contextMenu);
    }

    public destroyTray(): void {
        if (this.tray) {
            this.tray.destroy();
        }
    }

    public createPopupWindow(): void {
        if (this.win) {
            this.win.show();
            this.win.focus();
            return;
        }

        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            frame: true,
            closable: true,
            resizable: true,
            alwaysOnTop: true,
            skipTaskbar: true,
            webPreferences: {
                preload: join(__dirname, '../preload.js'),
                nodeIntegration: true,
                contextIsolation: true
            }
        });

        this.win.removeMenu();

        if (!app.isPackaged) {
            this.win.loadURL('http://localhost:5173');
        } else {
            this.win.loadFile(join(__dirname, '..', '..', 'ui/index.html'));
        }

        this.win.on('close', (event) => {
            event.preventDefault();
            this.win?.hide();
        });

        this.win.on('closed', () => {
            this.win = null;
            Logger.info('Tray window closed');
        });
    }
}
