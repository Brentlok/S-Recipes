import type { Collections } from "~/types";
import type { Data } from "../pocketbase";
import type { List } from "./list";

type ExtractValues<T> = T[keyof T];
type DataValues<T> = ExtractValues<Data<T>>;
type DataKeys<T> = keyof Data<T>;

export class Filter<T extends Collections> {
    equals: Array<{ field: DataKeys<T>; val: DataValues<T> }> = [];

    like: Array<{ field: DataKeys<T>; val: DataValues<T> }> = [];

    filter = '';

    initialized = false;

    constructor(readonly list: List<T>) { }

    updateFilters = () => {
        this.initialized = true;
        const filters: string[] = [];
        const equals = this.equals.map(({ field, val }) => {
            const value = typeof val === 'string' ? `"${val}"` : val;
            return `${String(field)}=${value}`;
        });

        if (this.equals.length > 0) {
            filters.push(`(${equals.join(' || ')})`);
        }

        const like = this.like.map(({ field, val }) => {
            const value = typeof val === 'string' ? `"${val}"` : val;
            return `${String(field)}~${value}`;
        });

        if (this.like.length > 0) {
            filters.push(`(${like.join(' || ')})`);
        }

        this.filter = filters.join(' && ');
        this.list.refetch();
    }

    updateLike = <Empty extends DataValues<T>>(field: DataKeys<T>, val: DataValues<T>, empty: Empty) => {
        this.like = this.like.filter(filter => filter.field !== field);

        if (val === empty) {
            this.updateFilters();
            return;
        }

        this.like.push({ field, val });
        this.updateFilters();
    }

    addEquals = (field: DataKeys<T>, val: DataValues<T>) => {
        this.equals.push({ field, val });
        this.updateFilters();
    }

    removeEquals = (field: DataKeys<T>, val: DataValues<T>) => {
        this.equals = this.equals.filter(filter => filter.field !== field
            ? true
            : filter.val !== val
        );
        this.updateFilters();
    }
}