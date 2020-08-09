import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/users';

export function register(user) {
    return http.post(apiEndPoint, {
        email: user.username,
        name: user.name,
        password: user.password
    });
}