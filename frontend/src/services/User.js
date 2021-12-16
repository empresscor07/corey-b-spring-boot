export function login(credentials, users) {
    let userExists = false;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            users.forEach(user => {
                if (credentials.username === user.username) {
                    userExists = true
                    console.log('User Exists')
                    if (credentials.password === user.password) {
                        console.log('Password validated!')
                        resolve()
                    } else {
                        console.log('Invalid password')
                        reject()
                    }
                }
            })
            if (!userExists) {
                console.log('Invalid Username')
                reject()
            }
        }, 250)
    })
}

export function register(userInfo, users) {
    console.log('Creating a new user with username: ' + userInfo.username)
    let usernameTaken = false
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            users.forEach(user => {
                if (userInfo.username === user.username) {
                    usernameTaken = true
                }
            })
            if (usernameTaken) {
                reject()
            } else {
                if (userInfo.username === '' || userInfo.password === '') {
                    reject()
                } else {
                    resolve()
                }
            }
        }, 250)
    })
}
