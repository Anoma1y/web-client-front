import axios from 'axios';

class Subscribe {
    static url = "http://192.168.0.136:4874/v1/";
    static subscribeURL = "me/subscribe";

    static subscribeToBetaTest(android, ios) {
        const subsURL = this.url + this.subscribeURL;
        const TOKEN = localStorage.getItem("jwt");
        return axios.post(subsURL, {
            android,
            ios
        }, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
    }
}
export default Subscribe;