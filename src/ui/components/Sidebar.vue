<script setup lang="ts">
import { HomeOutline, SettingsOutline } from '@vicons/ionicons5';
import { NIcon, NMenu } from 'naive-ui';
import { MenuMixedOption } from 'naive-ui/es/menu/src/interface';
import { Component, h, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const selectedKey = ref(route.path);

const menuOptions: MenuMixedOption[] = [
    {
        key: '/',
        label: 'Home',
        icon: renderIcon(HomeOutline)
    },
    {
        key: '/settings',
        label: 'Settings',
        icon: renderIcon(SettingsOutline)
    }
];

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

const handleSelect = (key: string) => {
    selectedKey.value = key;
    router.push(key);
};

watch(
    () => route.path,
    (newPath) => {
        selectedKey.value = newPath;
    }
);
</script>

<template>
    <n-menu
        :value="selectedKey"
        :options="menuOptions"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        @update:value="handleSelect"
    />
</template>
