import React from 'react';
import { Button, Grid, Link, OutlinedInput } from '@material-ui/core';
import { Link as RouterDomLink } from 'react-router-dom';
import useStyles from './styles';

export default function Login() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8} className={classes.container}>
                <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/logo-ucycle.png`}
                    alt="uCycle logo"
                    className={classes.logo}
                />
                <OutlinedInput
                    className={classes.input}
                    fullWidth
                    placeholder="Email"
                />
                <OutlinedInput
                    className={classes.input}
                    fullWidth
                    placeholder="Senha"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    className={classes.button}
                >
                    Entrar
                </Button>
                <Link component={RouterDomLink} to="/" className={classes.link}>
                    Esqueceu a senha?
                </Link>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
}
