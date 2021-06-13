import React from 'react';
import {userRegistration} from "../services/registration";
import UserRegistrationForm from "../components/UserRegistrationForm";


export default function SignUp() {


    return (
        <UserRegistrationForm title="Sign Up" returnPath="/" registrationService={userRegistration}/>
    );
}