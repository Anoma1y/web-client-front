import { SET_SETTINGS_UPLOAD_PROGRESS } from './types';

export const setUploadInProgress = value => ({
    type: SET_SETTINGS_UPLOAD_PROGRESS,
    payload: value
});
