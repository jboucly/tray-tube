export enum VueMessageToApp {
    DOWNLOAD_VIDEO = 'download-video',
    DOWNLOAD_PROGRESS = 'download-progress',
    DOWNLOAD_PROGRESS_END = 'download-progress-end',

    CHOOSE_FOLDER = 'choose-folder',
    SELECTED_FOLDER = 'selected-folder'
}

export type VueMessageTypeValue = `${VueMessageToApp}`;
