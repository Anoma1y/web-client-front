import moment from 'moment';

export const separationValue = (value, digits) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);

export const declOfNum = (n, titles) => titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];


/********/
/*ЗАЯВКИ*/
/********/
const END_TIME_1 = moment('2018-03-30 2:00 pm +0300', 'YYYY-MM-DD h:mm a Z'); // Время начала 2% бонуса для всех
const END_TIME_2 = moment('2018-03-31 4:00 pm +0300', 'YYYY-MM-DD h:mm a Z'); // Время конца

//Функция расчета значения с бонусом: значения + процент, bonus - число  процентов, bonusAfter - проверка вхождения даты бонусного процента (2%)
//Если тру то вместо 0% => 2%
export const bonusCalcRequest = (value, bonus, bonusAfter) => {
    if (bonusAfter === true && bonus === 0) {
        bonus = 2;
    }
    return (1 * value) + ((1 * value) * (bonus / 100));
};

//Проверка вхождения значения в лимит, если да, то возвращает процентов бонусов.
//currency - отношения фиксированной валюты к нефиксированной, bonus - массив бонусов (процент бонуса начисляется по последнему активному объекту)
// bonus: [
//     {
//         value: 2.5, //процент бонуса
//         limit: 100000, //лимит, после которого этот бонус начинает действовать
//         active: false //при достижении лимита, становиться true
//     },{
//         value: 5,
//         limit: 500000,
//         active: false
//     },{
//         value: 10,
//         limit: 1000000,
//         active: false
//     },{
//         value: 15,
//         limit: 2000000,
//         active: false
//     }
// ] что то похожее.
export const checkPercent = (value, currency, bonus) => {
    let bonusPercent = 0;
    bonus.forEach((bon) => {
        if (currency[0] === "TSR" && value >= bon.limit) {
            bonusPercent = bon.value
        } else if (currency[1] === "TSR" && value >= bon.limit) {
            bonusPercent = bon.value
        }
    })
    return bonusPercent;
};

//Расчет нефиксированной валюты и бонусов для фиксированной
//APPLICATION_DATE - дата создания заявки (необходимое для проверки бонуса в определенный период времени)
//FIXED_AMOUNT - числовое значение зафисикированной валюты/токена
//CURRENCY - TSR/ETH, TSR/USD, TSR/BTC, BTC/TSR, USD/TSR
//TSR_INITIAL_VALUE - начальное значение токена, 0,001, в редюсере rate
//CRYPTO_CURRENCY - курс валют, находится в редюсере rate
//BONUS_LIST - массив бонусов, см. функцию checkPercent, массив расписан (передать его)
export const applicationCalc = (APPLICATION_DATE, FIXED_AMOUNT, CURRENCY, TSR_INITIAL_VALUE, CRYPTO_CURRENCY, BONUS_LIST) => {
    let CURRENCYVALUE = ''; //Значение валюты в денежном формате
    let TOKENVALUE = ''; //Значение токена в денежном формате
    let CURRENCY_AMOUNT = 0; //Значение валюты числом
    let CURRENCY_NAME = ''; //Название валюты, в которой будет производится оплата
    let PERCENT = 0;//Процент скидки

    //Проверка даты - если дата создания заявки попадает в интервал между END_TIME_1 и END_TIME_2, то TRUE - скидка в последствии будет 2%
    const checkBonusTime = moment(APPLICATION_DATE).isBetween(END_TIME_1, END_TIME_2);

    if (CURRENCY[0] === "TSR" && CURRENCY[1] === "ETH") {
        PERCENT = checkPercent(FIXED_AMOUNT, CURRENCY, BONUS_LIST);
        CURRENCY_AMOUNT = TSR_INITIAL_VALUE * FIXED_AMOUNT;
        CURRENCY_NAME = 'ETH';
        CURRENCYVALUE = `${separationValue(CURRENCY_AMOUNT, 4)} ETH`;
        TOKENVALUE = separationValue(bonusCalcRequest(FIXED_AMOUNT, PERCENT, checkBonusTime), 4);
    }
    else if (CURRENCY[0] === "TSR" && CURRENCY[1] === "BTC") {
        PERCENT = checkPercent(FIXED_AMOUNT, CURRENCY, BONUS_LIST);
        CURRENCY_AMOUNT = FIXED_AMOUNT * (TSR_INITIAL_VALUE * CRYPTO_CURRENCY[1].price_btc);
        CURRENCY_NAME = 'BTC';
        CURRENCYVALUE = `${separationValue(CURRENCY_AMOUNT, 4)} BTC`;
        TOKENVALUE = separationValue(bonusCalcRequest(FIXED_AMOUNT, PERCENT, checkBonusTime), 4);
    }
    else if (CURRENCY[0] === "TSR" && CURRENCY[1] === "USD") {
        PERCENT = checkPercent(FIXED_AMOUNT, CURRENCY, BONUS_LIST);
        CURRENCY_AMOUNT = FIXED_AMOUNT * (CRYPTO_CURRENCY[1].price_usd * TSR_INITIAL_VALUE);
        CURRENCY_NAME = 'USD';
        CURRENCYVALUE = `$ ${separationValue(CURRENCY_AMOUNT, 2)}`;
        TOKENVALUE = separationValue(bonusCalcRequest(FIXED_AMOUNT, PERCENT, checkBonusTime), 4);
    }
    else if (CURRENCY[0] === "USD" && CURRENCY[1] === "TSR") {
        const USDTOKEN = FIXED_AMOUNT / (CRYPTO_CURRENCY[1].price_usd * TSR_INITIAL_VALUE);
        PERCENT = checkPercent(USDTOKEN, CURRENCY, BONUS_LIST);
        CURRENCY_AMOUNT = FIXED_AMOUNT;
        CURRENCY_NAME = 'USD';
        CURRENCYVALUE = `$ ${separationValue(CURRENCY_AMOUNT, 2)}`;
        TOKENVALUE = separationValue(bonusCalcRequest(USDTOKEN, PERCENT, checkBonusTime), 4);
    }
    else if (CURRENCY[0] === "BTC" && CURRENCY[1] === "TSR") {
        const BTCTOKEN = (FIXED_AMOUNT * (CRYPTO_CURRENCY[0].price_usd / CRYPTO_CURRENCY[1].price_usd)) / TSR_INITIAL_VALUE;
        PERCENT = checkPercent(BTCTOKEN, CURRENCY, BONUS_LIST);
        CURRENCY_AMOUNT = FIXED_AMOUNT;
        CURRENCY_NAME = 'BTC';
        TOKENVALUE = separationValue(bonusCalcRequest(BTCTOKEN, PERCENT, checkBonusTime), 4);
        CURRENCYVALUE = `${separationValue(CURRENCY_AMOUNT, 4)} BTC`;
    }
    return {
        TOKENVALUE,
        CURRENCYVALUE,
        CURRENCY_AMOUNT,
        CURRENCY_NAME
    }
};

