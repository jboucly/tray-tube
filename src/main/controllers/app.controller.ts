import { platform } from 'os';
import { TrayModel } from '../models/tray.model';

export class AppController {
    public tray: TrayModel;

    constructor() {
        this.tray = new TrayModel();

        if (platform() === 'win32') {
            this.tray.createPopupWindow();
        }
    }

    public async init(): Promise<void> {
        this.tray.initTray();
    }
}
