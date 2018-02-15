/*
calculateCurrencyValue: payload => {
    const calculateCurrencyValueAction = () => {
        return dispatch => {
            dispatch(changeTransferData(payload));
        }
    }
    dispatch(calculateCurrencyValueAction())
}
*/

import { changeTransferData } from "actions/calculator/changeTransferData";


const calculateCurrencyValue = (value) => {
    return (dispatch, getState) => {
        dispatch(changeTransferData(value))
    }
};
