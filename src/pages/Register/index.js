import React, { useState } from 'react';
import {
    Button,
    Grid,
    Link,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Slide,
    Snackbar,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link as RouterDomLink, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import validation from '../../services/validation';
import useStyles from './styles';
import api from '../../services/api';

export default function Register() {
    const {
        register,
        errors,
        setError,
        handleSubmit,
    } = useForm();
    const classes = useStyles();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({ isShowing: false, message: '' });

    async function handleRegister(formData) {
        setIsLoading(true);

        try {
            if (formData.password !== formData.password_repeat) {
                setError('password_repeat', {
                    type: 'validation',
                    message: 'As senhas não coincidem.',
                });

                return;
            }

            const response = await api.post('/authentication/register', formData);

            const { error } = response.data;

            if (error) {
                throw new Error(error.message);
            }

            history.push('/login');
        } catch (error) {
            setSnackbar({ isShowing: true, message: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    function handleCloseAlert() {
        setSnackbar({ ...snackbar, isShowing: false });
    }

    return (
        <Grid container>
            <Grid item xs={1} />
            <Grid
                item
                xs={10}
                component="form"
                className={classes.container}
                onSubmit={handleSubmit(handleRegister)}
            >
                <TextField
                    fullWidth
                    type="text"
                    variant="outlined"
                    label="Nome completo"
                    id="full_name"
                    name="full_name"
                    inputRef={register(validation.full_name)}
                    error={Boolean(errors.full_name)}
                    className={classes.input}
                    helperText={errors.full_name && errors.full_name.message}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    name="email"
                    id="email"
                    inputRef={register(validation.email)}
                    error={Boolean(errors.email)}
                    className={classes.input}
                    helperText={errors.email && errors.email.message}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Senha"
                    name="password"
                    id="password"
                    inputRef={register(validation.password)}
                    error={Boolean(errors.password)}
                    className={classes.input}
                    helperText={errors.password && errors.password.message}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    type="password"
                    label="Confirmar senha"
                    name="password_repeat"
                    inputRef={register(validation.password_repeat)}
                    error={Boolean(errors.password_repeat)}
                    className={classes.input}
                    helperText={errors.password_repeat && errors.password_repeat.message}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            // checked={}
                            // onChange={}
                            value="checkedB"
                            color="primary"
                            name="news"
                        />
                    )}
                    label={(
                        <>
                            Aceito receber novidades do&nbsp;
                            <strong>uCycle</strong>
                            .
                        </>
                    )}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            // checked={}
                            // onChange={}
                            value="checkedA"
                            color="primary"
                            name="therms"
                        />
                    )}
                    label={(
                        <>
                            Estou de acordo com os&nbsp;
                            <Link
                                component={RouterDomLink}
                                to="/termos"
                            >
                                termos de serviço
                            </Link>
                            &nbsp;do&nbsp;
                            <strong>uCycle</strong>
                            .
                        </>
                    )}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    className={classes.button}
                >
                    Criar Conta
                </Button>
                <Link
                    className={classes.link}
                    component={RouterDomLink}
                    to="/login"
                >
                    Já tenho uma conta
                </Link>
            </Grid>
            <Grid item xs={1} />
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
                    &nbsp;&nbsp;Cadastrando...
                </Typography>
            </Backdrop>
        </Grid>
    );
}
