<script type="ts">
    import { pocketbase } from "~/api";

    const { user, isInitialized } = pocketbase;

    const logout = () => {
        const res = window.confirm('Do you want to logout?');

        if(!res) {
            return;
        }

        pocketbase.logout();
    }
</script>

<nav class="fixed t-0 l-0 w-full h-12 bg-stone-400 text-white px-4 flex items-center justify-between z-50">
    <a href="/" class="hover:text-stone-200 transition-colors">S-Recipes</a>
    {#if $isInitialized}
        {#if $user}
        <div 
            class="hover:text-stone-200 transition-colors cursor-pointer"
            on:click={logout}
            on:keydown={logout}
        >
            {$user.name}
        </div>
        {:else}
            <a href="/login" class="hover:text-stone-200 transition-colors">Login</a>
        {/if}
    {/if}
</nav>