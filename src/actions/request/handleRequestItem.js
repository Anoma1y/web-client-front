import ApplicationLib from 'libs/ApiLib/ApplicationLib';
import { addRequestItem } from './addRequestItem';

export const handleRequestItem = () => {
    return dispatch => {
        const { jwt: TOKEN } = localStorage;
        ApplicationLib.getApplication(TOKEN).then((data) => {
            dispatch(addRequestItem(data.reverse()));
        }).catch(() =>{
            dispatch(addRequestItem([]));
        })
    }
};
