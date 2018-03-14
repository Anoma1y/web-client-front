import { CHANGE_SETTINGS_DOCUMENT_ENTITY_COMPANY } from './types';

export const changeDocumentEntityCompany = value => ({
    type: CHANGE_SETTINGS_DOCUMENT_ENTITY_COMPANY,
    payload: value
});
