import axios from 'axios';

class LoginLib {
    static url = "http://192.168.0.136:4874/v1/";
    static logUserURL = "session";
    static userGetURL = "me";

    static loginUser(email, password) {
        const logURL = this.url + this.logUserURL;
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
        const userURL = this.url + this.userGetURL;
        return axios.get(userURL,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default LoginLib;
