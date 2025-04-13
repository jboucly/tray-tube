<script setup lang="ts">
import { NMessageProvider } from 'naive-ui';
import Layout from './components/Layout.vue';
</script>

<template>
    <n-message-provider>
        <Layout>
            <router-view />
        </Layout>
    </n-message-provider>
</template>
