import { Writable, writable } from "svelte/store";
import type { Collections } from "~/types";

export abstract class Query<T extends Collections> {
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