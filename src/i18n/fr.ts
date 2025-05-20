import { ResourceKey } from 'i18next';

export default {
    app: {
        home: {
            title: 'Téléchargeur YouTube',
            placeholder: 'Coller une URL YouTube ici...',
            choose_folder: 'Choisir un dossier de sortie',
            download: 'Télécharger',
            no_folder: 'Aucun dossier sélectionné',
            folder_prefix: 'Dossier de sortie :',
            download_complete: 'Téléchargement terminé !',
            invalid_url: 'Veuillez entrer une URL valide.',
            no_folder_warning: 'Veuillez choisir un dossier de sortie.'
        }
    },
    electron: {
        select_folder_dialog: {
            title: 'Sélectionner un dossier pour enregistrer le fichier',
            message: 'Sélectionner un dossier pour enregistrer le fichier',
            button_label: 'Sélectionner'
        },
        notifications: {
            download_complete: {
                title: 'Téléchargement terminé',
                body: 'Votre vidéo a été téléchargée avec succès !'
            }
        },
        tray: {
            show: 'Ouvrir TrayTube',
            exit: 'Quitter'
        }
    }
} as ResourceKey;
