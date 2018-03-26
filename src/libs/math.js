export const separationValue = (value, digits) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits, maximumSignificantDigits: 5 }).format(value);

export const bonusCalc = (value, bonus) => (1 * value)  + ((1 * value) * (bonus / 100));

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
}

export const applicationCalc = (FIXED_AMOUNT, CURRENCY, TSR_INITIAL_VALUE, CRYPTO_CURRENCY, BONUS_LIST) => {
    let CURRENCYVALUE = 0;
    let TOKENVALUE = 0;
    let percent = 0;
    if (CURRENCY[0] === "TSR" && CURRENCY[1] === "ETH") {
        percent = checkPercent(FIXED_AMOUNT, CURRENCY, BONUS_LIST);
        CURRENCYVALUE = `${separationValue((TSR_INITIAL_VALUE * FIXED_AMOUNT), 4)} ETH`;
        TOKENVALUE = separationValue(bonusCalc(FIXED_AMOUNT, percent), 4);
    }

    else if (CURRENCY[0] === "TSR" && CURRENCY[1] === "BTC") {
        percent = checkPercent(FIXED_AMOUNT, CURRENCY, BONUS_LIST);
        CURRENCYVALUE = `${separationValue((FIXED_AMOUNT * (TSR_INITIAL_VALUE * CRYPTO_CURRENCY[1].price_btc)), 4)} BTC`;
        TOKENVALUE = separationValue(bonusCalc(FIXED_AMOUNT, percent), 4);
    }

    else if (CURRENCY[0] === "TSR" && CURRENCY[1] === "USD") {
        percent = checkPercent(FIXED_AMOUNT, CURRENCY, BONUS_LIST);
        CURRENCYVALUE = `$ ${separationValue(FIXED_AMOUNT * (CRYPTO_CURRENCY[1].price_usd * TSR_INITIAL_VALUE), 2)}`;
        TOKENVALUE = separationValue(bonusCalc(FIXED_AMOUNT, percent), 4);
    }

    else if (CURRENCY[0] === "USD" && CURRENCY[1] === "TSR") {
        const USDTOKEN = FIXED_AMOUNT / (CRYPTO_CURRENCY[1].price_usd * TSR_INITIAL_VALUE);
        percent = checkPercent(USDTOKEN, CURRENCY, BONUS_LIST);
        CURRENCYVALUE = `$ ${separationValue(FIXED_AMOUNT, 2)}`;
        TOKENVALUE = separationValue(bonusCalc(USDTOKEN, percent), 4);
    }

    else if (CURRENCY[0] === "BTC" && CURRENCY[1] === "TSR") {
        const BTCTOKEN = (FIXED_AMOUNT * (CRYPTO_CURRENCY[0].price_usd / CRYPTO_CURRENCY[1].price_usd)) / TSR_INITIAL_VALUE;
        percent = checkPercent(BTCTOKEN, CURRENCY, BONUS_LIST);
        TOKENVALUE = separationValue(bonusCalc(BTCTOKEN, percent), 4);
        CURRENCYVALUE = `${separationValue(FIXED_AMOUNT, 4)} BTC`;
    }
    return {
        TOKENVALUE,
        CURRENCYVALUE
    }
}

export const checkMaximum = value => value >= 100;

export const transferToTKNbonus = (value, bonusTKN, TSR) => Math.round(value  / TSR) + (Math.round(value  / TSR) * (bonusTKN / 100));

export const transferToTKN = (value, TSR) => value / TSR;

export const checkBonus = (value, bonusList) => {
    let bonusTSR = 0;
    let bonus = [];
    bonusList.forEach((item) => {
        if (value >= item["limit"]) {
            bonusTSR = item["value"];
            bonus.push({value: item["value"], limit: item["limit"], active: true});
        } else {
            bonus.push({value: item["value"], limit: item["limit"], active: false});
        }
    });
    return {
        bonus,
        bonusTSR
    }
}

