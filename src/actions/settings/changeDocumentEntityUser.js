import { CHANGE_SETTINGS_DOCUMENT_ENTITY_USER } from './types';

export const changeDocumentEntityUser = value => ({
    type: CHANGE_SETTINGS_DOCUMENT_ENTITY_USER,
    payload: value
});
