import {getUserData} from "../services/user";
import {UserData} from "../interfaces/UserData";
import {recoverUser} from "../services/admin";
// @ts-ignore
import {useHistory} from "react-router-dom";

export default async function loadUserData(userId: number | null) : Promise<UserData> {

    if(userId == null) {
        return getUserData(localStorage.getItem("USER_TOKEN")!).then(r => {
                const userData: UserData = {
                    email: r.user.email,
                    fullName: r.user.full_name,
                    role: r.user.role,
                    id: r.user.id
                };
                return userData;
            }
        ).catch((error) => {
            throw error;
        })
    } else {
        return recoverUser(localStorage.getItem("USER_TOKEN")!, userId).then(r => {
                const userData: UserData = {
                    email: r.user.email,
                    fullName: r.user.full_name,
                    role: r.user.role,
                    id: r.user.id
                };
                return userData;
            }
        ).catch((error) => {
            throw error;
        });
    }
}