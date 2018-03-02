import {
    changeSuccessBetatest,
    changeModalBeta
} from 'actions/betatest';

export const handleRejectBetatest = () => {
    return dispatch => {
        dispatch(changeSuccessBetatest(false));
        dispatch(changeModalBeta(true));
    }
};
