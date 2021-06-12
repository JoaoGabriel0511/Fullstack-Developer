import React from "react";
// @ts-ignore
import {  BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route exact path="/SignUp">
                    <SignUp />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}