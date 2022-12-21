import type { BaseSystemFields, Collections } from "~/types";
import { Query } from "./query";
import { Data, pocketbase } from "../pocketbase";
import { writable } from "svelte/store";
import type { Filter } from "./filter";

export class List<T extends Collections> extends Query<T> {
    data = writable<Array<Data<T> & BaseSystemFields>>([]);

    filter?: Filter<T>;

    get items() {
        return this.data;
    }

    setFilter = (filter: Filter<T>) => {
        this.filter = filter;
    }

    fillWith = (data: Array<Data<T> & BaseSystemFields>) => {
        this.data.set(data);
        return this;
    }

    refetch = async () => {
        this.isLoading.set(true);
        this.isError.set(false);

        try {
            const res = await pocketbase.list(this.collection, this.filter?.filter);
            this.data.set(res.items);
            this.isLoading.set(false);
        } catch (err) {
            this.isError.set(true);
            this.isLoading.set(false);
            console.log(new Error(`Failed to fetch ${this.collection}`, { cause: err }));
        }
    }
}