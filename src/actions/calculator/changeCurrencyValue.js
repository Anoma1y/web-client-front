import { changeCurrentCurrency } from './changeCurrentCurrency'
import { changeSumValue } from './changeSumValue'

export const changeCurrencyValue = currency => {
    return (dispatch, getState) => {
        const { calculator } = getState();
        dispatch(changeCurrentCurrency(currency));
        dispatch(changeSumValue(Number(calculator.transferData[currency])));
    }
};
