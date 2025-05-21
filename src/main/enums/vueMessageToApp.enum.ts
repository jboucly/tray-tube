export enum VueMessageToApp {
    DOWNLOAD_VIDEO = 'download-video',
    DOWNLOAD_PROGRESS = 'download-progress',
    DOWNLOAD_PROGRESS_END = 'download-progress-end',

    CHOOSE_FOLDER = 'choose-folder',
    SELECTED_FOLDER = 'selected-folder',

    CHANGE_LANGUAGE = 'change-language',

    GET_STORE = 'get-store',
    SET_STORE = 'set-store',
    REMOVE_STORE = 'remove-store',
    CLEAR_KEY_STORE = 'clear-key-store'
}

export type VueMessageTypeValue = `${VueMessageToApp}`;
