import Client, { Record as BaseRecord } from 'pocketbase';
import Cookies from 'js-cookie'
import { writable } from 'svelte/store';
import {
    BaseSystemFields,
    CategoriesRecord,
    Collections,
    ImageSize,
    RecipesRecord,
    UsersRecord,
} from '~/types';

export type Data<T> =
    T extends Collections.Recipes ? RecipesRecord :
    T extends Collections.Categories ? CategoriesRecord :
    never;

const getThumbByImageSize = (imageSize: ImageSize) => {
    switch (imageSize) {
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

    isInitialized = writable(false);

    user = writable<UsersRecord | null>(null);

    constructor(url: string) {
        this.client = new Client(url);
        this.auth.onChange(() => {
            this.user.set(this.auth.model as UsersRecord | null);
        })
        this.loadCookieAuth();
    }

    get auth() {
        return this.client.authStore;
    }

    private loadCookieAuth = () => {
        if (typeof window === 'undefined') {
            return;
        }

        const cookie = Cookies.get('pb_auth');
        this.isInitialized.set(true);

        if (!cookie) {
            return;
        }

        this.auth.loadFromCookie(cookie);
    }

    list = <T extends Collections>(collection: T, filter?: string) =>
        this.client.collection(collection).getList<Data<T> & BaseSystemFields>(1, 50, { ...filter ? { filter } : {} });

    get = <T extends Collections>(collection: T, id: string, expand?: string) =>
        this.client.collection(collection).getOne<Data<T> & BaseSystemFields>(id, { expand });

    create = <T extends Collections>(collection: T, data: Data<T>) => {
        return this.client.collection(collection).create<Data<T>>(data);
    }

    getFile = <T extends Collections>(record: Data<T>, path?: string, imageSize = ImageSize.small) => {
        if (!path) {
            return '';
        }

        const thumb = getThumbByImageSize(imageSize);
        return this.client.getFileUrl(record as unknown as BaseRecord, path, { thumb });
    }

    login = async (name: string, password: string) => {
        try {
            const authData = await this.client.collection(Collections.Users).authWithPassword(name, password);
            this.auth.save(authData.token, authData.record);
            Cookies.set('pb_auth', this.auth.exportToCookie(), {
                expires: 14,
            });
            return true;
        } catch (err) {
            this.auth.clear();
            console.error(new Error('Failed to login', { cause: err }));
            return false;
        }
    }

    register = async (name: string, login: string, password: string) => {
        try {
            await this.client.collection(Collections.Users).create<UsersRecord>({
                username: login,
                name,
                password,
                passwordConfirm: password,
            });
            return this.login(login, password);
        } catch (err) {
            this.auth.clear();
            console.error(new Error('Failed to register', { cause: err }));
            return false;
        }
    }

    logout = async () => {
        this.auth.clear();
        Cookies.remove('pb_auth');
    }
}

const getApiURL = () => {
    if (
        process.env.PRODUCTION === 'true' &&
        typeof window === 'undefined'
    ) {
        return 'http://127.0.0.1:8091';
    }

    return 'https://api-srecipes.hbieszczad.pl';
}

export const pocketbase = new PocketBase(getApiURL());