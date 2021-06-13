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
// @ts-ignore
import {useLocation, useHistory} from "react-router-dom";
import Notification from "../components/Notification";
import {Link} from "@material-ui/core";
import {userLogin} from "../services/login";
import {UserLoginData} from "../interfaces/UserLoginData";
import errorHandler from "../utils/errorHandler";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const location = useLocation();
    const history = useHistory();
    const [open, setOpen] = React.useState<boolean>(false)
    const [email, setEmail] = React.useState<String>("")
    const [password, setPassword] = React.useState<String>("")
    const [msg, setMsg] = React.useState<Array<JSX.Element> | String>("")
    const [severity, setSeverity] = React.useState<String>("")
    const classes = useStyles();

    useEffect(() => {
        if(location?.state?.userRegistration) {
            setOpen(true)
            setMsg("User registration successful")
            setSeverity("success")
        } else if(location?.state?.userDeleted) {
            setOpen(true)
            setMsg("User deleted")
            setSeverity("success")
        }
    }, []);

    const login = (e: React.FormEvent) => {
        e.preventDefault()
        const userLoginData: UserLoginData = {
            email: email,
            password: password
        }
        userLogin(userLoginData).then(r => {
            if (r.errors == null) {
                localStorage.setItem("USER_TOKEN", r.user.token);
                history.push({
                    pathname: '/Profile'
                })
            } else {
                const errors = errorHandler(r)
                setOpen(true)
                setMsg(errors)
                setSeverity("error")
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
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={login}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href='/SignUp' variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Notification msg={msg} severity={severity} open={open} setOpen={setOpen}/>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}