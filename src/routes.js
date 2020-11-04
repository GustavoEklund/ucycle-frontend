import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={() => <h1>Home</h1>} />
            </Switch>
        </BrowserRouter>
    );
}
