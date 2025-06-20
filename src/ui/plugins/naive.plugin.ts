import {
    create,
    NButton,
    NConfigProvider,
    NDialog,
    NEmpty,
    NIcon,
    NLayout,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NLayoutSider,
    NList,
    NListItem,
    NMenu,
    NModal,
    NSpace,
    NTag,
    NThing
} from 'naive-ui';

export const naive = create({
    components: [
        NButton,
        NLayout,
        NLayoutSider,
        NLayoutHeader,
        NLayoutContent,
        NMenu,
        NIcon,
        NConfigProvider,
        NLayoutFooter,
        NList,
        NListItem,
        NTag,
        NSpace,
        NThing,
        NEmpty,
        NModal,
        NDialog
    ]
});
