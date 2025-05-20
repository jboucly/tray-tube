import { FromSchema } from 'json-schema-to-ts';
import { LanguageJsonSchema } from './language.schema';

export const StoreDataSchema = {
    type: 'object',
    properties: {
        language: LanguageJsonSchema
    },
    required: ['language'],
    additionalProperties: false
} as const;

export type StoreData = FromSchema<typeof StoreDataSchema>;
