import {login, register} from "../services/User";
import {initiateGetEvents} from "./eventMod";
import {initiateGetNewInvites, initiateGetAnsweredInvites} from "./inviteModule";

const LOGIN_PENDING = 'calendar/user/LOGIN_PENDING'
const LOGIN_SUCCESS = 'calendar/user/LOGIN_SUCCESS' //backend initiated
const LOGIN_FAILURE = 'calendar/user/LOGIN_FAILURE' //backend initiated
const LOGOUT = 'calendar/user/LOGOUT' //user side initiated

const CREATE_USER_PENDING = 'calendar/user/CREATE_USER_PENDING'
const CREATE_USER_SUCCESS = 'calendar/user/CREATE_USER_SUCCESS'
const CREATE_USER_FAILURE = 'calendar/user/CREATE_USER_FAILURE'


let users = [
    {
        username: 'Corey',
        password: 'my_pass'
    },
    {
        username: 'Kyla',
        password: 'my_pass'
    }
]

const initialState = {
    users: users,
    userName: '',
    isLoggedIn: false,
    loginFailure: false,
    createUserFailed: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_PENDING:
            return {
                ...state,
                isLoggedIn: false,
                loginFailure: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginFailure: false,
                userName: action.userName

            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loginFailure: true
            };

        case CREATE_USER_PENDING:
            return {
                ...state,
                createUserFailed: false,
            }

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                createUserFailed: false,
                users: action.users
            };

        case CREATE_USER_FAILURE:
            console.log('Create User Failed')
            return {
                ...state,
                createUserFailed: true
            };

        case LOGOUT:
            console.log('Logged Out')
            return {
                ...state,
                isLoggedIn: false,
                userName: action.userName
            };

        default:
            return state;
    }
}

// Action Creators

export function loginPending() {
    return {type: LOGIN_PENDING}
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

export function createUserPending() {
    return {type: CREATE_USER_PENDING}
}

export function createUserSuccess(user, usersList) {
    console.log(user.username)

    return {
        type: CREATE_USER_SUCCESS,
        users: [...usersList, user]
    }
}

export function createUserFailure() {
    return {type: CREATE_USER_FAILURE}
}

export function logout() {
    return {
        type: LOGOUT,
        userName: ''
    }
}

// Side Effects

export function initiateLogin(credentials) {
    return function loginDispatcher(dispatch, getState) {
        dispatch(loginPending())
        console.log(getState().user.users)
        login(credentials, getState().user.users).then(
            () => {
                dispatch(loginSuccess(credentials.username))
                dispatch(initiateGetEvents())
                dispatch(initiateGetNewInvites())
                console.log(('getting all invites'))
                dispatch(initiateGetAnsweredInvites())
            },
            () => dispatch(loginFailure())
        )
    }
}

export function initiateRegister(userInfo) {
    return function createUser(dispatch, getState) {
        dispatch(createUserPending())
        console.log(getState().user.users)
        register(userInfo, getState().user.users).then(
            () => {
                dispatch(createUserSuccess(userInfo, getState().user.users))
                dispatch(initiateLogin(userInfo))
            },
            () => dispatch(createUserFailure())
        )
    }
}