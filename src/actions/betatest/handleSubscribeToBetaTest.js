import Subscribe from 'libs/ApiLib/Subscribe'
import {
    changeSuccessBetatest,
    changeAppleChecked,
    changeAndroidChecked
} from 'actions/betatest';
export const handleSubscribeToBetaTest = () => {
    return (dispatch, getState) => {
        const {
            androidChecked: android,
            appleChecked: ios
        } = getState().betatest;
        Subscribe.subscribeToBetaTest(android, ios).then(() => {
            dispatch(changeAppleChecked(false));
            dispatch(changeAndroidChecked(false));
            dispatch(changeSuccessBetatest(true));
        }).catch((err) => {
            console.log(err);
        })
        //TODO need check current beta test user
    }
};
