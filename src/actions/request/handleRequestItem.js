import ApplicationLib from 'libs/ApiLib/ApplicationLib';
import { addRequestItem } from './addRequestItem';
import _ from 'underscore';

export const handleRequestItem = () => {
    return dispatch => {
        const { jwt: TOKEN } = localStorage;
        ApplicationLib.getApplication(TOKEN).then((data) => {
            dispatch(addRequestItem(_.sortBy(data, function(node) {
                return -(new Date(node.CreatedAt).getTime());
            })));
        }).catch(() =>{
            dispatch(addRequestItem([]));
        })
    }
};
