<script context="module" type="ts">
    export type Input = {
        title: string;
        type: 'text' | 'password';
    };
</script>

<script type="ts">
    export let title: string;
    export let submitText = 'Submit';
    export let onSubmit: (target: EventTarget & HTMLFormElement) => void;
    export let inputs: Input[];
    export let additionalButton:
        | {
              title: string;
              onClick: () => void;
          }
        | undefined = undefined;
</script>

<form
    on:submit|preventDefault={(e) => onSubmit(e.currentTarget)}
    class="border-2 border-stone-400 p-4 rounded-3xl max-w-lg w-full flex flex-col gap-2"
>
    <h1 class="text-4xl text-stone-500 m-auto font-bold">{title}</h1>
    {#each inputs as input}
        <h1 class="text-2xl">{input.title}</h1>
        <input
            id={input.title.toLowerCase()}
            class="border-2 border-stone-400 rounded-full p-2"
            type={input.type}
        />
    {/each}
    <br />
    <button
        type="submit"
        class="text-2xl border-2 py-2 px-4 mt-4 w-1/2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
    >
        {submitText}
    </button>
    {#if additionalButton}
        <button
            on:click={additionalButton.onClick}
            class="text-md border-2 px-2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
        >
            {additionalButton.title}
        </button>
    {/if}
</form>
