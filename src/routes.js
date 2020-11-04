import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { blue, green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Landing from './pages/Landing';
import Login from './pages/Login';

export default function Routes() {
    const theme = React.useMemo(
        () =>
            createMuiTheme({
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
                    <Route exact path="/" component={() => <h1>Home</h1>} />
                    <Route exact path="/landing" component={Landing} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}
