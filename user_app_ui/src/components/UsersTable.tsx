import React, {useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {UserData} from "../interfaces/UserData";
import loadAllUsers from "../utils/loadAllUsers";
import Button from "@material-ui/core/Button";
import {changeRole, userDelete} from "../services/admin";

function preventDefault(event: React.FormEvent) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function UsersTable() {
    const classes = useStyles();
    const [users, setUsers] = React.useState<Array<UserData>>()

    useEffect(() => {
        loadAllUsers().then(r => setUsers(r))
    }, []);

    const toggleRole = (id:number) => {
        changeRole(localStorage.getItem("USER_TOKEN")!, id).then(() => {
            loadAllUsers().then(r => setUsers(r))
        })
    }

    const deleteUser = (id:number) => {
        userDelete(localStorage.getItem("USER_TOKEN")!, id).then(() => {
            loadAllUsers().then(r => setUsers(r))
        })
    }

    return (
        <React.Fragment>
            <Title>Users</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell><Button onClick={() => {toggleRole(user.id)}} fullWidth variant="contained" color="primary">Toggle role</Button></TableCell>
                            <TableCell><Button onClick={() => {deleteUser(user.id)}} fullWidth variant="contained" color="secondary">Delete</Button></TableCell>
                            <TableCell><Button href={"/AdminDashboard/EditUser/" + user.id} fullWidth variant="contained">Edit</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href={"/AdminDashboard/CreateUser"}>
                    Creat user
                </Link>
            </div>
        </React.Fragment>
    );
}