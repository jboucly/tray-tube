import { NativeImage, Notification } from 'electron';

export const sendNotification = (opts: {
    body: string;
    title: string;
    icon?: string | NativeImage;
    silent?: boolean;
    onClick?: () => void;
}) => {
    const notification = new Notification({
        silent: opts.silent ?? false,
        icon: opts.icon ?? undefined,
        body: opts.body,
        title: opts.title
    });

    if (opts.onClick) {
        notification.on('click', opts.onClick);
    }

    notification.show();
};
