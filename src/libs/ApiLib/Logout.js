import axios from 'axios';

class LogoutLib {
    static url = "http://159.89.10.197:4874/v1/";
    static logoutUserURL = "session";

    static logoutUser(token) {
        const logURL = this.url + this.logoutUserURL;
        return axios.delete(logURL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    static logout(token) {
        return new Promise((res, rej) => {
            this.logoutUser(token).then((data) => {
                res(data)
            }).catch(() => {
                rej("Error, token undefined");
            })
        });
    }
}

export default LogoutLib;
