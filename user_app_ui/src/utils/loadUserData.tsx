import {getUserData} from "../services/user";
import {UserData} from "../interfaces/UserData";

export default async function loadUserData() : Promise<UserData> {
    return getUserData(localStorage.getItem("USER_TOKEN")!).then(r => {
            const userData: UserData = {
                email: r.user.email,
                fullName: r.user.full_name,
                role: r.user.role,
                id: r.user.id
            };
            return userData;
        }
    );
}