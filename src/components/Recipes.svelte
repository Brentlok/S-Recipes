<script type="ts">
    import { pocketbase } from '~/api';
    import type { Data } from '~/api/pocketbase';
    import type { BaseSystemFields, Collections } from '~/types';
    import RecipeCard from './RecipeCard.svelte';

    export let recipes: Array<Data<Collections.Recipes> & BaseSystemFields>;
</script>

<div
    class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 m-auto"
>
    {#each recipes as recipe (recipe.id)}
        <RecipeCard
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            image={pocketbase.getFile(recipe, recipe.image)}
        />
    {/each}
</div>
