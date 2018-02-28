import ApplicationLib from 'libs/ApiLib/ApplicationLib'
import {addRequestItem} from 'actions/request/addRequestItem'

export const handleApplication = value => {
    return (dispatch, getState) => {
        ApplicationLib.addApplication(value).then((data) => {
            const items = getState().requests.items;
            dispatch(addRequestItem([ data.data, ...items ]));
        }).catch((err) => {
            console.log(err);
        })
    }
};
