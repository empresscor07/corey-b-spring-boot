import config from "../config";

export function getAllEvents() {
    return fetch(`${config.eventAPI}/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export function createEvent(event) {
    return fetch(`${config.eventAPI}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function editEvent(event) {
    console.log(event)
    return fetch(`${config.eventAPI}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function deleteEvent(event) {
    console.log(event)
    return fetch(`${config.eventAPI}/delete/${event.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
}

export function getEventsInWindow(window) {
    return fetch(`${config.eventAPI}/window`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(window)
    })
}

