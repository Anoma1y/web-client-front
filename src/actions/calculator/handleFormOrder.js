import { changeModalOpen } from './changeModalOpen';
import { changeOrder } from './changeOrder';

export const handleFormOrder = () => {
    return (dispatch, getState) => {
        const {
            currencyValue,
            tokenValue
        } = getState().calculator;
        const newOrder = {
            fixCurrency: "TSR",
            forCurrency: currencyValue,
            amount: tokenValue
        };
        dispatch(changeOrder(newOrder));
        dispatch(changeModalOpen(true));
    }
};
