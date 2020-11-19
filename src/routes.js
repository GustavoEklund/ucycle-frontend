/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { blue, green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import { isAuthenticated } from './services/authentication';

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
            <BrowserRouter>
                <Switch>
                    <AuthRoute isPublic exact path="/" component={Landing} />
                    <AuthRoute isPublic exact path="/landing" component={Landing} />
                    <AuthRoute isPublic exact path="/login" component={Login} />
                    <AuthRoute isPublic exact path="/registro" component={Register} />
                    <AuthRoute isPublic={false} component={() => <h1>Home</h1>} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}
