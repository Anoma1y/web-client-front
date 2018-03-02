import ApplicationLib from 'libs/ApiLib/ApplicationLib'
import { addRequestItem } from 'actions/request/addRequestItem'
import {
    changeModalSuccessful,
    changeQuerySuccessful,
    changeComments
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
        ApplicationLib.addApplication(dataOrder).then((data) => {
            dispatch(changeModalSuccessful(true));
            dispatch(changeQuerySuccessful(true));
            dispatch(addRequestItem([ data.data, ...requests.items ]));
            dispatch(changeComments(""));
        }).catch(() => {
            dispatch(changeModalSuccessful(true));
            dispatch(changeQuerySuccessful(false));
        })
    }
};
