import ApplicationLib from 'libs/ApiLib/ApplicationLib'
import { addRequestItem } from 'actions/request/addRequestItem'
import {
    changeModalSuccessful,
    changeComments
} from 'actions/calculator';

export const handleApplication = value => {
    return (dispatch, getState) => {
        ApplicationLib.addApplication(value).then((data) => {
            const items = getState().requests.items;
            dispatch(changeModalSuccessful(true));
            dispatch(addRequestItem([ data.data, ...items ]));
            dispatch(changeComments(""));
        }).catch((err) => {
            console.log(err);
        })
    }
};
