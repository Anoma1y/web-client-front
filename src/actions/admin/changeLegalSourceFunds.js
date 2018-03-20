import { CHANGE_LEGAL_SOURCE_FUNDS } from './types';

export const changeLegalSourceFunds = value => ({
    type: CHANGE_LEGAL_SOURCE_FUNDS,
    payload: value
});
