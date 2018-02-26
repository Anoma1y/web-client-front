import axios from 'axios';

class LoginLib {
    static url = "http://159.89.10.197:4874/v1/";
    static logUserURL = "session";

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
}

export default LoginLib;
