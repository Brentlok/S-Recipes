<script type="ts">
    import Error from './Error.svelte';

    export let name: string;
    export let value: string;
    export let error = false;
    export let type: 'text' | 'password' = 'text';
</script>

<h1 class="text-xl mb-2 text-stone-500">{name}</h1>
{#if type === 'text'}
    <input
        placeholder={`${name}...`}
        data-error={error}
        class="border-2 border-stone-400 rounded-md p-2"
        bind:value
        type="text"
    />
{:else}
    <input
        placeholder={`${name}...`}
        data-error={error}
        class="border-2 border-stone-400 rounded-md p-2"
        bind:value
        type="password"
    />
{/if}
<Error {error} />
