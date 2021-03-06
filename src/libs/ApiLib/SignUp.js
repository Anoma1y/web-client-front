import axios from 'axios';
import Config from 'libs/config';

class SignUpLib {
    static checkEmailURL = "profile/availability?email";
    static regUserURL = "profile";
    static resetPasswordURL = "profile/password";

    static subscribeEmail(email) {
        const subsURL = Config.subscribeEmailURL;
        const data = {
            email
        }
        return axios.post(subsURL, JSON.stringify(data))
    }

    static checkAvailability(email) {
        const checkURL = Config.url + this.checkEmailURL;
        return axios.head(`${checkURL}=${email}`)
    }

    static registrationUser(email, password) {
        const regURL = Config.url + this.regUserURL;
        return axios.post(regURL, {
            email: email,
            password: password
        })
    }

    static regUser(email, password) {
        return new Promise((res, rej) => {
            this.checkAvailability(email).then(() => {
                this.registrationUser(email, password).then(() => {
                    this.subscribeEmail(email).then(() => {
                        console.log("You are subscribe");
                    }).catch((err) => {
                        console.log(err);
                    });
                    res();
                }).catch(() => {
                    rej("Registration Error");
                })
            }).catch(() => {
                rej("Email already used by someone");
            })
        });
    }

    static verificationUser(id, token) {
        const verificationURL = Config.url + this.regUserURL;
        return axios.put(`${verificationURL}/${id}/verify/${token}`)
    }

    static resetPasswordFirstStep(email) {
        const resetURL = Config.url + this.resetPasswordURL;
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
        const resetURL = Config.url + this.resetPasswordURL;
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
