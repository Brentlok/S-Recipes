<script type="ts">
    import { pocketbase } from '~/api';
    import Error from '~/components/Error.svelte';
    import Input from '~/components/Input.svelte';
    import { validateNonEmpty } from '~/utils';

    let login = '';
    let password = '';
    let errorsDisplayed: string[] = [];

    const submit = async () => {
        const errors = validateNonEmpty({ login, password });

        if (errors.length) {
            errorsDisplayed = errors;
            return;
        }

        const res = await pocketbase.login(login, password);

        if (!res) {
            // TODO handle error login
            return;
        }

        window.spa.navigate('/');
    };
</script>

<form
    on:submit|preventDefault={submit}
    class="border-2 border-stone-400 p-4 rounded-3xl max-w-lg w-full flex flex-col"
>
    <h1 class="text-4xl text-stone-500 m-auto font-bold">Login</h1>
    <Input
        name="Login"
        bind:value={login}
        error={errorsDisplayed.includes('login')}
    />
    <Input
        name="Password"
        bind:value={password}
        error={errorsDisplayed.includes('password')}
    />
    <br />
    <button
        type="submit"
        class="text-2xl border-2 py-2 px-4 my-4 w-1/2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
    >
        Submit
    </button>
    <button
        type="button"
        on:click={() => window.spa.navigate('/register')}
        class="text-md border-2 px-2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
    >
        Register
    </button>
</form>
