import type { Collections } from "~/types";
import { List } from "./list";
import { Single } from "./single";

export const useList = <T extends Collections>(collection: T) => new List(collection);
export const useSingle = <T extends Collections>(collection: T, id: string, expand?: string) => new Single(collection, id, expand);