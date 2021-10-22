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

const interceptor = axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status !== 401) {
            return Promise.reject(error);
        }
        axiosInstance.interceptors.response.eject(interceptor);
        const refreshToken = localStorage.getItem('refresh_token');
        return axiosInstance.post('api/token/refresh/', {
            refresh: refreshToken,
        }).then((response) => {
            const newAccessToken = response.data.access;
            error.response.config.headers['Authorization'] = "JWT " + newAccessToken;
            localStorage.setItem('access_token', newAccessToken);
            return axiosInstance(error.response.config);
        }).catch(function (error) {
            console.info(error);
            this.router.push('/login');
            return Promise.reject(error);
        })
    }
)

export default connect(mapState, mapDispatch)(axiosInstance);
