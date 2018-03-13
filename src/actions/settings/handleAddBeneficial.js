import { incrementBeneficialID } from 'actions/settings';
import { addBeneficial } from 'actions/settings';

export const handleAddBeneficial = () => {
    return (dispatch, getState) => {
        let {
            idBeneficial,
            maxBeneficial
        } = getState().settings;
        if (idBeneficial < (maxBeneficial - 1)) {
            idBeneficial++;
            dispatch(incrementBeneficialID(idBeneficial));
            dispatch(addBeneficial(idBeneficial));
        }
    }
}