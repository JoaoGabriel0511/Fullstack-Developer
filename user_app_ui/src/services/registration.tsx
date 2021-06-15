import {UserRegistrationData} from "../interfaces/UserRegistrationData";
import {baseUrl} from "./url";

export const userRegistration = async (userRegistrationData: UserRegistrationData) => {
    /*const data = new FormData()
    Object.keys(userRegistrationData).forEach((key, value) => {
        // @ts-ignore
        data.append(key, userRegistrationData[key].toString())
    })*/
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            user: {
                full_name: userRegistrationData.fullName,
                email: userRegistrationData.email,
                password: userRegistrationData.password,
                password_confirmation: userRegistrationData.passwordConfirmation,
                image: userRegistrationData.image
            }
        })
    };
    const response = await fetch(`${baseUrl}/api/users`, requestOptions)
    return response.json()
}