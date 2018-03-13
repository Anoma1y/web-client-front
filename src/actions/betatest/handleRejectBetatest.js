import {
    changeSuccessBetatest,
    changeModalBeta,
    changeBetaTestError
} from 'actions/betatest';

export const handleRejectBetatest = () => {
    return dispatch => {
        dispatch(changeSuccessBetatest(false));
        dispatch(changeBetaTestError("Please choose at least one OS platform"));
        dispatch(changeModalBeta(true));
    }
};
