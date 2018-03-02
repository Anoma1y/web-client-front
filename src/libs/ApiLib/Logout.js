import axios from 'axios';
import Config from 'libs/config';

class LogoutLib {
    static logoutUserURL = "session";

    static logoutUser(token) {
        const logURL = Config.url + this.logoutUserURL;
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
