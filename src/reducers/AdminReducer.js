import * as C from 'actions/admin/types';

const INITIAL_STATE = {
    usersList: {
        data: [],
        column: null,
        direction: 'descending'
    },
    deleteUsers: [],
    deleteApplications: [],
    userRole: null,
    applicationStatus: null,
    applicationList: {
        data: [],
        column: null,
        direction: 'descending'
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case C.ADD_USERS:
            return { ...state, usersList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case C.ADD_APPLICATION:
            return { ...state, applicationList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case C.SORTED_USERS:
            return { ...state, usersList: action.payload };
        case C.SORTED_APPLICATIONS:
            return { ...state, applicationList: action.payload };
        case C.CHANGE_DELETE_USERS:
            return { ...state, deleteUsers: action.payload };
        case C.CHANGE_DELETE_APPLICATIONS:
            return { ...state, deleteApplications: action.payload };
        case C.CHANGE_USER_ROLE:
            return { ...state, userRole: action.payload };
        case C.CHANGE_APPLICATION_STATUS:
            return { ...state, applicationStatus: action.payload };
        default:
            return state;
    }
}