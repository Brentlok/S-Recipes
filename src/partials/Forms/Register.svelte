<script type="ts">
    import { pocketbase } from '~/api';
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

<div class="w-1/2 min-h-screen flex">
    <form
        on:submit|preventDefault={submit}
        class="flex flex-col items-start m-auto"
    >
        <h1 class="text-4xl text-stone-500 font-bold mb-14">Sign up</h1>
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
            type="password"
            name="Password"
            bind:value={password}
            error={errorsDisplayed.includes('password')}
        />
        <Input
            type="password"
            name="Confirm Password"
            bind:value={confirmPassword}
            error={errorsDisplayed.includes('confirmPassword')}
        />
        <br />
        <div class="flex flex-col w-full">
            <button
                type="submit"
                class="text-2xl py-2 px-12 my-4 rounded-full text-white bg-stone-400 hover:bg-stone-500 transition-colors"
            >
                Submit
            </button>
            <button
                type="button"
                on:click={() => window.spa.navigate('/login')}
                class="text-md hover:underline transition-colors mx-auto"
            >
                Sign in
            </button>
        </div>
    </form>
</div>
