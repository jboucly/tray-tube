<script setup lang="ts">
import { NSelect } from 'naive-ui';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const selectedLocale = ref(locale.value);

const options = [
    { label: '🇫🇷 Français', value: 'fr' },
    { label: '🇺🇸 English', value: 'en' }
];

watch(selectedLocale, (newLocale) => {
    locale.value = newLocale;
    localStorage.setItem('locale', newLocale);
});
</script>

<template>
    <n-select v-model:value="selectedLocale" :options="options" style="width: 160px" />
</template>
