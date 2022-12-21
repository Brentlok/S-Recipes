<script type="ts">
    import { pocketbase } from '~/api';
    import Error from '~/components/Error.svelte';
    import Input from '~/components/Input.svelte';
    import { validateNonEmpty } from '~/utils';

    let name = '';
    let login = '';
    let password = '';
    let confirmPassword = '';
    let errorsDisplayed: string[] = [];

    const submit = async () => {
        const errors = validateNonEmpty({
            name,
            login,
            password,
            confirmPassword,
        });

        if (errors.length) {
            errorsDisplayed = errors;
            return;
        }

        const res = await pocketbase.register(name, login, password);

        if (!res) {
            // TODO handle error
            return;
        }

        window.spa.navigate('/');
    };
</script>

<form
    on:submit|preventDefault={submit}
    class="border-2 border-stone-400 p-4 rounded-3xl max-w-lg w-full flex flex-col gap-2"
>
    <h1 class="text-4xl text-stone-500 m-auto font-bold">Register</h1>
    <Input
        name="Name"
        bind:value={name}
        error={errorsDisplayed.includes('name')}
    />
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
    <Input
        name="Confirm Password"
        bind:value={confirmPassword}
        error={errorsDisplayed.includes('confirmPassword')}
    />
    <br />
    <button
        type="submit"
        class="text-2xl border-2 py-2 px-4 mt-4 w-1/2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
    >
        Submit
    </button>
    <button
        type="button"
        on:click={() => window.spa.navigate('/login')}
        class="text-md border-2 px-2 mx-auto rounded-full border-stone-400 hover:text-white hover:bg-stone-400 transition-colors"
    >
        Login
    </button>
</form>
