
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export type Props = {
    msg: String | JSX.Element | Array<JSX.Element>;
    severity: any;
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function Notification({msg, open, severity, setOpen}: Props) {
    const classes = useStyles();
    const horizontal = 'center';
    const vertical = 'top';

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical,  horizontal }}>
                <Alert onClose={handleClose} severity={severity}>
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
