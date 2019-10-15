import AsyncStorage from '@react-native-community/async-storage';

export const getData = (data) => ({
    type: 'GET_USER_DATA',
    token: JSON.parse(data).token,
    userId: JSON.parse(data).userId
});

export const saveData = data => ({
    type: 'SAVE_USER_DATA',
    token: data.token,
    userId: data.userId
});

export const removeData = () => ({
    type: 'REMOVE_USER_DATA',
    token: null,
    userId: ''
});

export const error = error => ({
    type: 'ERROR',
    error,
});



export const getUserData = () => dispatch => 
 AsyncStorage.getItem('userData')
        .then((data) => {
            dispatch(getData(data));
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        })

export const saveUserData = (data) => dispatch =>
    AsyncStorage.setItem('userData', JSON.stringify(data))
        .then(() => {
            dispatch(saveData(data));
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserData = () => dispatch =>
    AsyncStorage.removeItem('userData')
        .then(() => {
            dispatch(removeData());
        })
        .catch((err) => {
            dispatch(error(err.message || 'ERROR'));
        })