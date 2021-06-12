import {baseUrl} from "./url";
import {UserLoginData} from "../interfaces/UserLoginData";

export const userLogin = async (userLoginData: UserLoginData) => {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user: {
                email: userLoginData.email,
                password: userLoginData.password
            }
        })
    };
    const response = await fetch(`${baseUrl}/api/users/login`, requestOptions)
    return response.json()
}