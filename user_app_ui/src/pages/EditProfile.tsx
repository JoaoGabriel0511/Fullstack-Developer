import UserRegistrationForm from "../components/UserRegistrationForm";
import {editUserData} from "../services/user";


export default function EditProfile() {
    return (
        <UserRegistrationForm userId={null} isLogged={true} title="Edit Profile" returnPath="/Profile" registrationService={editUserData} linkMessage={"Return to profile page"} linkPath={"/Profile"} />
    )
}