import React from "react";
// @ts-ignore
import {  BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AdminDashboard from "./pages/AdminDashboard";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Page401 from "./pages/ErrorPages/Page401";

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
                <Route exact path="/AdminDashboard/EditUser/:userId">
                    <EditUser/>
                </Route>
                <Route exact path="/AdminDashboard/CreateUser">
                    <CreateUser/>
                </Route>
                <Route exact path="/401">
                    <Page401/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}