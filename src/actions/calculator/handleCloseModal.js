import {
    changeModalOpen,
    changeModalSuccessful
} from 'actions/calculator';

export const handleCloseModal = () => {
    return dispatch => {
        dispatch(changeModalOpen(false));
        dispatch(changeModalSuccessful(false));
    }
};
