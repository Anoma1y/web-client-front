import Subscribe from 'libs/ApiLib/Subscribe';
import {
    changeSuccessBetatest,
    changeAppleChecked,
    changeAndroidChecked,
    changeModalBeta,
    changeBetaTestError
} from 'actions/betatest';
import { BETATEST } from 'libs/messages'

export const handleSubscribeToBetaTest = () => {
    return (dispatch, getState) => {
        const {
            androidChecked: android,
            appleChecked: ios
        } = getState().betatest;
        const {
            email
        } = getState().user;
        Subscribe.subscribeToBetaTest(email, android, ios).then((data) => {
            if (data.data.status === 400) {
                dispatch(changeSuccessBetatest(false));
                dispatch(changeBetaTestError(BETATEST.ALREADY_SUBSCRIBE));
            } else if (data.data.status === 'subscribed'){
                dispatch(changeSuccessBetatest(true));
                dispatch(changeBetaTestError(''));
            }
            dispatch(changeAppleChecked(false));
            dispatch(changeAndroidChecked(false));
            dispatch(changeModalBeta(true));
        }).catch(() => {
            dispatch(changeSuccessBetatest(false));
            dispatch(changeBetaTestError('Error'));
            dispatch(changeModalBeta(true));
        })
    }
};
