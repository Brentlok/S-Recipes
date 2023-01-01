<script type="ts">
    export let file: File | undefined;
    let files: FileList;

    $: {
        files;
        if (files && files[0]) {
            file = files[0];
        }
    }
</script>

{#if file}
    <div class="mx-auto my-4 max-w-full overflow-hidden rounded-md">
        <img src={URL.createObjectURL(file)} alt={file.name} />
    </div>
{:else}
    <div class="my-4 mx-auto">
        <label
            for="upload"
            class="block text-white text-center bg-stone-400 w-40 p-4 rounded-xl cursor-pointer"
        >
            Upload image
        </label>
        <input
            class="hidden"
            id="upload"
            accept="image/*"
            type="file"
            bind:files
        />
    </div>
{/if}
