import { CHANGE_SEND_APPLICATION_IN_PROGRESS } from './types';

export const changeSendApplicationInProgress = value => ({
   type: CHANGE_SEND_APPLICATION_IN_PROGRESS,
   payload: value 
});