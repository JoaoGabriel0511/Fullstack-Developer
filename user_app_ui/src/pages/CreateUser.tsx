import UserRegistrationForm from "../components/UserRegistrationForm";
import {userRegistration} from "../services/registration";

export default function CreateUser() {
    return (
      <UserRegistrationForm userId={null} title={"Create new user"} registrationService={userRegistration} linkPath={"/AdminDashboard"} linkMessage={"return to dashboard"} returnPath={"/AdminDashboard"} isLogged={true}/>
    )
}