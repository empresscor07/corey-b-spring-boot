import {createUser, requestLogin} from "../services/User";
import {initiateGetEvents} from "./eventMod";
import {initiateGetAnsweredInvites, initiateGetNewInvites} from "./inviteModule";

// Actions
const LOGIN_REQUEST = 'user/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'user/LOGIN_FAILURE'

const CREATE_USER_REQUEST = 'user/CREATE_USER_REQUEST'
const CREATE_USER_SUCCESS = 'user/CREATE_USER_SUCCESS'
const CREATE_USER_FAILURE = 'user/CREATE_USER_FAILURE'

const LOGOUT = 'user/LOGOUT'

// Reducer
const initialState = {
    loginPending: false,
    loginFailure: false,
    isLoggedIn: false,
    createUserPending: false,
    createUserFailure: false,
    userName: ''
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loginPending: true,
                loginFailure: false,
                isLoggedIn: false
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginPending: false,
                loginFailure: false,
                isLoggedIn: true,
                postImageFileFailure: false,
                userName: action.userName
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                loginPending: false,
                loginFailure: true,
                isLoggedIn: false
            }

        case CREATE_USER_REQUEST:
            return {
                // deconstruct state
                ...state,
                // set one value to true
                createUserPending: true,
                createUserFailure: false
            };

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserPending: false,
                createUserFailure: false,
            };

        case CREATE_USER_FAILURE:
            return {
                ...state,
                createUserPending: false,
                createUserFailure: true
            };

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }

        default:
            return state
    }
}

// Action Creators
export function loginRequest() {
    return {type: LOGIN_REQUEST}
}

export function loginSuccess(userName) {
    return {
        type: LOGIN_SUCCESS,
        userName: userName
    }
}

export function loginFailure() {
    return {type: LOGIN_FAILURE}
}

export function createUserRequest() {
    return {type: CREATE_USER_REQUEST}
}

export function createUserSuccess() {
    return {type: CREATE_USER_SUCCESS}
}

export function createUserFailure() {
    return {type: CREATE_USER_FAILURE}
}

export function logout() {
    return {type: LOGOUT}
}

// Side Effects
export function initiateLogin(credentials) {
    console.log(credentials)
    return function login(dispatch) {
        dispatch(loginRequest())
        requestLogin(credentials).then(response => {
            if (!response.ok) {
                dispatch(loginFailure())
                return
            }
            console.log(response);
            dispatch(loginSuccess(credentials.username))
            dispatch(initiateGetEvents())
            dispatch(initiateGetNewInvites())
            dispatch(initiateGetAnsweredInvites())
        }, () => dispatch(loginFailure()))
    }
}

export function initiateRegister(credentials) {
    return function register(dispatch) {
        dispatch(createUserRequest())
        createUser(credentials).then(response => {
            if (!response.ok) {
                dispatch(createUserFailure())
                return
            }
            dispatch(createUserSuccess())
            dispatch(initiateLogin(credentials))
        })
    }
}