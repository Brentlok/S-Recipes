<script type="ts">
    import { pocketbase } from "~/api";
    import { BaseSystemFields, ImageSize, RecipesRecord } from "~/types";

    export let recipe: RecipesRecord & BaseSystemFields;
</script>

<div>
    <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl">
            {recipe.title}
        </h1>
        <img class="my-4" src={pocketbase.getFile(recipe, recipe.image, ImageSize.big)} alt={recipe.title} />
        <span class="tracking-wider">
            {recipe.description}
        </span>    
    </div>
</div>
