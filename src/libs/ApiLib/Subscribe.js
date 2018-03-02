import axios from 'axios';
import Config from 'libs/config';

class Subscribe {
    static subscribeURL = "me/subscribe";

    static subscribeToBetaTest(android, ios) {
        const subsURL = Config.url + this.subscribeURL;
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