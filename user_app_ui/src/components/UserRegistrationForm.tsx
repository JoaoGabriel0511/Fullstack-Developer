import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../components/CopyRight";
import {userRegistration} from "../services/registration";
import {UserRegistrationData} from "../interfaces/UserRegistrationData";
// @ts-ignore
import { useHistory } from "react-router-dom";
import Notification from "../components/Notification";
import errorHandler from "../utils/errorHandler";
import {Link} from "@material-ui/core";
import {promises} from "dns";
import loadUserData from "../utils/loadUserData";
import {UserData} from "../interfaces/UserData";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export type Props = {
    title: String;
    returnPath: String;
    registrationService: (userRegistrationData: UserRegistrationData, token: String | null) => Promise<any>;
    recoverUserService?: (token: String) => Promise<any>;
};

export default function UserRegistrationForm({title, returnPath, registrationService}:Props) {
    const classes = useStyles();
    const [fullName, setFullName] = React.useState<String>("");
    const [email, setEmail] = React.useState<String>("");
    const [password, setPassword] = React.useState<String>("");
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<String>("");
    const [open, setOpen] = React.useState<boolean>(false);
    const [msg, setMsg] = React.useState<Array<JSX.Element> | String>("");
    const history = useHistory();

    useEffect(() => {
        if(registrationService != undefined) {
            loadUserData().then(r => {
                setFullName(r.fullName)
                setEmail(r.email)
            })
        }
    }, []);

    const createUser = (e: React.FormEvent) => {
        e.preventDefault()
        const userRegistrationData: UserRegistrationData = {
            fullName: fullName,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        }
        registrationService(userRegistrationData, localStorage.getItem("USER_TOKEN")).then(response => {
            if(response.errors != null) {
                const errors = errorHandler(response)
                setOpen(true)
                setMsg(errors)
            } else {
                history.push({
                    pathname: returnPath,
                    state: {
                        userRegistration: true
                    }
                })
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {title}
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="fullName"
                                variant="outlined"
                                value={fullName}
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                onChange={(e) => setFullName(e.target.value)}
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={email}
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={password}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={passwordConfirmation}
                                name="passwordConfirmation"
                                label="Password Confirmation"
                                type="password"
                                id="passwordConfirmation"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={createUser}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Notification msg={msg} open={open} severity={"error"} setOpen={setOpen}/>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}