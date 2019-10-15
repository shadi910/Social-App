import AsyncStorage from '@react-native-community/async-storage';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token: token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token: token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
    token: null
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});



export const getUserToken = () => dispatch => 
 AsyncStorage.getItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })



export const saveUserToken = (data) => dispatch =>
    AsyncStorage.setItem('userToken', data)
        .then(() => {
            dispatch(loading(false));
            dispatch(saveToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then(() => {
            dispatch(loading(false));
            dispatch(removeToken());
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })