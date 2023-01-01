<script type="ts">
    export let onToggle = (val?: boolean) => {
        val;
    };
    export let name: string;
    let state = false;

    $: onToggle(state);
</script>

<div class="flex justify-between gap-4 items-center">
    {#if state}
        <slot name="a">a</slot>
    {:else}
        <slot name="b" />
    {/if}
    <div class="w-1/3 flex items-center gap-2">
        <label for="toggle" class="cursor-pointer">
            {name}
        </label>
        <input
            id="toggle"
            type="checkbox"
            bind:checked={state}
            class="w-10 h-10 cursor-pointer"
        />
    </div>
</div>
