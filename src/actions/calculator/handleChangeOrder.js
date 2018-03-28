import { changeOrder } from './changeOrder';

export const handleChangeOrder = value => {
    return dispatch => {
        const {
            fixCurrency,
            forCurrency,
            amount
        } = value;
        dispatch(changeOrder({
            fixCurrency,
            forCurrency,
            amount
        }));
    }
};
