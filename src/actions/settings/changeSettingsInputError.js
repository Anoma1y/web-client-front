import { CHANGE_SETTINGS_INPUT_ERROR } from './types';

export const changeSettingsInputError = value => ({
   type: CHANGE_SETTINGS_INPUT_ERROR,
   payload: value 
});