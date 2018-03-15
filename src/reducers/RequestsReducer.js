import { ADD_REQUEST_ITEM } from 'actions/request/types';

const INITIAL_STATE = {
    items: [],
    bonus: [
        {
            value: 2.5,
            limit: 100000,
            active: false
        },{
            value: 5,
            limit: 500000,
            active: false
        },{
            value: 10,
            limit: 1000000,
            active: false
        },{
            value: 15,
            limit: 2000000,
            active: false
        }
    ],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_REQUEST_ITEM:
            return { ...state, items: action.payload};
        default:
            return state
    }
}