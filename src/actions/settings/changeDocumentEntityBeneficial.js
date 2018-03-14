import { CHANGE_SETTINGS_DOCUMENT_ENTITY_BENEFICIAL } from './types';

export const changeDocumentEntityBeneficial = value => ({
    type: CHANGE_SETTINGS_DOCUMENT_ENTITY_BENEFICIAL,
    payload: value
});
