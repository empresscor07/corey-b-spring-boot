export function getAllEvents(user, events) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let myHostedEvents = [];
            if (events.length > 0) {
                events.forEach(event => {
                    if (event.host === user) {
                        myHostedEvents.push(event)
                    }
                })
                resolve(myHostedEvents)
            } else {
                reject()
            }

        }, 250)
    })
}

export function createEvent(user, newEvent, events) {
    console.log(newEvent)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (events.length > 0) {
                let updatedEvents = [...events, newEvent]
                console.log(updatedEvents)
                if (updatedEvents) {
                    console.log('updated events in service!!')
                    resolve(updatedEvents)
                } else {
                    console.log('reject update in service')
                    reject()
                }
            } else {
                let updatedEvents = [newEvent]
                resolve(updatedEvents)
            }

        }, 250)
    })
}

export function editEvent(newEvent, events) {
    console.log(newEvent)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let eventList = []
            events.forEach(event => {
                if (event.id === newEvent.id) {
                    eventList = events.filter(oneEvent => oneEvent.id !== newEvent.id)
                }

            })
            if (eventList) {
                let updatedEvents = [...eventList, newEvent]
                console.log(updatedEvents)
                resolve(updatedEvents)
            } else {
                reject()
            }
        }, 250)
    })
}

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