<script type="ts">
    import { pocketbase } from '~/api';
    import {
        Input,
        Textarea,
        Select,
        FileInput,
        ToggleBetween,
    } from '~/components/index.svelte';
    import { Collections } from '~/types';

    type Value = { title: string; id: string };
    export let categories: Value[];
    let title = '';
    let description = '';
    let category = '';
    let file: File | undefined;

    $: isDisabled = !title || !description || !file || !category;

    const toggleIsNewCategory = () => {
        category = '';
    };

    const submit = async () => {
        let categoryId = category;
        if (!categories.some((x) => x.id === category)) {
            const res = await pocketbase.create(Collections.Categories, {
                name: category,
            });
            categoryId = res.id;
        }

        const newRecipe = await pocketbase.create(
            Collections.Recipes,
            {
                title,
                description,
                category: categoryId,
                user: pocketbase.userId,
                image: file as unknown as string,
            },
            true
        );

        window.spa.navigate(`/recipe/${newRecipe.id}`);
    };
</script>

<form
    on:submit|preventDefault={submit}
    class="flex flex-col items-center gap-4"
>
    <h1 class="text-3xl font-bold">Add new recipe</h1>
    <div class="flex flex-col m-auto w-1/2">
        <Input name="Title" bind:value={title} />
        <Textarea name="Description" bind:value={description} />
        <ToggleBetween name="Add new" onToggle={toggleIsNewCategory}>
            <div slot="a" class="w-full flex flex-col">
                <Input name="Category" bind:value={category} />
            </div>
            <div slot="b" class="w-full flex flex-col">
                <Select
                    name="Category"
                    bind:value={category}
                    values={categories}
                />
            </div>
        </ToggleBetween>
        <FileInput bind:file />
    </div>
    <button
        type="submit"
        disabled={isDisabled}
        data-is-disabled={isDisabled}
        class="text-2xl py-2 px-12 my-4 rounded-full text-white bg-stone-400 hover:bg-stone-500 transition-colors"
    >
        Submit
    </button>
</form>
