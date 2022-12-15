<script type="ts">
    import { pocketbase, useSingle } from "~/api";
    import Loading from "~/components/Loading.svelte";
    import { Collections, ImageSize } from "~/types";

    export let id: string;

    const { isLoading, data } = useSingle(Collections.Recipes, id).fetch();
</script>

{#if $isLoading || !$data}
    <Loading />
{:else}
    <div>
        <div class="max-w-7xl mx-auto">
            <h1 class="text-3xl">
                {$data.title}
            </h1>
            <img class="my-4" src={pocketbase.getFile($data, $data.image, ImageSize.big)} alt={$data.title} />
            <span class="tracking-wider">
                {$data.description}
            </span>    
        </div>
    </div>
{/if}