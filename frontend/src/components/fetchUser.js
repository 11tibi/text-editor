import axiosInstance from "../axiosApi";
import {setUser} from "../actions/user";
import store from '../store';


function fetchUser() {
    axiosInstance.get('api/user/').then((response) => {
        store.dispatch(setUser(response.data));
    }).catch((error) => {})
}

export default fetchUser;
