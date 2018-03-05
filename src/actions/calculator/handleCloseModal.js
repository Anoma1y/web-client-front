import {
    changeModalOpen,
    changeModalSuccessful,
    changeApplicationError
} from 'actions/calculator';

export const handleCloseModal = () => {
    return dispatch => {
        dispatch(changeApplicationError(null));
        dispatch(changeModalOpen(false));
        dispatch(changeModalSuccessful(false));
    }
};
