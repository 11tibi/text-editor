import axios from 'axios';
import {login} from "./actions/authenticated";
import {connect} from "react-redux";

const mapState = state => {
  return {
    authenticated: state.authenticated,
  }
};

const mapDispatch = {login};

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async function (error) {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        axiosInstance.post('api/token/refresh/', {
            refresh: refreshToken,
        }).then((response) => {
            const newAccessToken = response.data.access;
            axiosInstance.defaults.headers['Authorization'] = "JWT " + newAccessToken;
            localStorage.setItem('access_token', newAccessToken);
            return axiosInstance(originalRequest);
        }).catch(function (error) {
            console.info(error);
            return Promise.reject(error);
        })
    } else {
        console.info('Refresh token is expired');
        window.location.href = '/login/';
    }
})


export default connect(mapState, mapDispatch)(axiosInstance);
