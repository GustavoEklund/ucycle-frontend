import React from 'react';
import { Button, Grid, Link } from '@material-ui/core';
import { Link as RouterDomLink } from 'react-router-dom';
import useStyles from './styles';

export default function Landing() {
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
                <Button
                    component={RouterDomLink}
                    to="/registro"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    className={classes.button}
                >
                    Criar conta
                </Button>
                <Button
                    component={RouterDomLink}
                    to="/login"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    className={classes.button}
                >
                    Entrar
                </Button>
                <Link component={RouterDomLink} to="/" className={classes.link}>
                    Agora não, obrigado
                </Link>
            </Grid>
            <Grid item xs={2} />
        </Grid>
    );
}
