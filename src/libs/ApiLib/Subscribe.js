import axios from 'axios';
import Config from 'libs/config';

class Subscribe {
    static  subscribeBetaTestURL = "https://tsrpay.com/api/signupApp";

    static subscribeToBetaTest(email, android, ios) {
        let andoidString = android === true ? "android" : "";
        let iosString = ios === true ? "ios" : "";
        return axios.post(this.subscribeBetaTestURL, {
            email,
            andoidString,
            iosString
        })
    }
}
export default Subscribe;