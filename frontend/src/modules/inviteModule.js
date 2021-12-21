import {getAnsweredInvites, getNewInvites, answerNewInvite} from "../services/invite";

const existingInvites = [
    {
        id: 0,
        eventId: 0,
        invitee: 'Kyla',
        attending: true

    },
    {
        id: 1,
        eventId: 1,
        invitee: 'Corey',
        attending: true
    },
    {
        id: 2,
        eventId: 0,
        invitee: 'Sam',
        attending: false

    }
]

const GET_NEW_INVITES_SUCCESS = 'calendar/invite/GET_NEW_INVITES_SUCCESS'
const GET_NEW_INVITES_FAILURE = 'calendar/invite/GET_NEW_INVITES_FAILURE'

const GET_ANSWERED_INVITES_SUCCESS = 'calendar/invite/GET_ANSWERED_INVITES_SUCCESS'
const GET_ANSWERED_INVITES_FAILURE = 'calendar/invite/GET_ANSWERED_INVITES_FAILURE'

const CREATE_NEW_ANSWERED_INVITE_SUCCESS = 'calendar/invite/CREATE_NEW_ANSWERED_INVITE_SUCCESS'
const CREATE_NEW_ANSWERED_INVITE_FAILURE = 'calendar/invite/CREATE_NEW_ANSWERED_INVITE_FAILURE'

//Reducer

const initialState = {
    newInvites: [],
    answeredInviteList: [],
    myAnsweredInvites: [],
    getInvitesFailed: false,
    getAnsweredInvitesFailed: false,
    createNewAnsweredInviteFailed: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_NEW_INVITES_SUCCESS:
            return {
                ...state,
                getInvitesFailed: false,
                newInvites: action.newInvites,
            };
        case GET_NEW_INVITES_FAILURE:
            return {
                ...state,
                getInvitesFailed: true
            };
        case GET_ANSWERED_INVITES_SUCCESS:
            return {
                ...state,
                getAnsweredInvitesFailed: false,
                myAnsweredInvites: action.myAnsweredInvites,
            };
        case GET_ANSWERED_INVITES_FAILURE:
            return {
                ...state,
                getAnsweredInvitesFailed: true
            };
        case CREATE_NEW_ANSWERED_INVITE_SUCCESS:
            return {
                ...state,
                createNewAnsweredInviteFailed: false,
                answeredInviteList: action.answeredInviteList
            }
        case CREATE_NEW_ANSWERED_INVITE_FAILURE:
            return {
                ...state,
                createNewAnsweredInviteFailed: true
            }
        default:
            return state;
    }
}

// Action Creators

export function getNewInvitesSuccess(newInvites) {
    console.log(newInvites)
    console.log('get new invites from event table success')
    return {
        type: GET_NEW_INVITES_SUCCESS,
        newInvites: newInvites
    }
}

export function getNewInvitesFailure() {
    return {type: GET_NEW_INVITES_FAILURE}
}

export function getAnsweredInvitesSuccess(myAnsweredInvites) {
    console.log(myAnsweredInvites)
    console.log('get answered invites from invite table success')
    return {
        type: GET_ANSWERED_INVITES_SUCCESS,
        myAnsweredInvites: myAnsweredInvites
    }
}

export function getAnsweredInvitesFailure() {
    return {type: GET_ANSWERED_INVITES_FAILURE}
}

export function createNewAnsweredInviteSuccess(updatedInvites) {
    return {
        type: CREATE_NEW_ANSWERED_INVITE_SUCCESS,
        answeredInviteList: updatedInvites
    }
}

export function createNewAnsweredInviteFailure() {
    return {type: CREATE_NEW_ANSWERED_INVITE_FAILURE}
}


// Side Effects
// Web apps need to execute complex logic,
// usually including asynchronous work such as making fetch requests.
// That code is no longer purely a function of its inputs,
// and the interactions with the outside world are known as “side effects”
// Redux is inspired by functional programming,
// and out of the box, has no place for side effects to be executed.
// In particular, reducer functions must always be pure functions of..;p-0 j9i8nbhyb9,6tynm
// (state, action) => newState. However, Redux's middleware makes it possible
// to intercept dispatched actions and add additional complex behavior around them,
// including side effects.

export function initiateGetNewInvites() {
    return function getNewInvitesDispatcher(dispatch, getState) {
        console.log(getState().user.userName)
        getNewInvites(getState().user.userName, getState().event.events).then(
            myNewInvitesList => dispatch(getNewInvitesSuccess(myNewInvitesList)),
            () => dispatch(getNewInvitesFailure())
        )
    }
}

export function initiateGetAnsweredInvites() {
    return function getAnsweredInvitesDispatcher(dispatch, getState) {
        console.log(getState().user.userName)
        getAnsweredInvites(getState().user.userName, getState().invite.answeredInviteList).then(
            myAnsweredInvitesList => dispatch(getAnsweredInvitesSuccess(myAnsweredInvitesList)),
            () => dispatch(getAnsweredInvitesFailure())
        )
    }
}

export function initiateCreateNewInviteAnswer(invite) {
    return function createInviteAnswerDispatcher(dispatch, getState) {
        answerNewInvite(invite, getState().invite.answeredInviteList).then(
            updatedInvites => {
                console.log(updatedInvites)
                dispatch(createNewAnsweredInviteSuccess(updatedInvites))
                dispatch(initiateGetAnsweredInvites())
                dispatch(initiateGetNewInvites())
            },
            () => dispatch(createNewAnsweredInviteFailure())
        )
    }
}