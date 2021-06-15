import React from 'react';
import Title from './Title';
import {UserData} from "../interfaces/UserData";
import {Container} from "@material-ui/core";
import ProfileButtons from "./ProfileButtons";


export type Props = {
    user: UserData
}

export default function AdminUserInfo({user}:Props) {

    return (
        <React.Fragment>
            <Container component="main" maxWidth="sm">
                <Title>Welcome {user?.fullName}</Title>
                <ProfileButtons/>
            </Container>
        </React.Fragment>
    );
}