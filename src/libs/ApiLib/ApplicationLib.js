import axios from 'axios';

class ApplicationLib {
    static url = "http://159.89.10.197:4874/v1/";
    static applicationURL = "application";

    static CalculatorApplication(currency, amount, token) {
        const appURL = this.url + this.applicationURL;
        const data = { currency, amount };
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
        const { currency, amount, token } = value;
        return new Promise((res, rej) => {
            this.CalculatorApplication(currency, amount, token).then((data) => {
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
