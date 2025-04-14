import { TrayModel } from '../models/tray.model';

export class AppController {
    public tray: TrayModel;

    constructor() {
        this.tray = new TrayModel();
    }

    public async init(): Promise<void> {
        this.tray.initTray();
    }
}
