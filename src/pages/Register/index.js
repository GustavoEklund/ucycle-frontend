import React from 'react';
import {
    Button,
    Grid,
    Link,
    OutlinedInput,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core';
import { Link as RouterDomLink } from 'react-router-dom';
import useStyles from './styles';

export default function Register() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10} className={classes.container}>
                <OutlinedInput
                    className={classes.input}
                    fullWidth
                    placeholder="Nome completo"
                />
                <OutlinedInput
                    className={classes.input}
                    fullWidth
                    placeholder="Email"
                />
                <OutlinedInput
                    className={classes.input}
                    fullWidth
                    type="password"
                    placeholder="Senha"
                />
                <OutlinedInput
                    className={classes.input}
                    fullWidth
                    type="password"
                    placeholder="Confirmar senha"
                />

                <FormControlLabel
                    control={(
                        <Checkbox
                            // checked={}
                            // onChange={}
                            value="checkedB"
                            color="primary"
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
                            value="checkedB"
                            color="primary"
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
        </Grid>
    );
}
