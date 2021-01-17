import { UPDATE_USER_DATA, LOGIN_USER, SET_TOKEN_BOOLEAN, LOGOUT_USER, FETCH_DATA } from '../actions/actions'

const initialState = {
    data: {},
    tokenBoolean: false,
}

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case UPDATE_USER_DATA: return {...state, data: payload}

        case LOGIN_USER: return {...state, data: payload.user, tokenBoolean: true}

        case SET_TOKEN_BOOLEAN: return {...state, tokenBoolean: payload}

        case LOGOUT_USER: return {...state, tokenBoolean: payload}

        case FETCH_DATA: return {...state, data: payload.user}

        default: return state
    }
}