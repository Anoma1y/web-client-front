import ApplicationLib from 'libs/ApiLib/ApplicationLib';
import { addRequestItem } from './addRequestItem';
import _ from 'underscore';

export const handleRequestItem = () => {
    return (dispatch, getState) => {
        const { jwt: TOKEN } = localStorage;
        const { jwt: TOKEN_REDUX } = getState().user;
        ApplicationLib.getApplication(TOKEN || TOKEN_REDUX).then((data) => {
            dispatch(
                addRequestItem( 
                    _.sortBy(data, node => -(new Date(node.CreatedAt).getTime())) 
                )
            );
        }).catch(() => dispatch(addRequestItem([])));
    }
};
