import axios from 'axios';

class SignUpLib {
    static url = "http://192.168.0.136:4874/v1/";
    static checkEmailURL = "profile/availability?email";
    static regUserURL = "profile";
    static resetPasswordURL = "profile/password";

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

    static verificationUser(id, token) {
        const verificationURL = this.url + this.regUserURL;
        return axios.put(`${verificationURL}/${id}/verify/${token}`)
    }

    static resetPasswordFirstStep(email) {
        const resetURL = this.url + this.resetPasswordURL;
        return axios.delete(resetURL, { data: {
            email
        }})
    }
    
    static resetPassword(email) {
        return new Promise((res, rej) => {
            this.resetPasswordFirstStep(email).then(() => {
                res();
            }).catch((err) => {
                console.log(err);
                rej(err);
            })
        });
    }

    static setNewPassword(value) {
        const resetURL = this.url + this.resetPasswordURL;
        const { tid, token, newPassword } = value;
        return new Promise((res, rej) => {
            axios.post(resetURL, {
                token_id: parseInt(tid),
                token: token,
                password: newPassword
            }).then((data) => {
                res(data);
            }).catch((err) => {
                rej(err)
            })
        });
    }

}

export default SignUpLib;
