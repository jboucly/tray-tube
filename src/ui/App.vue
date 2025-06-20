<script setup lang="ts">
import { NDialogProvider, NMessageProvider } from 'naive-ui';
import Layout from './components/Layout.vue';
</script>

<template>
    <title>TrayTube</title>
    <n-message-provider>
        <Layout>
            <n-dialog-provider>
                <router-view />
            </n-dialog-provider>
        </Layout>
    </n-message-provider>
</template>
