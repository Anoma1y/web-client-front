import {
    ADD_APPLICATION,
    ADD_USERS,
    SORTED_USERS,
    SORTED_APPLICATIONS
} from 'actions/admin/types';

const INITIAL_STATE = {
    usersList: {
        data: [],
        column: null,
        direction: 'descending'
    },
    applicationList: {
        data: [],
        column: null,
        direction: 'descending'
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USERS:
            return { ...state, usersList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case ADD_APPLICATION:
            return { ...state, applicationList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case SORTED_USERS:
            return { ...state, usersList: action.payload };
        case SORTED_APPLICATIONS:
            return { ...state, applicationList: action.payload };
        default:
            return state;
    }
}