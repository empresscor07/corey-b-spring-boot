import {getAllEvents, createEvent, editEvent, deleteEvent, getEventsInWindow} from "../services/event";

const GET_EVENTS_SUCCESS = 'calendar/event/GET_EVENTS_SUCCESS'
const GET_EVENTS_FAILURE = 'calendar/event/GET_EVENTS_FAILURE'
const CREATE_EVENT_SUCCESS = 'calendar/event/CREATE_EVENT_SUCCESS'
const CREATE_EVENT_FAILURE = 'calendar/event/CREATE_EVENT_FAILURE'
const EDIT_EVENT_SUCCESS = 'calendar/event/EDIT_EVENT_SUCCESS'
const EDIT_EVENT_FAILURE = 'calendar/event/EDIT_EVENT_FAILURE'
const DELETE_EVENT_SUCCESS = 'calendar/event/DELETE_EVENT_SUCCESS'
const DELETE_EVENT_FAILURE = 'calendar/event/DELETE_EVENT_FAILURE'
const GET_EVENTS_IN_WINDOW_SUCCESS = 'calendar/event/GET_EVENTS_IN_WINDOW_SUCCESS'
const GET_EVENTS_IN_WINDOW_FAILURE = 'calendar/event/GET_EVENTS_IN_WINDOW_FAILURE'

let testEvents = [
    {
        id: 0,
        host: 'Corey',
        startTime: new Date('2021-12-17T14:24:00'),
        endTime: new Date('2021-12-17T16:24:00'),
        name: 'Decorate the Tree',
        description: 'Put up lots of twinkly lights and ornaments with my family',
        location: 'Duluth',
        invitees: ['Sam', 'Kyla', 'Julian']

    },
    {
        id: 1,
        host: 'Kyla',
        startTime: new Date('2021-12-19T05:24:00'),
        endTime: new Date('2021-12-19T08:24:00'),
        name: 'Family Christmas',
        description: 'Presents galore, enough said!',
        location: 'Home',
        invitees: ['Sam', 'Corey', 'Julian', 'Kerrie', 'Pam']
    },
    {
        id: 2,
        host: 'Kyla',
        startTime: new Date('2021-12-25T05:24:00'),
        endTime: new Date('2021-12-25T08:24:00'),
        name: 'Christmas Day Celebration',
        description: 'Stocking and presents from Santa',
        location: 'Home',
        invitees: ['Sam', 'Corey', 'Julian', 'Kerrie', 'Pam']
    },
    {
        id: 3,
        host: 'Corey',
        startTime: new Date('2021-12-25T05:24:00'),
        endTime: new Date('2021-12-25T08:24:00'),
        name: 'Christmas Day Celebration',
        description: 'Stocking and presents from Santa',
        location: 'Home',
        invitees: ['Sam', 'Kyla', 'Julian', 'Kerrie', 'Pam']
    }
]

//Reducer

const initialState = {
    events : testEvents,
    myEvents: [],
    getEventsFailed: false,
    createEventFailed: false,
    getEventsInWindowFailed: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS_SUCCESS:
            return {
                ...state,
                getEventsFailed: false,
                events: action.events,
                myEvents: action.myEvents
            };
        case GET_EVENTS_FAILURE:
            return {
                ...state,
                getEventsFailed: true
            };
        case CREATE_EVENT_SUCCESS:
            return {
                ...state,
                createEventFailed: false,
                events: action.events
            }
        case CREATE_EVENT_FAILURE:
            return {
                ...state,
                createEventFailed: true
            }
        case EDIT_EVENT_SUCCESS:
            return {
                ...state,
                editEventFailed: false,
                events: action.events,
            }
        case EDIT_EVENT_FAILURE:
            return {
                ...state,
                editEventFailed: true
            }
        case DELETE_EVENT_SUCCESS:
            return {
                ...state,
                deleteEventFailed: false,
                events: action.events,
            }
        case DELETE_EVENT_FAILURE:
            return {
                ...state,
                deleteEventFailed: true
            }
        case GET_EVENTS_IN_WINDOW_SUCCESS:
            return {
                ...state,
                getEventsInWindowFailed: false,
                myEvents: action.myEvents
            };
        case GET_EVENTS_IN_WINDOW_FAILURE:
            return {
                ...state,
                getEventsInWindowFailed: true
            };
        default:
            return state;
    }
}

