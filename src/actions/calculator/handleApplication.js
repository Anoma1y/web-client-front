import ApplicationLib from 'libs/ApiLib/ApplicationLib';
import { addRequestItem } from 'actions/request/addRequestItem';
import {
    changeModalSuccessful,
    changeQuerySuccessful,
    changeComments,
    changeApplicationError,
    changeSendApplicationInProgress
} from 'actions/calculator';
import { CALCULATOR } from 'libs/messages';

export const handleApplication = () => {
    return (dispatch, getState) => {
        const {
            calculator,
            requests,
            user
        } = getState();
        const {
            jwt: TOKEN
        } = user;
        const dataOrder = {
            currency: `${calculator.order.fixCurrency}/${calculator.order.forCurrency}`,
            amount: Number(calculator.order.amount),
            comments: calculator.comments,
            token: TOKEN
        };
        if (calculator.applicationSendInProgress === false) {
            dispatch(changeSendApplicationInProgress(true));
            ApplicationLib.getApplication(TOKEN).then((data) => {
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
                        dispatch(changeSendApplicationInProgress(false));
                        dispatch(changeApplicationError(null));
                    }).catch(() => {
                        dispatch(changeApplicationError("Error"));
                        dispatch(changeModalSuccessful(true));
                        dispatch(changeQuerySuccessful(false));
                        dispatch(changeSendApplicationInProgress(false));
                    })
                } else {
                    dispatch(changeApplicationError(CALCULATOR.APPLICATION_LIMIT));
                    dispatch(changeModalSuccessful(true));
                    dispatch(changeQuerySuccessful(false));
                    dispatch(changeSendApplicationInProgress(false));
                }
            })
        }

    }
};
