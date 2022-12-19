<script type="ts">
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
</script>

<Form
    title="Register"
    {inputs}
    additionalButton={{
        title: 'Login',
        onClick: () => window.spa.navigate('/login'),
    }}
/>
