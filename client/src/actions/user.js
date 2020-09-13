import axios from 'axios';
import {LOGIN_USER} from './types';

export function loginUser(data){
   return {
        type: LOGIN_USER,
        payload: axios.post('/api/users/login', data).then(response => response.data)
    }
}