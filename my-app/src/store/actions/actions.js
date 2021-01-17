export const createUser = (values) => {
    fetch('https://prozorro.mavinx.com/api/test/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    }).then(() => alert('Аккаунт успешно создан!'))
        .catch(() => alert('Аккаунт не был создан!'))
}

export const LOGIN_USER = 'LOGIN_USER'
export const loginUser = (values) => (dispatch) => {
    const user = {
        email: values.email,
        password: values.password,
    }
    fetch('https://prozorro.mavinx.com/api/test/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then((res) => res.json())
        .then((data) => {
            if(data.status === false){
                alert('Неправильный логин или пароль!');
                dispatch({type: SET_TOKEN_BOOLEAN, payload: false});
            }else{
                localStorage.setItem('token', data.token);
                dispatch({type: LOGIN_USER, payload: data});
            }
        }).catch(() => alert('Неправильный логин или пароль!'));
}

export const LOGOUT_USER = 'LOGOUT_USER'
export const logoutUser = (token) => (dispatch) => {
    fetch('https://prozorro.mavinx.com/api/test/logout',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }).then(() => {
        localStorage.setItem('token', '');
        dispatch({type: LOGOUT_USER, payload: false});
    })
}

export const UPDATE_USER_DATA = 'UPDATE_USER_DATA'
export const updateUser = (values, token) => (dispatch) => {
    fetch('https://prozorro.mavinx.com/api/test/edit-user',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(values),
    }).then((res) => res.json())
        .then((data) => dispatch({type: UPDATE_USER_DATA, payload: data}))
}

export const SET_TOKEN_BOOLEAN = 'SET_TOKEN_BOOLEAN'
export const setTokenBoolean = () => {
    let token = localStorage.getItem('token');
    if(token === null || token === ''){
        return ({type: SET_TOKEN_BOOLEAN, payload: false});
    }else{
        return ({type: SET_TOKEN_BOOLEAN, payload: true});
    }
}

export const FETCH_DATA = 'FETCH_DATA'
export const fetchData = () => (dispatch) => {
    let token = localStorage.getItem('token');
    fetch('https://prozorro.mavinx.com/api/get-user',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }).then((res) => res.json())
        .then((data) => dispatch({type: FETCH_DATA, payload: data}))
}