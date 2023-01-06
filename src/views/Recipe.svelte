<script type="ts">
    import { pocketbase } from '~/api';
    import {
        BaseSystemFields,
        Collections,
        ImageSize,
        RecipesRecord,
        UsersRecord,
    } from '~/types';
    import { printDate } from '~/utils';

    export let recipe: RecipesRecord & BaseSystemFields;
    export let author: UsersRecord;
    const authorAvatar = `https://avatars.dicebear.com/api/croodles/${author.name}.svg?r=50&scale=100`;

    const removeRecipe = async () => {
        if (!window.confirm('Are you sure?')) {
            return;
        }

        await pocketbase.remove(Collections.Recipes, recipe.id);
        window.spa.navigate('/');
    };
</script>

<div>
    <div class="max-w-7xl mx-auto">
        <div class="flex w-full justify-between items-end">
            <div>
                <h1 class="text-3xl">
                    {recipe.title}
                </h1>
                <span>created {printDate(recipe.created)}</span>
            </div>
            <div class="flex flex-col items-end gap-2">
                <img class="w-16 h-16" src={authorAvatar} alt={author.name} />
                <p>
                    Created by
                    <span class="text-stone-400">{author.name}</span>
                </p>
            </div>
        </div>
        <img
            class="my-4"
            src={pocketbase.getFile(recipe, recipe.image, ImageSize.big)}
            alt={recipe.title}
        />
        <span class="tracking-wider w-full">
            {recipe.description}
        </span>
        <br />
        {#if pocketbase.auth.model?.id === recipe.user}
            <button
                on:click={removeRecipe}
                class="text-2xl py-2 px-12 my-4 rounded-full text-white bg-stone-400 hover:bg-stone-500 transition-colors"
            >
                Delete
            </button>
        {/if}
    </div>
</div>
