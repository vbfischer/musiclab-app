import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3000/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `${token}`);
    }
};

const requests = {
    get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    postAuth: (url, username, password) =>
        superagent.post(`${API_ROOT}${url}`).auth(username, password).then(responseBody)
};

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.postAuth('/auth/login', email, password)

};

const Exercises = {
    getAll: () =>
        requests.get('/exercise/references')
};

export default {
    Auth,
    Exercises,
    setToken: _token => {
        token = _token;
    }
};
