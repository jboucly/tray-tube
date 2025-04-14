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
                break;
            case 'download-progress-end':
                percentage.value = 0;
                message.success('Téléchargement terminé !');
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
    if (!url.value || !url.value.includes('https://')) {
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
    <div class="container">
        <div class="card">
            <h2 class="title">Téléchargeur YouTube</h2>

            <n-input v-model:value="url" placeholder="Coller une URL YouTube ici..." class="input" size="large" />

            <n-select v-model:value="format" :options="formatOptions" class="input" size="large" />

            <n-button type="error" block size="large" @click="chooseFolder" class="input">
                Choisir un dossier de sortie
            </n-button>

            <p class="folder-info">
                Dossier de sortie : <span class="folder">{{ selectedFolder || 'Aucun sélectionné' }}</span>
            </p>

            <n-progress
                v-if="percentage"
                type="line"
                status="success"
                :percentage="percentage"
                indicator-placement="inside"
                class="input"
            />

            <n-button
                type="error"
                block
                size="large"
                :disabled="percentage !== 0"
                @click="download"
                class="download-btn"
            >
                Télécharger
            </n-button>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    color: #ffffff;
}

.card {
    max-width: 500px;
    width: 100%;
    padding: 30px;
    border-radius: 12px;
    /* background-color: #1e1e1e; */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.title {
    text-align: center;
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: bold;
    color: #ff0000; /* YouTube Red */
}

.input {
    margin-bottom: 16px;
}

.folder-info {
    font-size: 14px;
    margin-bottom: 12px;
    color: #aaa;
}

.folder {
    /* color: #fff; */
    font-weight: bold;
}

.download-btn {
    margin-top: 12px;
}
</style>