/*************/
/*КАЛЬКУЛЯТОР*/
/*************/
//Проверка достижения максимума
export const checkMaximum = value => value >= 100;

export const transferToTKNbonus = (value, bonusTKN, TSR) => Math.round(value  / TSR) + (Math.round(value  / TSR) * (bonusTKN / 100));

export const transferToTKN = (value, TSR) => value / TSR;

//Функция расчета значения с бонусом: значения + процент
export const bonusCalc = (value, bonus) => (1 * value)  + ((1 * value) * (bonus / 100));

export const checkBonus = (value, bonusList) => {
    let bonusTSR = 0;
    let bonus = [];

    const checkBonusTime = moment().isBetween(END_TIME_1, END_TIME_2);
    bonusList.forEach((item) => {
        if (value >= item["limit"]) {
            bonusTSR = item["value"];
            bonus.push({value: item["value"], limit: item["limit"], active: true});
        } else {
            bonus.push({value: item["value"], limit: item["limit"], active: false});
        }
    });
    if (bonusTSR === 0 && checkBonusTime) {
        bonusTSR = 2;
    }
    return {
        bonus,
        bonusTSR
    }
};

export const transferUSD = (value, type, CRYPTO_CURRENCY) => {
    switch(type) {
        case "BTC":
            return (value / CRYPTO_CURRENCY[0].price_usd).toFixed(4);
        case "ETH":
            return (value / CRYPTO_CURRENCY[1].price_usd).toFixed(4);
        default:
            return;
    }
};

export const transferETH = (value, type, CRYPTO_CURRENCY) => {
    switch(type) {
        case "USD":
            return (value * CRYPTO_CURRENCY[1].price_usd).toFixed(2);
        case "BTC":
            return (CRYPTO_CURRENCY[1].price_btc * value).toFixed(4);
        default:
            return;
    }
};

export const transferBTC = (value, type, CRYPTO_CURRENCY) => {
    switch(type) {
        case "USD":
            return (value * CRYPTO_CURRENCY[0].price_usd).toFixed(2);
        case "ETH":
            return ((CRYPTO_CURRENCY[0].price_usd / CRYPTO_CURRENCY[1].price_usd) * value).toFixed(4);
        default:
            return;
    }
};

