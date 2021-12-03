import axios from "axios";
import jwtDecode from "jwt-decode";
import { userInfoApi } from '../Api/api'

const apiUrl = process.env.REACT_APP_API_URL;

export async function authServices(data) {

    try {
        const resp = await axios.post(`${apiUrl}/api/auth`, data);
        return resp.data;
    } catch (error) {
        return null;
    }
    
}

export function getCurrentUser() {
    try {
        const token = localStorage.getItem("token");
        return jwtDecode(token);
    } catch (error) {
        return null;
    }
}
export function getUserToken() {
    try {
        const token = localStorage.getItem("token");
        return token;
    } catch (error) {
        return null;
    }
}

export async function getUserData() {
    try {
        const token = localStorage.getItem("token");
        const user = await userInfoApi(token)
        return user;
    } catch (error) {
        return null;
    }
}

export function logout() {
    localStorage.removeItem("token");
}