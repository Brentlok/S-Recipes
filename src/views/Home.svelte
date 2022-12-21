<script type="ts">
    import { useList } from '~/api';
    import type { Data } from '~/api/pocketbase';
    import Recipes from '~/components/Recipes.svelte';
    import { watchLinks } from '~/hooks';
    import { BaseSystemFields, Collections } from '~/types';

    export let categories: string[];
    export let recipes: Array<Data<Collections.Recipes> & BaseSystemFields>;
    const { items } = useList(Collections.Recipes).fillWith(recipes);
    watchLinks();

    let search = '';
    let selected: string[] = [];

    const toggle = (category: string) => {
        if (selected.includes(category)) {
            selected = selected.filter((item) => item !== category);
            return;
        }

        selected = [...selected, category];
    };
</script>

<div class="flex flex-col items-center gap-10">
    <input
        class="text-xl shadow-md p-2 rounded-md w-min"
        type="text"
        bind:value={search}
        placeholder="Search for recipe..."
    />
    <div class="flex gap-3">
        {#each categories as category (category)}
            <div
                class="category"
                data-is-active={selected.includes(category)}
                on:click={() => toggle(category)}
                on:keydown={() => toggle(category)}
            >
                {category}
            </div>
        {/each}
    </div>
    <Recipes recipes={$items} />
</div>
