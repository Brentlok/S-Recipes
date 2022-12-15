import { afterUpdate } from "svelte";

export const watchLinks = () => afterUpdate(() => window.spa.scan());