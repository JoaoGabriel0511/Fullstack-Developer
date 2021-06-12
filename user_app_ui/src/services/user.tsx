import {baseUrl} from "./url";

export const getUserData = async (token: String) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
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