import ApplicationLib from 'libs/ApiLib/ApplicationLib';
import { addRequestItem } from 'actions/request/addRequestItem';
import {
    changeModalSuccessful,
    changeQuerySuccessful,
    changeComments,
    changeApplicationError
} from 'actions/calculator';

export const handleApplication = () => {
    return (dispatch, getState) => {
        const {
            calculator,
            requests,
            user
        } = getState();
        const {
            jwt: TOKEN,
            isIdentification
        } = user;
        const dataOrder = {
            currency: `${calculator.order.fixCurrency}/${calculator.order.forCurrency}`,
            amount: Number(calculator.order.amount),
            comments: calculator.comments,
            token: TOKEN
        };
        ApplicationLib.getApplication(TOKEN).then((data) => {
            if (isIdentification === true) {
                if (data.length < 10) {
                    ApplicationLib.addApplication(dataOrder).then((data) => {
                        dispatch(changeModalSuccessful(true));
                        dispatch(changeQuerySuccessful(true));
                        dispatch(addRequestItem([
                            data.data,
                            ...requests.items
                        ]));
                        if (calculator.comments.length !== 0) {
                            dispatch(changeComments(""));
                        }
                        dispatch(changeApplicationError(null));
                    }).catch(() => {
                        dispatch(changeApplicationError("Error"));
                        dispatch(changeModalSuccessful(true));
                        dispatch(changeQuerySuccessful(false));
                    })
                } else {
                    dispatch(changeApplicationError("To proceed please contact us"));
                    dispatch(changeModalSuccessful(true));
                    dispatch(changeQuerySuccessful(false));
                }
            } else {
                dispatch(changeApplicationError("You are not verified"));
                dispatch(changeModalSuccessful(true));
                dispatch(changeQuerySuccessful(false));
            }

        })
    }
};
