import { combineReducers } from 'redux';

const rootReducer = (state = {
    token: null,
    userId: '',
    error: null
}, action) => {
    switch (action.type) {
        case 'GET_USER_DATA':
            return { ...state, token: action.token, userId: action.userId };
        case 'SAVE_USER_DATA':
            return { ...state, token: action.token, userId: action.userId };
        case 'REMOVE_USER_DATA':
            return { ...state, token: action.token, userId: action.userId };
        case 'ERROR':
            return { ...state, error: action.error };
        default:
            return state;
    }
};

export default combineReducers({
    data: rootReducer
});