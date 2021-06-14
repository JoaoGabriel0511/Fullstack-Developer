import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {getAdminUsersCount, getNoAdminUsersCount, getTotalUsersCount} from "../services/admin";


export default function UsersCountInfo() {
    const [totalUsersCount, setTotalUsersCount] = React.useState<number>()
    const [adminUsersCount, setAdminUsersCount] = React.useState<number>()
    const [noAdminlUsersCount, setNoAdminUsersCount] = React.useState<number>()

    useEffect(() => {
        getTotalUsersCount(localStorage.getItem("USER_TOKEN")!).then(r => setTotalUsersCount(r.totalUsersCount))
        getAdminUsersCount(localStorage.getItem("USER_TOKEN")!).then(r => setAdminUsersCount(r.adminUsersCount))
        getNoAdminUsersCount(localStorage.getItem("USER_TOKEN")!).then(r => setNoAdminUsersCount(r.noAdminUsersCount))
    }, []);

    return (
        <React.Fragment>
            <Title>Total users</Title>
            <Typography component="p" variant="h6">
                {totalUsersCount}
            </Typography>
            <Title>Admin users</Title>
            <Typography component="p" variant="h6">
                {adminUsersCount}
            </Typography>
            <Title>No admin users</Title>
            <Typography component="p" variant="h6">
                {noAdminlUsersCount}
            </Typography>
        </React.Fragment>
    );
}