import { CHANGE_SETTINGS_DOCUMENT_INDIVIDUAL_USER } from './types';

export const changeDocumentIndividualUser = value => ({
    type: CHANGE_SETTINGS_DOCUMENT_INDIVIDUAL_USER,
    payload: value
});
