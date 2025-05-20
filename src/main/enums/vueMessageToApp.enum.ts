export enum VueMessageToApp {
    DOWNLOAD_VIDEO = 'download-video',
    DOWNLOAD_PROGRESS = 'download-progress',
    DOWNLOAD_PROGRESS_END = 'download-progress-end',

    CHOOSE_FOLDER = 'choose-folder',
    SELECTED_FOLDER = 'selected-folder',

    CHANGE_LANGUAGE = 'change-language',
    GET_STORE = 'get-store'
}

export type VueMessageTypeValue = `${VueMessageToApp}`;
