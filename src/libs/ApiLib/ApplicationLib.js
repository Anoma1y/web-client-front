import axios from 'axios';

class ApplicationLib {
    static url = "http://192.168.0.136:4874/v1/";
    static applicationURL = "application";

    static CalculatorApplication(currency, amount, comment, token) {
        const appURL = this.url + this.applicationURL;

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
        const appURL = this.url + this.applicationURL;
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
