import { Writable, writable } from "svelte/store";
import type { BaseSystemFields, Collections } from "~/types";
import { pocketbase, Data } from "./pocketbase";

abstract class Query<T extends Collections> {
    isLoading = writable(false);

    isError = writable(false);

    abstract data: Writable<unknown>;

    constructor(readonly collection: T, private id?: string, private expand?: string) { }

    fetch = () => {
        this.refetch(this.id, this.expand);
        return this;
    }

    abstract refetch: (id?: string, expand?: string) => Promise<void>;
}

class List<T extends Collections> extends Query<T> {
    data = writable<Array<Data<T> & BaseSystemFields>>([]);

    get items() {
        return this.data;
    }

    fillWith = (data: Array<Data<T> & BaseSystemFields>) => {
        this.data.set(data);
        return this;
    }

    refetch = async () => {
        this.isLoading.set(true);
        this.isError.set(false);

        try {
            const res = await pocketbase.list(this.collection);
            this.data.set(res.items);
            this.isLoading.set(false);
        } catch (err) {
            this.isError.set(true);
            this.isLoading.set(false);
            console.log(new Error(`Failed to fetch ${this.collection}`, { cause: err }));
        }
    }
}

class Single<T extends Collections> extends Query<T> {
    data = writable<Data<T> | undefined>();

    refetch = async (id?: string, expand?: string) => {
        if (!id) {
            return;
        }

        this.isLoading.set(true);
        this.isError.set(false);

        try {
            const res = await pocketbase.get(this.collection, id, { expand });
            this.data.set(res);
            this.isLoading.set(false);
        } catch (err) {
            this.isError.set(true);
            this.isLoading.set(false);
            console.log(new Error(`Failed to fetch ${this.collection} with id ${id}`, { cause: err }));
        }
    }
}

export const useList = <T extends Collections>(collection: T) => new List(collection);
export const useSingle = <T extends Collections>(collection: T, id: string, expand?: string) => new Single(collection, id, expand);