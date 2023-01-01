<script type="ts">
    import { Filter, useList } from '~/api';
    import type { Data } from '~/api/pocketbase';
    import Loading from '~/components/Loading.svelte';
    import Recipes from '~/components/Recipes.svelte';
    import { watchLinks } from '~/hooks';
    import { BaseSystemFields, Collections } from '~/types';

    watchLinks();

    type Category = { title: string; id: string };

    export let categories: Array<Category>;
    export let recipes: Array<Data<Collections.Recipes> & BaseSystemFields>;
    const list = useList(Collections.Recipes).fillWith(recipes);
    const { items, isLoading } = list;

    const filter = new Filter(list);
    list.setFilter(filter);

    let search = '';
    let selected: string[] = [];
    let timer: ReturnType<typeof setTimeout>;

    $: if (typeof window !== 'undefined' && filter.initialized) {
        window.clearTimeout(timer);
        timer = setTimeout(() => {
            filter.updateLike('title', search, '');
        }, 300);
    }

    const toggle = (categoryId: string) => {
        if (selected.includes(categoryId)) {
            filter.removeEquals('category', categoryId);
            selected = selected.filter((item) => item !== categoryId);
            return;
        }
        filter.addEquals('category', categoryId);
        selected = [...selected, categoryId];
    };
</script>

<div class="flex flex-col items-center gap-10">
    <input
        class="text-xl shadow-md p-2 rounded-md w-full max-w-sm"
        type="text"
        bind:value={search}
        placeholder="Search for recipe..."
    />
    <div class="flex gap-3">
        {#each categories as category (category.id)}
            <div
                class="category"
                data-is-active={selected.includes(category.id)}
                on:click={() => toggle(category.id)}
                on:keydown={() => toggle(category.id)}
            >
                {category.title}
            </div>
        {/each}
    </div>
    <Recipes recipes={$items} />
</div>

{#if $isLoading}
    <Loading />
{/if}
