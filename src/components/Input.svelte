<script type="ts">
    import Error from './Error.svelte';

    export let name: string;
    export let value = '';
    export let error = false;
</script>

<h1 class="text-2xl mb-2">{name}</h1>
<input
    data-error={error}
    class="border-2 border-stone-400 rounded-full p-2"
    bind:value
    type="text"
/>
<Error {error} />
