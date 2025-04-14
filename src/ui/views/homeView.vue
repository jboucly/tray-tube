<script setup lang="ts">
import { NButton, NInput, NProgress, NSelect, useMessage } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { FileAudio, FileVideo } from '../../common/types/fileFormat.type';

const message = useMessage();

const url = ref('');
const percentage = ref(0);
const format = ref('wav');
const selectedFolder = ref('');

onMounted(() => {
    window.electronAPI.onFromElectron((event) => {
        console.log('Message reçu depuis Electron :', event);

        switch (event.type) {
            case 'download-progress':
                percentage.value = event.data;

                if (percentage.value === 100) {
                    message.success('Téléchargement terminé !');
                    percentage.value = 0;
                }
                break;
            case 'selected-folder':
                selectedFolder.value = event.data;
                break;
        }
    });
});

const formatOptions = [
    Object.values(FileAudio).map((format) => ({
        label: format.toUpperCase(),
        value: format
    })),
    Object.values(FileVideo).map((format) => ({
        label: format.toUpperCase(),
        value: format
    }))
].flat();

const chooseFolder = () => {
    window.electronAPI.sendToMain('choose-folder');
};

const download = () => {
    if (!url.value && url.value.includes('https://')) {
        message.warning('Veuillez entrer une URL valide.');
        return;
    }

    if (!selectedFolder.value) {
        message.warning('Veuillez choisir un dossier de sortie.');
        return;
    }

    percentage.value = 1;

    window.electronAPI.sendToMain('download-video', {
        urlVideo: url.value,
        format: format.value,
        outputFolder: selectedFolder.value
    });
};
</script>

<template>
    <div style="padding: 20px; background-color: #1e1e1e; color: white; min-height: 100vh">
        <h3 style="text-align: center; margin-top: 0">Téléchargeur YouTube</h3>

        <n-input v-model:value="url" placeholder="Coller une URL YouTube ici..." style="margin-bottom: 10px" />
        <n-select v-model:value="format" :options="formatOptions" style="margin-bottom: 10px" />
        <n-button type="error" block @click="chooseFolder" style="margin-bottom: 5px">
            Choisir un dossier de sortie
        </n-button>
        <p>Dossier de sortie : {{ selectedFolder || 'Aucun sélectionné' }}</p>

        <n-progress
            v-if="percentage"
            type="line"
            status="success"
            :percentage="percentage"
            indicator-placement="inside"
        />

        <n-button type="error" block :disabled="percentage !== 0" @click="download">Télécharger</n-button>
    </div>
</template>
