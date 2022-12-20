<script type="ts">
    import { pocketbase, useList } from '~/api';
    import type { Data } from '~/api/pocketbase';
    import { watchLinks } from '~/hooks';
    import { BaseSystemFields, Collections } from '~/types';
    import Loading from './Loading.svelte';
    import RecipeCard from './RecipeCard.svelte';

    export let recipes: Array<Data<Collections.Recipes> & BaseSystemFields>;

    const { isLoading, items } = useList(Collections.Recipes).fillWith(recipes);
    watchLinks();
</script>

{#if $isLoading}
    <Loading />
{:else}
    <div
        class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 m-auto"
    >
        {#each $items as recipe (recipe.id)}
            <RecipeCard
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={pocketbase.getFile(recipe, recipe.image)}
            />
        {/each}
    </div>
{/if}
