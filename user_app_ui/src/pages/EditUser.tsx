import UserRegistrationForm from "../components/UserRegistrationForm";
import {editUserData} from "../services/user";
import {useEffect} from "react";
// @ts-ignore
import {useParams} from "react-router-dom";
import {editUser} from "../services/admin";

export default function EditUser() {

    let { userId } = useParams();

    return (
        <UserRegistrationForm isEdit={true} title="Edit User" returnPath="/AdminDashboard" registrationService={editUser} linkMessage={"return to dashboard"} linkPath={"/AdminDashboard"} userId={userId}/>
    );
}