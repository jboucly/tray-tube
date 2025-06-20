<script setup lang="ts">
import { useTranslation } from 'i18next-vue';
import { NSelect } from 'naive-ui';
import { onBeforeMount, ref, watch } from 'vue';

const { i18next } = useTranslation();
const selectedLocale = ref(i18next.language);

const options = [
    { label: '🇫🇷 Français', value: 'fr' },
    { label: '🇺🇸 English', value: 'en' }
];

watch(selectedLocale, async (newLocale) => {
    await i18next.changeLanguage(newLocale);
    window.electronAPI.sendToMain('change-language', newLocale);
    localStorage.setItem('locale', newLocale);
});

onBeforeMount(async () => {
    const lang = await window.electronAPI.getStoreValue<string>('language');

    if (lang) {
        selectedLocale.value = lang;
        await i18next.changeLanguage(lang);
    }
});
</script>

<template>
    <n-select v-model:value="selectedLocale" :options="options" style="width: 160px" />
</template>
