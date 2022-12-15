import { Writable, writable } from "svelte/store";
import type { BaseSystemFields, Collections } from "~/types";
import { pocketbase, Record } from "./pocketbase";

abstract class Query<T extends Collections> {
    isLoading = writable(false);

    isError = writable(false);

    abstract data: Writable<unknown>;

    constructor(readonly collection: T, private id?: string) {}

    fetch = () => {
        this.refetch(this.id);
        return this;
    }

    abstract refetch: (id?: string) => Promise<void>;
}

class List<T extends Collections> extends Query<T> {
    data = writable<Array<Record<T> & BaseSystemFields>>([]);

    get items() {
        return this.data;
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
            console.log(new Error(`Failed to fetch ${this.collection}`, {cause: err}));
        }
    }
}

class Single<T extends Collections> extends Query<T> {
    data = writable<Record<T> | undefined>();

    refetch = async (id?: string) => {
        if(!id) {
            return;
        }

        this.isLoading.set(true);
        this.isError.set(false);
        
        try {
            const res = await pocketbase.get(this.collection, id);
            this.data.set(res);
            this.isLoading.set(false);
        } catch (err) {
            this.isError.set(true);
            this.isLoading.set(false);
            console.log(new Error(`Failed to fetch ${this.collection} with id ${id}`, {cause: err}));
        }
    }
}

export const useList = <T extends Collections>(collection: T) => new List(collection);
export const useSingle = <T extends Collections>(collection: T, id: string) => new Single(collection, id);