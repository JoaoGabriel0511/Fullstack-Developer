import {baseUrl} from "./url";

export const getTotalUsersCount = async (token: String) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    const response = await fetch(`${baseUrl}/api/admin/totalUsersCount`, requestOptions)
    return response.json()
}

export const getAdminUsersCount = async (token: String) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    const response = await fetch(`${baseUrl}/api/admin/adminUsersCount`, requestOptions)
    return response.json()
}

export const getNoAdminUsersCount = async (token: String) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    const response = await fetch(`${baseUrl}/api/admin/noAdminUsersCount`, requestOptions)
    return response.json()
}

export const getAllUsers = async (token: String) => {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    const response = await fetch(`${baseUrl}/api/admin/recoverUsers`, requestOptions)
    return response.json()
}

export const changeRole = async (token: String, id: number) => {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    await fetch(`${baseUrl}/api/admin/toggleUserRole/${id}`, requestOptions)
}

export const userDelete = async (token: String, id: number) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': `Token ${token}`}
    }
    const response = await fetch(`${baseUrl}/api/admin/deleteUser/${id}`, requestOptions)
    return response.json()
}