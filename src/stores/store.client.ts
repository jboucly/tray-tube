import Ajv, { ValidateFunction } from 'ajv';
import { app, ipcMain } from 'electron';
import { Low } from 'lowdb/lib';
import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import { VueMessageToApp } from '../main/enums/vueMessageToApp.enum';
import { Logger } from '../main/utils/logger.utils';
import { JsonFileName } from './constants/jsonFileName.constant';
import { StoreData, StoreDataSchema } from './schemas/storeData.schema';

class StoreDb<T> {
    private db!: Low<T>;
    private validate: ValidateFunction<T>;
    private dbFilePath = path.join(app.getPath('userData'), JsonFileName.db);

    constructor(schema: object) {
        const ajv = new Ajv();
        this.validate = ajv.compile(schema) as ValidateFunction<T>;

        Logger.info(`Store file path: ${this.dbFilePath}`);
    }

    public async init(defaultValue: T): Promise<Omit<this, 'init'>> {
        this.db = await JSONFilePreset<T>(this.dbFilePath, defaultValue);

        ipcMain.handle(VueMessageToApp.GET_STORE, async (_event, key) => {
            return await Store.get(key);
        });

        return this as Omit<this, 'init'>;
    }

    public async get<K extends keyof T>(key: K): Promise<T[K] | undefined> {
        await this.db.read();

        return this.db.data?.[key];
    }

    public async set<K extends keyof T>(key: K, value: T[K]): Promise<void> {
        await this.db.read();
        const newData = { ...this.db.data, [key]: value } as T;

        if (!this.validate(newData)) {
            throw new Error('Invalid data for store');
        }

        this.db.data = newData;
        await this.db.write();
    }

    public async insert<Type, K extends keyof T = keyof T>(key: K, value: Type): Promise<void> {
        await this.db.read();
        const currentArray = Array.isArray(this.db.data?.[key]) ? (this.db.data?.[key] as unknown[]) : [];
        const newData = { ...this.db.data, [key]: [...currentArray, value] } as T;

        if (!this.validate(newData)) {
            throw new Error('Invalid data for store');
        }

        this.db.data = newData;
        await this.db.write();
    }
}

export const Store = new StoreDb<StoreData>(StoreDataSchema);
