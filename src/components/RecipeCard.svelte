<script type="ts">
    export let id: string;
    export let image = '';
    export let title: string;
    export let description: string;
</script>

<a
    data-id={id}
    href={`/recipe/${id}`}
    class="rounded-md overflow-hidden shadow-md hover:-translate-y-1 transition-transform cursor-pointer"
>
    <img class="w-full h-auto" src={image} alt={title} />
    <div class="p-4 relative">
        <h1 class="text-xl mb-2">{title}</h1>
        <div class="text-gray-500 max-h-40">{description}</div>
        <div class="w-full h-8 bg-white absolute bottom-0-0 left-0 blur-sm" />
    </div>
</a>
