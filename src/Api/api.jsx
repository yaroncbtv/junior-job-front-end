import axios from "axios";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";

const baseURL = process.env.REACT_APP_API_URL;

export const registerUser = async (userData) => {
    try {
        const resp = await axios.post(baseURL + '/users/register', userData);
        return {isSucsses:true,resp:resp.data};
    } catch (err) {
        console.error(err.response.data);
        return {isSucsses:false,resp:err.response.data}
    }
};

export const loginUser = async (userData) => {
    try {
        const resp = await axios.post(baseURL + '/users/login', userData);
        return resp.data;
    } catch (err) {
        console.error(err);
        
    }
};

export const userInfoApi = async (getToken) => {
    try {
        const resp = await axios.get(baseURL + '/users/me', { headers: {"x-auth-token" : getToken}});
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const getAllTypeLocPos = async () => {
    try {
        const resp = await axios.get(baseURL + '/typelocpos/getall');
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const postNewJobs = async (job) => {
    try {
        const resp = await axios.post(baseURL + '/jobs/newjob', job);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const getAllJobs = async () => {
    try {
        const resp = await axios.get(baseURL + '/jobs/getall');
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const getAllUserDataFromToken = async () => {
    try {
        const token = await localStorage.getItem("token");
        const resp = await axios.get(baseURL + '/users/me', { headers: {"x-auth-token" : token}});
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const userPassTestSendEmailTo = async (data) => {
    try {
        const resp = await axios.post(baseURL + '/jobs/userPassTestSendEmailTo', data);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const saveUserInJobTest = async (data) => {
    try {
        const resp = await axios.post(baseURL + '/jobs/saveUserInJobTest', data);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const updateUser = async (data) => {
    try {
        const resp = await axios.post(baseURL + '/users/updateUser', data);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const clearUserJobs = async (data) => {
    try {
        const resp = await axios.post(baseURL + '/jobs/updateOneTime', data);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};
export const usersTookTest = async (data) => {
    try {
        const resp = await axios.get(baseURL + '/jobs/getUsersTookTest/'+data);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};
export const usersTookTestCount = async (data) => {
    try {
        const resp = await axios.get(baseURL + '/jobs/getUsersTookCount', data);
        return resp.data;
    } catch (err) {
        console.error(err);
    }
};

export const payPal = async () => {
    try {
        // const data = {
        //     CLIENT_ID: 'EECF59v3XljhnEbAq5QsqhQt7EYuEzPPsfXBwS6ltUB9v_rn-V4l4mpcEug-2x-DdKHKitUa81T7dDfe',
        //     grant_type: 'AYl5bYnrQV7otuN2M6jyeZGIWM_19OyOs4K_hM-Hx0bX93Q4dUr-OUNYD3LpbnUEnIiIksVYzQ4fB6OL'
        // }
        // const resp = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', data);

       const resp =  await axios({
            url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Accept-Language': 'en_US',
              'content-type': 'application/x-www-form-urlencoded',
            },
            auth: {
              username: 'AYl5bYnrQV7otuN2M6jyeZGIWM_19OyOs4K_hM-Hx0bX93Q4dUr-OUNYD3LpbnUEnIiIksVYzQ4fB6OL',
              password: 'EECF59v3XljhnEbAq5QsqhQt7EYuEzPPsfXBwS6ltUB9v_rn-V4l4mpcEug-2x-DdKHKitUa81T7dDfe',
            },
            params: {
              grant_type: 'client_credentials',
            },
          });
      
        return resp.data.access_token;
    } catch (err) {
        console.error(err);
    }
};