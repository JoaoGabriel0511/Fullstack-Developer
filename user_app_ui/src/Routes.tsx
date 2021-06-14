import React from "react";
// @ts-ignore
import {  BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AdminDashboard from "./pages/AdminDashboard";

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
                <Route exact path="/Profile">
                    <Profile />
                </Route>
                <Route exact path="/Profile/Edit">
                    <EditProfile/>
                </Route>
                <Route exact path="/AdminDashboard">
                    <AdminDashboard/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}