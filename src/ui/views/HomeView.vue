<script setup lang="ts">
import DownloadHistory from '@/components/DownloadHistory.vue';
import { useTranslation } from 'i18next-vue';
import { NButton, NInput, NProgress, NSelect, useMessage } from 'naive-ui';
import { onMounted, ref, watch } from 'vue';
import { FileAudio, FileVideo } from '../../common/types/fileFormat.type';

const { t } = useTranslation();
const message = useMessage();

let isAlreadyDownloading = false;
const url = ref('');
const percentage = ref(0);
const format = ref('wav');
const selectedFolder = ref('');
const reloadHistoryData = ref<InstanceType<typeof DownloadHistory>>();

onMounted(() => {
    window.electronAPI.onFromElectron(async (event) => {
        switch (event.type) {
            case 'download-progress':
                percentage.value = event.data;
                break;
            case 'download-progress-end':
                percentage.value = 0;
                await reloadHistoryData.value?.reloadData();

                if (!isAlreadyDownloading) {
                    message.success(t('app.home.download_complete'));
                }
                isAlreadyDownloading = false;
                break;
            case 'selected-folder':
                selectedFolder.value = event.data;
                break;
            case 'download-already-exists':
                isAlreadyDownloading = true;
                message.warning(t('app.home.download_already_exists'));
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
        message.warning(t('app.home.invalid_url'));
        return;
    }

    if (!selectedFolder.value) {
        message.warning(t('app.home.no_folder_warning'));
        return;
    }

    percentage.value = 1;

    window.electronAPI.sendToMain('download-video', {
        urlVideo: url.value,
        format: format.value,
        outputFolder: selectedFolder.value
    });
};

watch(percentage, (newValue) => {
    if (newValue === 0) {
        url.value = '';
        format.value = 'wav';
    }
});
</script>

<template>
    <div class="container">
        <div class="card">
            <h2 class="title">{{ t('app.home.title') }}</h2>

            <n-input
                v-model:value="url"
                :disabled="percentage > 0"
                :placeholder="t('app.home.placeholder')"
                class="input"
                size="large"
            />

            <n-select
                v-model:value="format"
                :disabled="percentage > 0"
                :options="formatOptions"
                class="input"
                size="large"
            />

            <n-button :disabled="percentage > 0" type="error" block size="large" @click="chooseFolder" class="input">
                {{ t('app.home.choose_folder') }}
            </n-button>

            <p class="folder-info">
                {{ t('app.home.folder_prefix') }}
                <span class="folder">{{ selectedFolder || t('app.home.no_folder') }}</span>
            </p>

            <n-progress
                v-if="percentage"
                type="line"
                class="input"
                status="success"
                :percentage="percentage"
                indicator-placement="inside"
            />

            <n-button
                type="error"
                block
                size="large"
                class="download-btn"
                :disabled="percentage !== 0"
                @click="download"
            >
                {{ t('app.home.download') }}
            </n-button>
        </div>
    </div>

    <div>
        <DownloadHistory ref="reloadHistoryData" />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
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
