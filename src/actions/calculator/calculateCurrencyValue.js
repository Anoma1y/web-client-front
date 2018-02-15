import { changeTransferData } from "actions/calculator/changeTransferData";

const calculateCurrencyValue = (value) => {
    return dispatch => {
        dispatch(changeTransferData(value))
    }
};
