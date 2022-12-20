<script type="ts">
    import { pocketbase } from "~/api";


    let login = '';
    let password = '';

    const submit = async () => {
        const res = await pocketbase.login(login, password);

        if (!res) {
            // TODO handle error login
            return;
        }

        window.spa.navigate('/');
    }
</script>

<form
    on:submit|preventDefault={submit}
    class="border-2 border-stone-400 p-4 rounded-3xl max-w-lg w-full flex flex-col gap-2"
>
    <h1 class="text-4xl text-stone-500 m-auto font-bold">Login</h1>
    <h1 class="text-2xl">Login</h1>
    <input
        class="border-2 border-stone-400 rounded-full p-2"
        bind:value={login}
        type='text'
    />
    <h1 class="text-2xl">Password</h1>
    <input
        class="border-2 border-stone-400 rounded-full p-2"
        bind:value={password}
        type='password'
    />
    <br />
    <button
        type="submit"
        class="text-2xl border-2 py-2 px-4 mt-4 w-1/2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
    >
        Submit
    </button>
    <button
        on:click={() => window.spa.navigate('/register')}
        class="text-md border-2 px-2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
    >
        Register
    </button>
</form>
