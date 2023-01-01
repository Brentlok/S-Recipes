<script type="ts">
    export let name: string;
    export let value: string;
    let textarea: HTMLTextAreaElement | undefined;

    const update = () => {
        if (!textarea) {
            return;
        }

        textarea.style.height = 'inherit';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    $: {
        value;
        update();
    }
</script>

<h1 class="text-xl mb-2 text-stone-500">{name}</h1>
<textarea
    class="textarea"
    bind:value
    bind:this={textarea}
    placeholder={`${name}...`}
/>
