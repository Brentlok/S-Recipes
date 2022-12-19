<script type="ts">
    import { pocketbase } from '~/api';
    import Form, { Input } from './Form.svelte';

    const inputs: Input[] = [
        {
            title: 'Name',
            type: 'text',
        },
        {
            title: 'Password',
            type: 'password',
        },
    ];

    const login = async (target: EventTarget & HTMLFormElement) => {
        const data = inputs.map((x) => {
            const title = x.title.toLowerCase();
            const input = target.querySelector<HTMLInputElement>(`#${title}`);

            return {
                title,
                value: input?.value ?? '',
            };
        });

        const name = data.find((x) => x.title === 'name')?.value ?? '';
        const password = data.find((x) => x.title === 'password')?.value ?? '';
        const res = await pocketbase.login(name, password);

        if (!res) {
            // TODO handle error login
            return;
        }

        window.spa.navigate('/');
    };
</script>

<Form
    title="Login"
    onSubmit={login}
    {inputs}
    additionalButton={{
        title: 'Register',
        onClick: () => window.spa.navigate('/register'),
    }}
/>
