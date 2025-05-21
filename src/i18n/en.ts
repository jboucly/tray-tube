import { ResourceKey } from 'i18next';

export default {
    app: {
        modal: {
            warning: 'Warning'
        },
        sidebar: {
            home: 'Home',
            download_history: 'Download History'
        },
        home: {
            title: 'YouTube Downloader',
            placeholder: 'Paste a YouTube URL here...',
            choose_folder: 'Choose output folder',
            download: 'Download',
            no_folder: 'No folder selected',
            folder_prefix: 'Output folder:',
            download_complete: 'Download complete!',
            invalid_url: 'Please enter a valid URL.',
            no_folder_warning: 'Please choose an output folder.',
            download_already_exists: 'The file already exists, you have already downloaded this video.'
        },
        downloadHistory: {
            title: 'Download History',
            empty: 'No downloads made.',
            delete_all: 'Delete all',
            confirm_delete_all: 'Are you sure you want to delete all ?',
            confirm_button_label: 'Delete',
            cancel_button_label: 'Cancel',
            see_all: 'See all'
        }
    },
    electron: {
        select_folder_dialog: {
            title: 'Select a folder to save the file',
            message: 'Select a folder to save the file',
            button_label: 'Select Folder'
        },
        notifications: {
            download_complete: {
                title: 'Download complete',
                body: 'Your video has been downloaded successfully !'
            }
        },
        tray: {
            show: 'Show TrayTube',
            exit: 'Exit'
        }
    }
} as ResourceKey;
