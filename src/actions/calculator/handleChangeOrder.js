import { changeOrder } from './changeOrder';

export const handleChangeOrder = value => {
    return dispatch => {
        const {
            fixCurrency,
            forCurrency,
            amount
        } = value;
        const newOrder = {
            fixCurrency,
            forCurrency,
            amount
        };
        dispatch(changeOrder(newOrder));
    }
};
