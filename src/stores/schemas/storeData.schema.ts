import { FromSchema } from 'json-schema-to-ts';
import { LanguageJsonSchema } from './language.schema';
import { SelectedFolderSchema } from './selectedFolder.schema';
import { YtDownloadHistorySchema } from './ytDownloadHistory.schema';

export const StoreDataSchema = {
    type: 'object',
    properties: {
        language: LanguageJsonSchema,
        selectedFolder: SelectedFolderSchema,
        ytDownloadHistory: YtDownloadHistorySchema
    },
    required: ['language'],
    additionalProperties: false
} as const;

export type StoreData = FromSchema<typeof StoreDataSchema>;
