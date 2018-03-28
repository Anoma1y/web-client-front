import { changeModalOpen } from './changeModalOpen';
import { changeOrder } from './changeOrder';

export const handleFormOrder = () => {
    return (dispatch, getState) => {
        const {
            currencyValue,
            tokenValue
        } = getState().calculator;
        dispatch(changeOrder({
            fixCurrency: "TSR",
            forCurrency: currencyValue,
            amount: tokenValue
        }));
        dispatch(changeModalOpen(true));
    }
};
