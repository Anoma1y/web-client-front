import { CHECK_APPEND_TEXT } from './types';

const checkAppendText = value => ({
    type: CHECK_APPEND_TEXT,
    payload: value
})
export default checkAppendText;

