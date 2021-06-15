import Title from "./Title";
import {Fab, Tooltip} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import React from "react";
import {deleteUser} from "../services/user";
// @ts-ignore
import {useHistory} from "react-router-dom";


export default function ProfileButtons() {

    const history = useHistory();

    const logout = () => {
        localStorage.removeItem("USER_TOKEN")
        history.push('/')
    }

    const userDelete = () => {
        deleteUser(localStorage.getItem("USER_TOKEN")!)
        localStorage.removeItem("USER_TOKEN")
        history.push({
                pathname: '/',
                state: {
                    userDeleted: true
                }
            }
        )
    }

    return(
        <div>
            <Tooltip title="Edit profile">
                <Fab aria-label="add" href="/Profile/Edit">
                    <EditIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Delete account">
                <Fab color="secondary" aria-label="add" onClick={userDelete}>
                    <DeleteIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="Logout">
                <Fab color="primary" aria-label="add" onClick={logout}>
                    <ExitToAppIcon />
                </Fab>
            </Tooltip>
        </div>
    );
}