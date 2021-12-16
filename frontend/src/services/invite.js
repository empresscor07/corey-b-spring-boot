export function getNewInvites(username, events) {
    console.log(username)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let myInvites = [];
            if (events.length > 0) {
                events.forEach(event => {
                    let isInvited = false;
                    const guests = event.invitees
                    if (guests.length > 0) {
                        guests.forEach(person => {
                            if (username === person) {
                                isInvited = true;
                            }
                        })
                    }
                    if (isInvited) {
                        myInvites.push(event)
                    }
                })
                resolve(myInvites)
            } else {
                reject()
            }

        }, 250)
    })
}

export function getAnsweredInvites(username, invites) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let myInvites = [];
            if (invites.length > 0) {
                invites.forEach(invite => {
                    if (username === invite.invitee) {
                        myInvites.push(invite)
                    }
                })
                console.log('my invites: ' + myInvites)
                resolve(myInvites)
            } else {
                reject()
            }

        }, 250)
    })
}

export function answerNewInvite(invite, answeredInviteList) {
    console.log(invite)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let updatedInviteAnswers = []
            if (answeredInviteList.length > 0) {
                updatedInviteAnswers = [...answeredInviteList, invite]
            } else {
                updatedInviteAnswers = [invite]
            }
            if (updatedInviteAnswers.length > 0) {
                resolve(updatedInviteAnswers)
            } else {
                reject()
            }

        }, 250)
    })
}