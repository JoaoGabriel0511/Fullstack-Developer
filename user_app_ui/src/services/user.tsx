import {baseUrl} from "./url";
import {UserRegistrationData} from "../interfaces/UserRegistrationData";

export const getUserData = async (token: String) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    const response = await fetch(`${baseUrl}/api/user`, requestOptions)
    return response.json()
}

export const editUserData = async (userRegistrationData: UserRegistrationData, token: String | null) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`},
        body: JSON.stringify({
            user: {
                full_name: userRegistrationData.fullName,
                email: userRegistrationData.email,
                password: userRegistrationData.password,
                password_confirmation: userRegistrationData.passwordConfirmation
            }
        })
    }
    const response = await fetch(`${baseUrl}/api/user`, requestOptions)
    return response.json()
}

export const deleteUser = async (token: String) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    const response = await fetch(`${baseUrl}/api/user`, requestOptions)
    return response.json()
}