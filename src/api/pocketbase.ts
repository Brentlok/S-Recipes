import Client, { Record as BaseRecord } from 'pocketbase';
import type { 
    BaseSystemFields,
    Collections,
    RecipesRecord,
} from '~/types';

export type Record<T> =
    T extends Collections.Recipes ? RecipesRecord:
    never;

class PocketBase {
    private client: Client;

    constructor(url: string) {
        this.client = new Client(url);
    }

    list = <T extends Collections>(collection: T) => 
        this.client.collection(collection).getList<Record<T> & BaseSystemFields>();

    get = <T extends Collections>(collection: T, id: string) => 
        this.client.collection(collection).getOne<Record<T> & BaseSystemFields>(id);

    create = <T extends Collections>(collection: T, data: Record<T>) => {
        return this.client.collection(collection).create<Record<T> & BaseSystemFields>(data);
    }

    getFile = <T extends Collections>(record: Record<T>, path?: string) => {
        if(!path) {
            return '';
        }

        return this.client.getFileUrl(record as unknown as BaseRecord, path);
    }
}

export const pocketbase = new PocketBase('http://127.0.0.1:8090');