import React from 'react';
import {userRegistration} from "../services/registration";
import UserRegistrationForm from "../components/UserRegistrationForm";


export default function SignUp() {


    return (
        <UserRegistrationForm userId={null} isLogged={false} title="Sign Up" returnPath="/" registrationService={userRegistration} linkMessage={" Already have an account? Sign in"} linkPath={"/"}/>
    );
}