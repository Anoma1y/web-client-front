import { changeModalSuccessful } from './changeModalSuccessful';
import { changeOrder } from './changeOrder';

export const handleFormOrder = () => {
    return (dispatch, getState) => {
        const { currencyValue, transferData } = getState().calculator;
        const newOrder = {
            fixCurrency: "TSR",
            forCurrency: currencyValue,
            amount: transferData["TSR"]
        }
        dispatch(changeOrder(newOrder));
        dispatch(changeModalSuccessful(true));
    }
};
