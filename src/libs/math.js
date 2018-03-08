//Функция для преобразования строки в удобночитаемый формат
export const separationValue = (value, digits) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);

//Функция для расчета бонусного значения при вводе токена
//Принимает 2 параметра: value - текущее значения вводимое пользователем в Input-токены, bonus - процент бонуса
//Возвращает значение токена с бонусным значением
export const bonusCalc = (value, bonus) => (1 * value)  + ((1 * value) * (bonus / 100));

//Функция для проверки наличия бонусного значения скидки
//Принимает 3 параметра: value - значение текущего кол-ва токенов, currency - отношение фиксированной цены к изменяемой
//bonus - список бонусов при достижении лимита
//Если достигает текущего лимита для определенных бонусов, то возвращает true значение (активированный бонус
//Возвращает объект бонусов и бонусного процента
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

//Функция для расчета значений в заявках
//Принимает 5 параметров: FIXED_AMOUNT (Number) - кол-во валюты, в которой была зафиксирована покупка токенов
//CURRENCY (String) - отношение зафиксированной валюты к оплачеваемой. TSR_INITIAL_VALUE (Integer) - начальное значение токена
//CRYPTO_CURRENCY (Array-Object) - курс криптовалюты, BONUS_LIST (Array Object) - список бонусов при достижении значений токена
//Возвращает объект значений: CURRENCYVALUE - стоимость валюты, TOKENVALUE - стоимость токена
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
        CURRENCYVALUE = `$ ${separationValue(FIXED_AMOUNT * (CRYPTO_CURRENCY[1].price_usd * TSR_INITIAL_VALUE), 4)}`;
        TOKENVALUE = separationValue(bonusCalc(FIXED_AMOUNT, percent), 4);
    }

    else if (CURRENCY[0] === "USD" && CURRENCY[1] === "TSR") {
        const USDTOKEN = FIXED_AMOUNT / (CRYPTO_CURRENCY[1].price_usd * TSR_INITIAL_VALUE);
        percent = checkPercent(USDTOKEN, CURRENCY, BONUS_LIST);
        TOKENVALUE = separationValue(bonusCalc(USDTOKEN, percent), 4);
        CURRENCYVALUE = `$ ${separationValue(FIXED_AMOUNT, 2)}`;
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



//Функция для проверки достижения максимум бонусов
//Принимает 1 значение: value - процент заполнения прогресс бара
//Зависящий от максимального количества токена и вводимого пользователем
export const checkMaximum = value => value >= 100;


//Функция для расчета бонуса от токена, принимает 3 значения: value - текущее значение вводимое пользователем в Input-валюты
//bonusTKN - бонусное значение токена, TKN - стоимость токена
//Возвращает значение токена с бонусом
//Функция добавляет значение в общее количество токенов
export const transferToTKNbonus = (value, bonusTKN, TSR) => (value / TSR) + ((value / TSR) * (bonusTKN / 100));

//Функция для расчета текущего значения токена из вводимой валюты
//Принимает 2 параметра: value - значения, вводимое пользователем в Input-валюты
//TKN - стоимость токена
//Возвращает целое цифровое значение токена
export const transferToTKN = (value, TSR) => value / TSR;

//Функция для проверки наличия бонусного значения скидки
//Принимает 1 параметр: value - значение текущего кол-ва токенов
//Если достигает текущего лимита для определенных бонусов, то возвращает true значение (активированный бонус
//Возвращает объект бонусов и бонусного процента
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

//Функция для расчета валюты
//Принимает 2 параметра: value - текущее значение выбранной валюты
//type - тип валюты для расчета
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

//Функция для расчета валюты
//Принимает 2 параметра: value - текущее значение выбранной валюты
//type - тип валюты для расчета
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

//Функция для расчета валюты
//Принимает 2 параметра: value - текущее значение выбранной валюты
//type - тип валюты для расчета
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

//Функция для расчета стоимость ТОКЕНА
//Принимает 1 параметр: type - тип криптовалюты,
//Возвращает расчетную стоимость токена, если тип не передан, то вернет токен без расчетов
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