import Config from 'libs/config';
import axios from 'axios';

class CryptoCurrency {
    static apiURL = "https://api.coinmarketcap.com/v1/ticker/";

    static getCryptoCurrency() {
        const URL = this.apiURL + "?limit=2";
        return axios.get(URL)
    }
}

export default CryptoCurrency;