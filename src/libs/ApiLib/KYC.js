import axios from 'axios';
import Config from 'libs/config';

class KYC {
    static sendIndividualURL = 'kyc?type=individual&country';
    static sendLegalEntity = 'kyc?type=legal&country=';

    static sendKYC(type, data, country, TOKEN) {
        const url = type === 0 ? `${Config.url}${this.sendIndividualURL}=${country}` : `${Config.url}${this.sendLegalEntity}=${country}`;
        return axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
    }

    static getKYCById(TOKEN) {
        const url = `${Config.url}kyc`;
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
    }

    static getKYCImage(id, TOKEN) {
        const url = `${Config.url}file?ids=${id}`;
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
    }
}

export default KYC;
