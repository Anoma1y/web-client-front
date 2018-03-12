import { changeAdminCurrentCurrency } from './changeAdminCurrentCurrency'
import { changeAdminCurrencyValue } from './changeAdminCurrencyValue'

export const handleAdminCurrentCurrency = currency => {
    return (dispatch, getState) => {
        const { admin } = getState();
        dispatch(changeAdminCurrentCurrency(currency));
        dispatch(changeAdminCurrencyValue(admin.transferData[currency]));
    }
};
