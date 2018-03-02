import axios from 'axios';
import Config from 'libs/config';

class LoginLib {
    static logUserURL = "session";
    static userGetURL = "me";

    static loginUser(email, password) {
        const logURL = Config.url + this.logUserURL;
        return axios.post(logURL, {
            email: email,
            password: password
        })
    }

    static logUser(email, password) {
        return new Promise((res, rej) => {
            this.loginUser(email, password).then((data) => {
                res(data)
            }).catch(() => {
                rej("Wrong login or password");
            })
        });
    }

    static getUser(token) {
        const userURL = Config.url + this.userGetURL;
        return axios.get(userURL,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default LoginLib;
