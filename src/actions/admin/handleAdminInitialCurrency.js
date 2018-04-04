// import { changeFixedCurrency } from "./changeFixedCurrency"
// import { changeAdminCurrentCurrency } from './changeAdminCurrentCurrency';
// import { changeAdminCurrencyValue } from './changeAdminCurrencyValue';
// import { changeAdminTokenValue } from './changeAdminTokenValue';
// import {
//     calcToken,
// } from 'libs/math';
//
// export const handleAdminInitialCurrency = value => {
//     return (dispatch)=> {
//         const {
//             AMOUNT,
//             CURRENT_CURRENCY,
//             CRYPTO_CURRENCY,
//             TKN_PRICE,
//             BONUS_LIST
//         } = value;
//         if (CURRENT_CURRENCY[0] === 'TSR') {
//             dispatch(changeAdminCurrentCurrency(CURRENT_CURRENCY[1]));
//             dispatch(changeFixedCurrency(`TSR/${CURRENT_CURRENCY[1]}`));
//             const { transferData } = calcToken(AMOUNT, CURRENT_CURRENCY[1], BONUS_LIST, CRYPTO_CURRENCY, TKN_PRICE);
//             dispatch(changeAdminCurrencyValue(0));
//             dispatch(changeAdminTokenValue(transferData.TSR));
//         } else if (CURRENT_CURRENCY[1] === 'TSR') {
//             dispatch(changeAdminCurrentCurrency(CURRENT_CURRENCY[0]));
//             dispatch(changeAdminCurrencyValue(AMOUNT));
//             dispatch(changeAdminTokenValue(0));
//             dispatch(changeFixedCurrency(`${CURRENT_CURRENCY[0]}/TSR`));
//         }
//     }
// }
import { changeAdminTransferData } from './changeAdminTransferData';
import { changeFixedCurrency } from "./changeFixedCurrency"
import { changeAdminCurrentCurrency } from './changeAdminCurrentCurrency';
import { changeAdminCurrencyValue } from './changeAdminCurrencyValue';
import {
    calcToken,
    calcCurrency
} from 'libs/math';

export const handleAdminInitialCurrency = value => {
    return (dispatch, getState)=> {
        const {
            AMOUNT,
            CURRENT_CURRENCY,
            CRYPTO_CURRENCY,
            TKN_PRICE,
            BONUS_LIST
        } = value;
        const { admin } = getState();
        if (CURRENT_CURRENCY[0] === 'TSR') {
            dispatch(changeAdminCurrentCurrency(CURRENT_CURRENCY[1]));
            dispatch(changeAdminCurrencyValue(admin.transferData[CURRENT_CURRENCY[1]]));
            dispatch(changeFixedCurrency(`TSR/${CURRENT_CURRENCY[1]}`));
            dispatch(changeAdminTransferData(calcToken(AMOUNT, CURRENT_CURRENCY[1], BONUS_LIST, CRYPTO_CURRENCY, TKN_PRICE)));
        } else if (CURRENT_CURRENCY[1] === 'TSR') {
            dispatch(changeAdminCurrentCurrency(CURRENT_CURRENCY[0]));
            dispatch(changeAdminCurrencyValue(admin.transferData[CURRENT_CURRENCY[0]]));
            dispatch(changeFixedCurrency(`${CURRENT_CURRENCY[0]}/TSR`));
            dispatch(changeAdminTransferData(calcCurrency(AMOUNT, CURRENT_CURRENCY[0], BONUS_LIST, CRYPTO_CURRENCY, TKN_PRICE)));
        }
    }
}