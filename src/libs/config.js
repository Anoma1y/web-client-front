class Config {
    static url = 'https://api.ico.onixclient.site/api/v1/'; //Production
    // static url = 'http://192.168.0.136:4874/v1/'; //Local URL
    // static url = process.env.REACT_APP_API_URL;
    // static url = 'https://test.account.tokensale.tsrpay.com/api/v1/';
    // static currencyURL = 'https://api.coinmarketcap.com/v1/ticker/'; //API CURRENCY
    static currencyURL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    static subscribeBetaTestURL = 'https://tsrpay.com/api/signupApp'; //Beta Test
    static subscribeEmailURL = "https://tsrpay.com/api/subscribeEmail"; //Email News
    static CURRENCY_API_KEY = '65f22cf9-b2d8-4b9d-89c2-473c5b3c7b10';
}

export default Config;
