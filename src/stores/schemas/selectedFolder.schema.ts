import { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const SelectedFolderSchema: JSONSchema = {
    type: 'string',
    nullable: true
} as const;

export type SelectedFolder = FromSchema<typeof SelectedFolderSchema>;
