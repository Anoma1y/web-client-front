import Config from 'libs/config';
import axios from 'axios';

class PayLib {
    static getPaymentData(ID) {
        const url = `${Config.url}pay/${ID}`;
        const TOKEN = localStorage.jwt;
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
    }
}
export default PayLib;