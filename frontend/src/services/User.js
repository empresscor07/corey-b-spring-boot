import config from '../config.js'

export function requestLogin(credentials) {
    return fetch(`${config.userAPI}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}

export function createUser(credentials) {
    return fetch(`${config.userAPI}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}