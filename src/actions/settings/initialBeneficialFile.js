import { SETTINGS_INITIAL_BENEFICIAL_FILE } from './types';

export const initialBeneficialFile = value => ({
    type: SETTINGS_INITIAL_BENEFICIAL_FILE,
    payload: value
});
