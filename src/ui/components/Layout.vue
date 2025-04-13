<script setup lang="ts">
import { NLayout, NLayoutSider } from 'naive-ui';
import { ref } from 'vue';
import Sidebar from './Sidebar.vue';

const isCollapsed = ref(true);
</script>

<template>
    <n-layout has-sider sider-placement="left">
        <n-layout-sider
            bordered
            show-trigger
            :collapsed="isCollapsed"
            collapse-mode="width"
            :collapsed-width="64"
            :native-scrollbar="false"
            @update:collapsed="isCollapsed = $event"
        >
            <Sidebar />
        </n-layout-sider>
        <n-layout-content>
            <slot />
        </n-layout-content>
    </n-layout>
</template>