// Action Creators

export function getEventsSuccess(events, myEvents) {
    console.log(events)
    console.log('get events success')
    return {
        type: GET_EVENTS_SUCCESS,
        events: events,
        myEvents: myEvents
    }
}

export function getEventsFailure() {
    return {type: GET_EVENTS_FAILURE}
}

export function createEventSuccess(updatedEvents) {
    return {
        type: CREATE_EVENT_SUCCESS,
        events: updatedEvents
    }
}

export function createEventFailure() {
    return {type: CREATE_EVENT_FAILURE}
}

export function editEventSuccess(updatedEvents) {
    return {
        type: EDIT_EVENT_SUCCESS,
        events: updatedEvents
    }
}

export function editEventFailure() {
    return {type: EDIT_EVENT_FAILURE}
}

export function deleteEventSuccess(updatedEvents) {
    return {
        type: DELETE_EVENT_SUCCESS,
        events: updatedEvents
    }
}

export function deleteEventFailure() {
    return {type: DELETE_EVENT_FAILURE}
}

export function getEventsInWindowSuccess(myEvents) {
    return {
        type: GET_EVENTS_IN_WINDOW_SUCCESS,
        myEvents: myEvents
    }
}

export function getEventsInWindowFailure() {
    return {type: GET_EVENTS_IN_WINDOW_FAILURE}
}

// Side Effects
// Web apps need to execute complex logic,
// usually including asynchronous work such as making fetch requests.
// That code is no longer purely a function of its inputs,
// and the interactions with the outside world are known as “side effects”
// Redux is inspired by functional programming,
// and out of the box, has no place for side effects to be executed.
// In particular, reducer functions must always be pure functions of
// (state, action) => newState. However, Redux's middleware makes it possible
// to intercept dispatched actions and add additional complex behavior around them,
// including side effects.

export function initiateGetEvents() {
    return function getEventsDispatcher(dispatch, getState) {
        console.log(getState().user.userName)
        getAllEvents(getState().user.userName, getState().event.events).then(
            myHostedEvents => dispatch(getEventsSuccess(getState().event.events, myHostedEvents)),
            () => dispatch(getEventsFailure())
        )
    }
}

export function initiateCreateNewEvent(newEvent) {
    return function createEventDispatcher(dispatch, getState) {
        createEvent(getState().user.userName, newEvent, getState().event.events).then(
            updatedEvents => {
                console.log(updatedEvents)
                dispatch(createEventSuccess(updatedEvents))
                dispatch(initiateGetEvents())
            },
            () => dispatch(createEventFailure())
        )
    }
}

export function initiateEditEvent(editedEvent) {
    return function editEventDispatcher(dispatch, getState) {
        editEvent(editedEvent, getState().event.events).then(
            updatedEvents => {
                console.log(updatedEvents)
                dispatch(editEventSuccess(updatedEvents))
                dispatch(initiateGetEvents())
            },
            () => dispatch(editEventFailure())
        )
    }
}

export function initiateDeleteEvent(eventToDelete) {
    console.log('initiateDelete running')
    return function deleteEventDispatcher(dispatch, getState) {
        deleteEvent(eventToDelete, getState().event.events).then(
            updatedEvents => {
                console.log(updatedEvents)
                dispatch(deleteEventSuccess(updatedEvents))
                dispatch(initiateGetEvents())
            },
            () => dispatch(deleteEventFailure())
        )
    }
}

export function initiateGetEventsInWindow(window) {
    return function getEventsInWindowDispatcher(dispatch, getState) {
        getEventsInWindow(window, getState().event.myEvents).then(
            myHostedEvents => dispatch(getEventsSuccess(getState().event.events, myHostedEvents)),
            () => dispatch(getEventsFailure())
        )
    }
}

