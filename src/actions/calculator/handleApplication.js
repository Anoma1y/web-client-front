import ApplicationLib from 'libs/ApiLib/ApplicationLib'
import { addRequestItem } from 'actions/request/addRequestItem'
import {
    changeModalSuccessful,
    changeQuerySuccessful,
    changeComments,
    changeApplicationError
} from 'actions/calculator';

export const handleApplication = () => {
    return (dispatch, getState) => {
        const { calculator, requests, user } = getState();
        const dataOrder = {
            currency: `${calculator.order.fixCurrency}/${calculator.order.forCurrency}`,
            amount: Number(calculator.order.amount),
            comments: calculator.comments,
            token: user.jwt
        }
        ApplicationLib.getApplication(user.jwt).then((data) => {
            if (data.length < 10) {
                ApplicationLib.addApplication(dataOrder).then((data) => {
                    dispatch(changeModalSuccessful(true));
                    dispatch(changeQuerySuccessful(true));
                    dispatch(addRequestItem([ data.data, ...requests.items ]));
                    dispatch(changeComments(""));
                    dispatch(changeApplicationError(null));
                }).catch(() => {
                    dispatch(changeApplicationError("Ошибка"));
                    dispatch(changeModalSuccessful(true));
                    dispatch(changeQuerySuccessful(false));
                })
            } else {
                dispatch(changeApplicationError("To proceed please contact us"));
                dispatch(changeModalSuccessful(true));
                dispatch(changeQuerySuccessful(false));
            }
        })
    }
};
