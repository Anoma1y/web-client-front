import ApplicationLib from 'libs/ApiLib/ApplicationLib';
import { addRequestItem } from './addRequestItem';

export const handleRequestItem = value => {
    return dispatch => {
        ApplicationLib.getApplication(value).then((data) => {
            dispatch(addRequestItem(data.reverse()));
        }).catch(() =>{
            dispatch(addRequestItem([]));
        })
    }
};
