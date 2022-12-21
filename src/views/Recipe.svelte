<script type="ts">
    import { pocketbase } from '~/api';
    import {
        BaseSystemFields,
        ImageSize,
        RecipesRecord,
        UsersRecord,
    } from '~/types';
    import { printDate } from '~/utils';

    export let recipe: RecipesRecord & BaseSystemFields;
    export let author: UsersRecord;
    const authorAvatar = `https://avatars.dicebear.com/api/croodles/${author.name}.svg?r=50&scale=100`;
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
        <span class="tracking-wider">
            {recipe.description}
        </span>
    </div>
</div>
