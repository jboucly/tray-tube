import Ajv, { ValidateFunction } from 'ajv';
import { app, ipcMain } from 'electron';
import { Low } from 'lowdb/lib';
import { JSONFilePreset } from 'lowdb/node';
import path from 'path';
import { VueMessageToApp } from '../main/enums/vueMessageToApp.enum';
import { Logger } from '../main/utils/logger.utils';
import { JsonFileName } from './constants/jsonFileName.constant';
import { StoreData, StoreDataSchema } from './schemas/storeData.schema';

export type StoreTypeAvailable = 'string' | 'object' | 'array' | 'number';

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

        this.initElectronEvents();
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

    /**
     * @description Remove a value from the store, if the value is not provided, it will remove the key from the store.
     *
     * If is string or number, it will remove the key from the store.
     * If is object, it will remove the key if object from the store.
     * If is array, it will remove the value from the array.
     */
    public async remove<K extends keyof T>(key: K, value?: T[K]): Promise<void> {
        await this.db.read();

        if (this.db.data?.[key] === undefined) {
            throw new Error(`Key does not exist in the store`);
        }

        let newData: T[K] | undefined = undefined;

        const type = typeof this.db.data?.[key];
        const isObject = type === 'object' && !Array.isArray(this.db.data[key]);
        const isArray = type === 'object' && Array.isArray(this.db.data[key]);

        if (type === 'string' || type === 'number') {
            newData = { ...Object.keys(this.db.data).filter((k) => k !== key) } as T[K];
        } else if (isObject) {
            newData = {
                ...this.db.data,
                ...Object.keys(this.db.data[key] as Record<string, unknown>).filter((k) => k !== key)
            } as T[K];
        } else if (isArray) {
            if (value === undefined) {
                throw new Error(`Value is required to remove from array`);
            }

            newData = { ...this.db.data[key], [key]: (this.db.data[key] as T[K][]).filter((v) => v !== value) } as T[K];
        }

        if (!this.validate(newData)) {
            throw new Error('Invalid data for store');
        }

        this.db.data = newData;
        await this.db.write();
    }

    /**
     * @description Clear a key from the store. All data will be removed from the key.
     */
    public async clearKey<K extends keyof T>(key: K): Promise<void> {
        await this.db.read();

        if (this.db.data?.[key] === undefined) {
            throw new Error(`Key does not exist in the store`);
        }

        const type = typeof this.db.data?.[key];
        const isObject = type === 'object' && !Array.isArray(this.db.data[key]);
        const isArray = type === 'object' && Array.isArray(this.db.data[key]);

        const newValue = type === 'string' ? '' : isObject ? {} : isArray ? [] : 0;
        const newData = { ...this.db.data, [key]: newValue } as T;

        if (!this.validate(newData)) {
            throw new Error('Invalid data for store');
        }

        this.db.data = newData;
        await this.db.write();
    }

    private initElectronEvents(): void {
        ipcMain.handle(VueMessageToApp.GET_STORE, async (_event, key) => {
            return await this.get(key);
        });

        ipcMain.handle(VueMessageToApp.SET_STORE, async (_event, key, value) => {
            return await this.set(key, value);
        });

        ipcMain.handle(VueMessageToApp.REMOVE_STORE, async (_event, key, value) => {
            return await this.remove(key, value);
        });

        ipcMain.handle(VueMessageToApp.CLEAR_KEY_STORE, async (_event, key) => {
            return await this.clearKey(key);
        });
    }
}

export const Store = new StoreDb<StoreData>(StoreDataSchema);
