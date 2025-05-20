import { FromSchema } from 'json-schema-to-ts';

export const YtDownloadHistoryPropertySchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        url: { type: 'string' },
        title: { type: 'string' },
        thumbnail: { type: 'string' },
        createdAt: { type: 'string' }
    },
    required: ['id', 'url', 'title', 'createdAt']
} as const;

export const YtDownloadHistorySchema = {
    type: 'array',
    items: YtDownloadHistoryPropertySchema
} as const;

export type YtDownloadHistoryProperty = FromSchema<typeof YtDownloadHistoryPropertySchema>;
export type YtDownloadHistory = FromSchema<typeof YtDownloadHistorySchema>;
