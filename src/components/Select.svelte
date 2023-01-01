<script type="ts">
    import Error from './Error.svelte';

    export let name: string;
    type Value = { title: string; id: string };
    export let value: string;
    export let values: Value[];
</script>

<h1 class="text-xl mb-2 text-stone-500">{name}</h1>
<select bind:value class="bg-white border-2 border-stone-400 rounded-md p-2">
    {#each values as val (val.id)}
        <option value={val.id}>{val.title}</option>
    {/each}
</select>
<Error error={false} />
