import { CHANGE_SOURCE_FUNDS } from './types';

export const changeSourceFunds = value => ({
    type: CHANGE_SOURCE_FUNDS,
    payload: value
});
