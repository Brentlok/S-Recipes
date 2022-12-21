<script type="ts">
    import { pocketbase } from '~/api';
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

<div class="w-1/2 min-h-screen flex">
    <form
        on:submit|preventDefault={submit}
        class="flex flex-col items-start m-auto"
    >
        <h1 class="text-4xl text-stone-500 font-bold mb-14">Sign in</h1>
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
        <div class="flex flex-col w-full">
            <button
                type="submit"
                class="text-2xl py-2 px-12 my-4 rounded-full text-white bg-stone-400 hover:bg-stone-500 transition-colors"
            >
                Submit
            </button>
            <button
                type="button"
                on:click={() => window.spa.navigate('/register')}
                class="text-md hover:underline transition-colors mx-auto"
            >
                Sign up
            </button>
        </div>
    </form>
</div>
