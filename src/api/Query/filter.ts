import type { Collections } from "~/types";
import type { Data } from "../pocketbase";
import type { List } from "./list";

type ExtractValues<T> = T[keyof T];
type DataValues<T> = ExtractValues<Data<T>>;
type DataKeys<T> = keyof Data<T>;

export class Filter<T extends Collections> {
    filters: Array<{ field: DataKeys<T>; eq: DataValues<T> }> = [];

    filter = '';

    constructor(readonly list: List<T>) { }

    updateFilters = () => {
        const filters = this.filters.map(({ field, eq }) => {
            const equals = typeof eq === 'string' ? `"${eq}"` : eq;
            return `${String(field)}=${equals}`;
        });

        this.filter = filters.join(' || ');
        this.list.refetch();
    }

    addField = (field: DataKeys<T>, eq: DataValues<T>) => {
        this.filters.push({ field, eq });
        this.updateFilters();
    }

    removeField = (field: DataKeys<T>, eq: DataValues<T>) => {
        this.filters = this.filters.filter(filter => filter.field !== field
            ? true
            : filter.eq !== eq
        );
        this.updateFilters();
    }
}