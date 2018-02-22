import axios from 'axios';

class SignUpLib {
    static url = "http://192.168.0.136:4874/v1/";
    static checkEmailURL = "profile/availability?email";
    static regUserURL = "profile";

    static checkAvailability(email) {
        const checkURL = this.url + this.checkEmailURL;
        return axios.head(`${checkURL}=${email}`)
    }

    static registrationUser(email, password) {
        const regURL = this.url + this.regUserURL;
        return axios.post(regURL, {
            email: email,
            password: password
        })
    }

    static regUser(email, password) {
        return new Promise((res, rej) => {
            this.checkAvailability(email).then(() => {
                this.registrationUser(email, password).then(() => {
                    res()
                }).catch(() => {
                    rej("Registration Error");
                })
            }).catch(() => {
                rej("Email already used by someone");
            })
        });
    }
}

export default SignUpLib;
