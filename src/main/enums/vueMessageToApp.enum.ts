export enum VueMessageToApp {
    DOWNLOAD_VIDEO = 'download-video',
    DOWNLOAD_PROGRESS = 'download-progress',

    CHOOSE_FOLDER = 'choose-folder',
    SELECTED_FOLDER = 'selected-folder'
}

export type VueMessageTypeValue = `${VueMessageToApp}`;
