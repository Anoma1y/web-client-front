import Config from 'libs/config';
import axios from 'axios';

class CryptoCurrency {
    static getCryptList(coin = 'btc-usd') {
        const URL = `https://api.cryptonator.com/api/ticker/${coin}/`;
        return axios.get(URL);
    }
    static getCryptoCurrency() {
        const URL = Config.currencyURL + "?limit=2";
        return axios.get(URL, {
            headers: {
                'X-CMC_PRO_API_KEY': Config.CURRENCY_API_KEY
            }
        })
    }
}

export default CryptoCurrency;
