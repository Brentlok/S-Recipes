<script type="ts">
    import Error from './Error.svelte';

    export let name: string;
    export let value = '';
    export let error = false;
</script>

<h1 class="text-xl mb-2 text-stone-500">{name}</h1>
<input
    data-error={error}
    class="border-2 border-stone-400 rounded-md p-2"
    bind:value
    type="text"
/>
<Error {error} />
