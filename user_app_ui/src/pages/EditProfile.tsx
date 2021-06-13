import UserRegistrationForm from "../components/UserRegistrationForm";
import {editUserData} from "../services/user";


export default function EditProfile() {
    return (
        <UserRegistrationForm title="Edit Profile" returnPath="/Profile" registrationService={editUserData}/>
    )
}