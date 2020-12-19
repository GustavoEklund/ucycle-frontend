import React, { useState } from 'react';
import {
    Button,
    Grid,
    Link,
    Typography,
    Slide,
    Snackbar,
    Backdrop,
    TextField,
    CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link as RouterDomLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useStyles from './styles';
import api from '../../services/api';
import validation from '../../services/validation';
import { login } from '../../services/authentication';

export default function Login() {
    const classes = useStyles();
    const { handleSubmit, register, errors } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ isShowing: false, message: '' });

    function handleCloseAlert() {
        setSnackbar({ ...snackbar, isShowing: false });
    }

    async function handleLogin(formData) {
        setIsLoading(true);

        try {
            const response = await api.post('/authentication/login', formData);

            const { data, error } = response.data;

            if (error) {
                throw new Error(error.message);
            }

            login(data);
        } catch (error) {
            setSnackbar({ isShowing: true, message: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid
                item
                xs={8}
                className={classes.container}
                component="form"
                onSubmit={handleSubmit(handleLogin)}
            >
                <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/logo-ucycle.png`}
                    alt="uCycle logo"
                    className={classes.logo}
                />
                <TextField
                    className={classes.input}
                    fullWidth
                    variant="outlined"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="username"
                    inputRef={register(validation.email)}
                    error={Boolean(errors.email)}
                    helperText={errors.email && errors.email.message}
                />
                <TextField
                    className={classes.input}
                    fullWidth
                    variant="outlined"
                    type="password"
                    name="password"
                    placeholder="Senha"
                    autoComplete="current-password"
                    inputRef={register(validation.password)}
                    error={Boolean(errors.password)}
                    helperText={errors.password && errors.password.message}
                />
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    fullWidth
                    size="large"
                    className={classes.button}
                >
                    Entrar
                </Button>
                <Link component={RouterDomLink} to="/recuperar-senha" className={classes.link}>
                    Esqueci minha senha
                </Link>
            </Grid>
            <Grid item xs={2} />
            <Snackbar
                open={snackbar.isShowing}
                TransitionComponent={Slide}
                onClose={handleCloseAlert}
            >
                <Alert severity="error" onClose={handleCloseAlert}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Backdrop
                open={isLoading}
                style={{ zIndex: 1000, flexDirection: 'column', color: '#ffffff' }}
            >
                <CircularProgress />
                <Typography variant="h5">
                    &nbsp;&nbsp;Autenticando...
                </Typography>
            </Backdrop>
        </Grid>
    );
}