export const transferUSD = (value, type, CRYPTO_CURRENCY) => {
    switch(type) {
        case "BTC":
            return (value / CRYPTO_CURRENCY[0].price_usd).toFixed(4);
        case "ETH":
            return (value / CRYPTO_CURRENCY[1].price_usd).toFixed(4);
        default:
            return;
    }
}

export const transferETH = (value, type, CRYPTO_CURRENCY) => {
    switch(type) {
        case "USD":
            return (value * CRYPTO_CURRENCY[1].price_usd).toFixed(2);
        case "BTC":
            return (CRYPTO_CURRENCY[1].price_btc * value).toFixed(4);
        default:
            return;
    }
}

export const transferBTC = (value, type, CRYPTO_CURRENCY) => {
    switch(type) {
        case "USD":
            return (value * CRYPTO_CURRENCY[0].price_usd).toFixed(2);
        case "ETH":
            return ((CRYPTO_CURRENCY[0].price_usd / CRYPTO_CURRENCY[1].price_usd) * value).toFixed(4);
        default:
            return;
    }
}

export const TKNprice = (type, TSR, CRYPTO_CURRENCY) => {
    switch(type) {
        case "BTC":
            return CRYPTO_CURRENCY[0].price_usd * TSR;
        case "ETH":
            return CRYPTO_CURRENCY[1].price_usd * TSR;
        default:
            return TSR;
    }
}

export const currentCountItems = (itemsPerPage, currentPage) => {
    let fromPage = itemsPerPage * (currentPage - 1);
    let toPage = (fromPage - 1) + (itemsPerPage + 1);
    return {
        fromPage,
        toPage
    }
}


export const calcCurrency = (value, currencyValue, bonusList, currency, TSR_PRICE) => {
    let bonus;
    let BTC, ETH, TKNinitialValue, TSRvalue, USD;
    const TSR_ETH = TKNprice("ETH", TSR_PRICE, currency);
    if (currencyValue === "USD") {
        BTC = transferUSD(value, "BTC", currency);
        ETH = transferUSD(value, "ETH", currency);
        TKNinitialValue = transferToTKN(value, TSR_ETH);
        bonus = checkBonus(TKNinitialValue, bonusList);
        TSRvalue = transferToTKNbonus(value, bonus.bonusTSR, TSR_ETH);
        USD = value;

    } else if (currencyValue === "ETH") {

        USD = transferETH(value, "USD", currency);
        BTC = transferETH(value, "BTC", currency);
        TKNinitialValue = transferToTKN(value, TSR_PRICE);
        bonus = checkBonus(TKNinitialValue, bonusList);
        TSRvalue = transferToTKNbonus(USD, bonus.bonusTSR, TSR_ETH);
        ETH = value;

    } else if (currencyValue === "BTC") {
        USD = transferBTC(value, "USD", currency);
        ETH = transferBTC(value, "ETH", currency);
        TKNinitialValue = transferToTKN(USD, TSR_ETH);
        bonus = checkBonus(TKNinitialValue, bonusList);
        TSRvalue = transferToTKNbonus(USD, bonus.bonusTSR, TSR_ETH);
        BTC = value;
    }

    const progressBar = handleProgressBar(TSRvalue, bonusList);
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
}

export const calcToken = (value, currencyValue, bonusList, currency, TKN_PRICE) => {
    const { bonus, bonusTSR } = checkBonus(value, bonusList);
    const bonusValue = bonusCalc(value, bonusTSR);
    const { USD, BTC, ETH, TSR } = transferTKN(value, bonusValue, currency, TKN_PRICE);
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
}
const handleProgressBar = (value, bonus) => {
    const percent = ((value * 100) / bonus[bonus.length - 1]["limit"]);
    const isMaximum = checkMaximum(percent);
    return {
        isMaximum,
        percent
    };
}
const transferTKN = (value, bonusValue, currency, TKN_PRICE) => {
    const TSR_ETH = TKNprice("ETH", TKN_PRICE, currency);
    const USD = TSR_ETH *  value;
    const BTC = (TSR_ETH / currency[0].price_usd) * value;
    const ETH = (TSR_ETH / currency[1].price_usd) * value;
    return { USD, BTC, ETH, TSR: bonusValue }
}