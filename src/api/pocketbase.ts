import Client, { Record as BaseRecord } from 'pocketbase';
import { 
    BaseSystemFields,
    Collections,
    ImageSize,
    RecipesRecord,
} from '~/types';

export type Record<T> =
    T extends Collections.Recipes ? RecipesRecord:
    never;

const getThumbByImageSize = (imageSize: ImageSize) => {
    switch(imageSize) {
        case ImageSize.small:
            return '640x0';
        case ImageSize.medium:
            return '1280x0';
        case ImageSize.big:
        default:
            return '1600x0';
    }
}

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
        return this.client.collection(collection).create<Record<T>>(data);
    }

    getFile = <T extends Collections>(record: Record<T>, path?: string, imageSize = ImageSize.small) => {
        if(!path) {
            return '';
        }

        const thumb = getThumbByImageSize(imageSize);
        return this.client.getFileUrl(record as unknown as BaseRecord, path, { thumb });
    }
}

export const pocketbase = new PocketBase('http://127.0.0.1:8090');