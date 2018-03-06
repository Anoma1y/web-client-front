import {
    ADD_APPLICATION,
    ADD_USERS
} from 'actions/admin/types'

const INITIAL_STATE = {
    usersList: [],
    applicationList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USERS:
            return { ...state, usersList: action.payload };
        case ADD_APPLICATION:
            return { ...state, applicationList: action.payload };
        default:
            return state;
    }
}