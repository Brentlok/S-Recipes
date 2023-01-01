<script type="ts">
    import Recipes from '~/components/Recipes.svelte';
    import type { Data } from '~/api/pocketbase';
    import type { BaseSystemFields, Collections } from '~/types';

    export let recipes: Array<Data<Collections.Recipes> & BaseSystemFields>;
</script>

<div class="flex flex-col items-center gap-4">
    <h1 class="text-4xl font-bold">My Recipes</h1>
    <a
        class="text-2xl py-2 px-12 my-4 rounded-full text-white bg-stone-400 hover:bg-stone-500 transition-colors"
        href="/recipe/add"
    >
        Add new
    </a>
    <Recipes {recipes} />
</div>
