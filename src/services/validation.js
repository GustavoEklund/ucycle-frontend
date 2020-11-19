export default {
    password: {
        required: 'Informe a senha.',
        minLength: {
            value: 8,
            message: 'A senha deve ter pelo menos 8 caracteres.',
        },
    },
    password_repeat: {
        required: 'Informe a confirmação da senha.',
        minLength: {
            value: 8,
            message: 'A confirmação da senha deve ter pelo menos 8 caracteres.',
        },
    },
    full_name: {
        required: 'Informe o nome completo.',
        minLength: {
            value: 3,
            message: 'O nome completo deve ter pelo menos 3 caracteres.',
        },
        maxLength: {
            value: 64,
            message: 'O nome completo deve ter no máximo 64 caracteres.',
        },
    },
    email: {
        required: 'Informe o email.',
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'Email inválido!',
        },
    },
};
