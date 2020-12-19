/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect, Link,
} from 'react-router-dom';
import { blue, green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    AppBar,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Landing from './pages/Landing';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { isAuthenticated } from './services/authentication';
import Profile from './pages/Profile';
import useStyles from './styles';

function AuthRoute({
    component: Component,
    isPublic,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={
                (props) => (
                    // Logado e a rota é privada: continuar
                    (isAuthenticated() && !isPublic && <Component {...rest} {...props} />)
                    // Logado e a rota é apenas pública: redirecionar para o início
                    || (isAuthenticated() && isPublic && <Redirect to="/home" />)
                    // Não logado e a rota é apenas pública: continuar
                    || (!isAuthenticated() && isPublic && <Component {...rest} {...props} />)
                    // Não logado e a rota é privada: redirecionar para o login
                    || (!isAuthenticated() && !isPublic && <Redirect to="/login" />)
                )
            }
        />
    );
}

AuthRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isPublic: PropTypes.bool,
};

AuthRoute.defaultProps = {
    isPublic: true,
};

export default function Routes() {
    // Forçar o protocolo https
    // if (window.location.protocol !== 'https:') {
    //     window.location.replace(window.location.href.replace(/^http(s?)/, 'https'));
    // }

    const classes = useStyles();

    const theme = React.useMemo(
        () => createMuiTheme({
            palette: {
                type: 'light',
                primary: blue,
                secondary: green,
            },
        }),
        [],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid container>
                <BrowserRouter>
                    <Switch>
                        <AuthRoute isPublic exact path="/" component={Landing} />
                        <AuthRoute isPublic exact path="/landing" component={Landing} />
                        <AuthRoute isPublic exact path="/login" component={Login} />
                        <AuthRoute isPublic exact path="/registro" component={Register} />
                        <AuthRoute isPublic={false} exact path="/perfil" component={Profile} />
                        <AuthRoute isPublic={false} component={Home} />
                    </Switch>
                    {isAuthenticated() ? (
                        <AppBar position="fixed" color="default" className={classes.appBar}>
                            <Toolbar className={classes.appBarContainer}>
                                <IconButton edge="start" component={Link} to="/home">
                                    <HomeIcon style={{ display: 'block' }} />
                                    <Typography style={{ display: 'block' }}>Home</Typography>
                                </IconButton>
                                <IconButton component={Link} to="/home">
                                    <SearchIcon />
                                    <Typography>Buscar</Typography>
                                </IconButton>
                                <IconButton component={Link} to="/home">
                                    <LocalOfferIcon />
                                    <Typography>Vender</Typography>
                                </IconButton>
                                <IconButton component={Link} to="/home">
                                    <MailOutlineIcon />
                                    <Typography>Mensag.</Typography>
                                </IconButton>
                                <IconButton edge="end" component={Link} to="/perfil">
                                    <AccountCircleIcon />
                                    <Typography>Perfil</Typography>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    ) : null}
                </BrowserRouter>
            </Grid>
        </ThemeProvider>
    );
}
