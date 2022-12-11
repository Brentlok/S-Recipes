<script type="ts">
    export let image = '';
    export let title: string;
    export let description: string;
</script>

<div class="rounded-md overflow-hidden shadow-md hover:-translate-y-1 transition-transform cursor-pointer">
    <img class="w-full h-auto" src={image} alt={title}>
    <div class="p-4">
        <h1 class="text-xl mb-2">{title}</h1>
        <span class="text-gray-500">{description}</span>
    </div>
</div>