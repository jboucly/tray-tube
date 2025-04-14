<script setup lang="ts">
import { NLayout, NLayoutSider } from 'naive-ui';
import { ref } from 'vue';
import LanguageSelector from './LanguageSelector.vue';
import Sidebar from './Sidebar.vue';

const isCollapsed = ref(true);
</script>

<template>
    <n-layout has-sider>
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
        <n-layout>
            <n-layout-header>
                <div class="header">
                    <LanguageSelector />
                </div>
            </n-layout-header>
            <n-layout-content>
                <slot />
            </n-layout-content>
            <n-layout-footer>
                <div style="text-align: center; padding: 16px">
                    <p>© 2025 Jboucly</p>
                </div>
            </n-layout-footer>
        </n-layout>
    </n-layout>
</template>

<style scoped>
.header {
    display: flex;
    padding: 4px;
    justify-content: flex-end;
}
</style>
