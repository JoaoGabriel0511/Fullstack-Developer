import {UserData} from "../interfaces/UserData";
import {getAllUsers} from "../services/admin";

export default function loadAllUsers(): Promise<Array<UserData>> {
    return getAllUsers(localStorage.getItem("USER_TOKEN")!).then(r => {
        return r.users.map((user: any) => {
            const userData: UserData = {
                email: user.email,
                fullName: user.full_name,
                role: user.role,
                id: user.id
            };
            return userData
        }).sort((function(a: UserData, b: UserData){
            if(a.fullName < b.fullName) { return -1; }
            if(a.fullName > b.fullName) { return 1; }
            return 0;
        }))
    });
}