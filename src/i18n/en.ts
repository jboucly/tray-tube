import { ResourceKey } from 'i18next';

export default {
    app: {
        home: {
            title: 'YouTube Downloader',
            placeholder: 'Paste a YouTube URL here...',
            choose_folder: 'Choose output folder',
            download: 'Download',
            no_folder: 'No folder selected',
            folder_prefix: 'Output folder:',
            download_complete: 'Download complete!',
            invalid_url: 'Please enter a valid URL.',
            no_folder_warning: 'Please choose an output folder.'
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
        }
    }
} as ResourceKey;
