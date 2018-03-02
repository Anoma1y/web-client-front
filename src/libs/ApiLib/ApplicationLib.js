import axios from 'axios';
import Config from 'libs/config';

class ApplicationLib {
    static applicationURL = "application";

    static CalculatorApplication(currency, amount, comment, token) {
        const appURL = Config.url + this.applicationURL;

        const data = { currency, amount, comment };
        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.post(appURL,
            data,
            header
        )
    }

    static addApplication(value) {
        const { currency, amount, comments, token } = value;
        return new Promise((res, rej) => {
            this.CalculatorApplication(currency, amount, comments, token).then((data) => {
                res(data)
            }).catch(() => {
                rej("Error");
            })
        });
    }

    static getApp(token) {
        const appURL = Config.url + this.applicationURL;
        const header = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.get(appURL,
            header
        )
    }
    static getApplication(token) {
        return new Promise((res, rej) => {
            this.getApp(token).then((data) => {
                res(data.data);
            }).catch((err) => {
                console.log(err);
            })
        })
    }
}

export default ApplicationLib;
