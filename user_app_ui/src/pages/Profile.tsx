import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../components/CopyRight";
import {deleteUser, getUserData} from "../services/user";
import {UserData} from "../interfaces/UserData";
import {Fab, Tooltip} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';
// @ts-ignore
import {useLocation, useHistory} from "react-router-dom";
import loadUserData from "../utils/loadUserData";
import Notification from "../components/Notification";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Profile() {
    const classes = useStyles();
    const [user, setUser] = React.useState<UserData | null>(null)
    const [open, setOpen] = React.useState<boolean>(false)
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        loadUserData().then(r => setUser(r));
        if(location?.state?.userRegistration) {
            setOpen(true)
        }
    }, []);


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

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome  {user?.fullName}
                </Typography>
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
                <Typography variant="body1">Sticky footer placeholder.</Typography>
            </Container>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">My sticky footer can be found here.</Typography>
                    <Copyright />
                </Container>
            </footer>
            <Notification msg={"Profile edited"} severity={"success"} open={open} setOpen={setOpen}/>
        </div>
    );
}