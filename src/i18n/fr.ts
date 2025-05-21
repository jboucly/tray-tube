export default {
    app: {
        modal: {
            warning: 'Attention'
        },
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
        },
        downloadHistory: {
            title: 'Historique des téléchargements',
            empty: 'Aucun téléchargement effectué.',
            delete_all: 'Tout supprimer',
            confirm_delete_all: 'Êtes-vous sûr de vouloir tout supprimer ?',
            confirm_button_label: 'Supprimer',
            cancel_button_label: 'Annuler',
            see_all: 'Voir tout'
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
};

export type FrTranslation = typeof import('./fr').default;
