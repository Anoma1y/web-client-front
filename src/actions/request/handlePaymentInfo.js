import {
    initialPayInfo,
    isLoadingPaymentInfo
} from './';
import PayLib from 'libs/ApiLib/PayLib';


export const handlePaymentInfo = APPLICATION_ID => {
    return dispatch => {
        dispatch(isLoadingPaymentInfo(true));
        PayLib.getPaymentData(APPLICATION_ID).then(data => {
            dispatch(initialPayInfo(data));
            dispatch(isLoadingPaymentInfo(false));
        }).catch(err => {
            console.log(err);
            dispatch(isLoadingPaymentInfo(false));
        });
    }
};
