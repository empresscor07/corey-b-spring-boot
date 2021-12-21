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


// return new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let eventList = []
//         events.forEach(event => {
//             if (event.id === newEvent.id) {
//                 eventList = events.filter(oneEvent => oneEvent.id !== newEvent.id)
//             }
//
//         })
//         if (eventList) {
//             let updatedEvents = [...eventList, newEvent]
//             console.log(updatedEvents)
//             resolve(updatedEvents)
//         } else {
//             reject()
//         }
//     }, 250)
// })

export function deleteEvent(eventToDelete, events) {
    console.log(eventToDelete)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let eventList = []
            events.forEach(event => {
                if (event.id === eventToDelete.id) {
                    eventList = events.filter(oneEvent => oneEvent.id !== eventToDelete.id)
                }
            })
            if (eventList) {
                console.log(eventList)
                resolve(eventList)
            } else {
                reject()
            }
        }, 250)
    })
}

export function getEventsInWindow(window, myEvents) {

    const window_start = new Date(window.window_start)
    const window_end = new Date(window.window_end)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let eventList = []
            myEvents.forEach(event => {
                if (event.startTime >= window_start && event.startTime <= window_end) {
                    eventList = [...eventList, event]
                }
            })
            if (eventList) {
                console.log(eventList)
                resolve(eventList)
            } else {
                reject()
            }
        }, 250)
    })
}