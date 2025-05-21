<script setup lang="ts">
import { format } from 'date-fns';
import { useTranslation } from 'i18next-vue';
import { useDialog } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { YtDownloadHistory } from '../../stores/schemas/ytDownloadHistory.schema';

const dialog = useDialog();
const { t } = useTranslation();
const histories = ref([] as YtDownloadHistory);

onMounted(async () => {
    const history = await window.electronAPI.getStoreValue<YtDownloadHistory>('ytDownloadHistory');

    if (history) {
        histories.value = history;
    }
});

const open = (url: string) => {
    window.electronAPI.openInBrowser(url);
};

const confirmDeleteAll = () => {
    dialog.warning({
        title: t('app.modal.warning'),
        content: t('app.downloadHistory.confirm_delete_all'),
        positiveText: t('app.downloadHistory.confirm_button_label'),
        negativeText: t('app.downloadHistory.cancel_button_label'),
        onPositiveClick: async () => {
            histories.value = [];
            await window.electronAPI.clearKeyStore('ytDownloadHistory');
        }
    });
};
</script>

<template>
    <n-list hoverable clickable>
        <template #header>
            <div style="display: flex; align-items: center; justify-content: space-between">
                <div style="font-weight: bold">{{ t('app.downloadHistory.title') }}</div>
                <n-button size="small" strong secondary type="error" @click="confirmDeleteAll()">
                    {{ t('app.downloadHistory.delete_all') }}
                </n-button>
            </div>
        </template>

        <template v-if="histories.length === 0">
            <n-list-item>
                <n-empty :description="t('app.downloadHistory.empty')" />
            </n-list-item>
        </template>

        <template v-else>
            <n-list-item
                v-for="history in histories"
                :key="history.id"
                style="cursor: pointer"
                @click="open(history.url)"
            >
                <div style="display: flex; align-items: center">
                    <img
                        :alt="history.title"
                        :src="history.thumbnail"
                        style="width: 200px; height: auto; margin-left: 16px; border-radius: 4px"
                    />
                    <div style="margin-left: 16px">
                        <div style="font-weight: bold">{{ history.title }}</div>
                        <n-tag type="info" size="small" style="margin-top: 4px">
                            {{ format(history.createdAt, 'dd/MM/yyyy') }}
                        </n-tag>
                    </div>
                </div>
            </n-list-item>
        </template>
    </n-list>
</template>