export const TKNprice = (type, TSR, CRYPTO_CURRENCY) => {
    switch(type) {
        case "BTC":
            return CRYPTO_CURRENCY[0].price_usd * TSR;
        case "ETH":
            return CRYPTO_CURRENCY[1].price_usd * TSR;
        default:
            return TSR;
    }
};

export const currentCountItems = (itemsPerPage, currentPage) => {
    let fromPage = itemsPerPage * (currentPage - 1);
    let toPage = (fromPage - 1) + (itemsPerPage + 1);
    return {
        fromPage,
        toPage
    }
};

export const calcCurrency = (value, currencyValue, bonusList, currency, TSR_PRICE) => {
    let bonus;
    let BTC, ETH, TKNinitialValue, TSRvalue, USD;
    const TSR_ETH = TKNprice("ETH", TSR_PRICE, currency);
    const checkBonusTime = moment().isBetween(END_TIME_1, END_TIME_2);
    if (currencyValue === "USD") {
        BTC = transferUSD(value, "BTC", currency);
        ETH = transferUSD(value, "ETH", currency);
        TKNinitialValue = transferToTKN(value, TSR_ETH);
        bonus = checkBonus(TKNinitialValue, bonusList);
        if (bonus.bonusTSR === 0 && checkBonusTime) {
            bonus.bonusTSR = 2;
        }
        TSRvalue = transferToTKNbonus(value, bonus.bonusTSR, TSR_ETH);
        USD = value;
    } else if (currencyValue === "ETH") {
        USD = transferETH(value, "USD", currency);
        BTC = transferETH(value, "BTC", currency);
        TKNinitialValue = transferToTKN(value, TSR_PRICE);
        bonus = checkBonus(TKNinitialValue, bonusList);
        if (bonus.bonusTSR === 0 && checkBonusTime) {
            bonus.bonusTSR = 2;
        }
        TSRvalue = transferToTKNbonus(USD, bonus.bonusTSR, TSR_ETH);
        ETH = value;
    } else if (currencyValue === "BTC") {
        USD = transferBTC(value, "USD", currency);
        ETH = transferBTC(value, "ETH", currency);
        TKNinitialValue = transferToTKN(USD, TSR_ETH);
        bonus = checkBonus(TKNinitialValue, bonusList);
        if (bonus.bonusTSR === 0 && checkBonusTime) {
            bonus.bonusTSR = 2;
        }
        TSRvalue = transferToTKNbonus(USD, bonus.bonusTSR, TSR_ETH);
        BTC = value;
    }
    const progressBar = handleProgressBar(TKNinitialValue, bonusList);
    return {
        sumValue: value,
        progressBar,
        tokenValue: TKNinitialValue.toFixed(4),
        bonus: bonus.bonus,
        currentBonus: bonus.bonusTSR,
        transferData: {
            USD,
            TSR: TSRvalue,
            BTC,
            ETH
        }
    }
};

export const calcToken = (value, currencyValue, bonusList, currency, TKN_PRICE) => {
    const {
        bonus,
        bonusTSR
    } = checkBonus(value, bonusList);

    const bonusValue = bonusCalc(value, bonusTSR);
    const {
        USD,
        BTC,
        ETH,
        TSR
    } = transferTKN(value, bonusValue, currency, TKN_PRICE);
    const currentTokenValue = currencyValue === "BTC"
        ? Number(BTC.toFixed(4))
        : currencyValue === "ETH"
            ? Number(ETH.toFixed(4))
            : Number(USD.toFixed(2));
    const progressBar = handleProgressBar(value, bonus);
    return {
        sumValue: currentTokenValue,
        progressBar,
        tokenValue: value,
        bonus,
        currentBonus: bonusTSR,
        transferData: {
            USD: Number(USD.toFixed(2)),
            TSR,
            BTC: Number(BTC.toFixed(4)),
            ETH: Number(ETH.toFixed(4))
        }
    }
};

const handleProgressBar = (value, bonus) => {
    const percent = ((value * 100) / bonus[bonus.length - 1]["limit"]);
    const isMaximum = checkMaximum(percent);
    return {
        isMaximum,
        percent
    };
};

const transferTKN = (value, bonusValue, currency, TKN_PRICE) => {
    const TSR_ETH = TKNprice("ETH", TKN_PRICE, currency);
    const USD = TSR_ETH *  value;
    const BTC = (TSR_ETH / currency[0].price_usd) * value;
    const ETH = (TSR_ETH / currency[1].price_usd) * value;
    return {
        USD,
        BTC,
        ETH,
        TSR: bonusValue
    };
};