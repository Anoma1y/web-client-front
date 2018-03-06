import Config from 'libs/config';
import axios from 'axios';

class CryptoCurrency {
    static getCryptoCurrency() {
        const URL = Config.currencyURL + "?limit=2";
        return axios.get(URL)
    }
}

export default CryptoCurrency;