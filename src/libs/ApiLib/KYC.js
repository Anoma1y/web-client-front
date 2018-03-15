import axios from 'axios';
import Config from 'libs/config';

class KYC {
    static sendIndividualURL = 'kyc?type=individual';
    static sendLegalEntity = 'kyc?type=legal';

    static sendKYC(type, data, TOKEN) {
        const url = type === 0 ? `${Config.url}${this.sendIndividualURL}` : `${Config.url}${this.sendLegalEntity}`;
        return axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
    }
}

export default KYC;
