import type { Collections } from "~/types";
import { Query } from "./query";
import { Data, pocketbase } from "../pocketbase";
import { writable } from "svelte/store";

export class Single<T extends Collections> extends Query<T> {
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