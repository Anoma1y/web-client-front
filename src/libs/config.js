class Config {
    static url = 'https://accounts.tokensale.tsrpay.com/api/v1/'; //Production
    // static url = 'http://192.168.0.136:4874/v1/'; //Local URL
    // static url = process.env.REACT_APP_API_URL;
    // static url = 'https://test.account.tokensale.tsrpay.com/api/v1/';
    static currencyURL = 'https://api.coinmarketcap.com/v1/ticker/'; //API CURRENCY
    static subscribeBetaTestURL = 'https://tsrpay.com/api/signupApp'; //Beta Test
    static subscribeEmailURL = "https://tsrpay.com/api/subscribeEmail"; //Email News
}

export default Config;