import {Row} from "react-bootstrap";
import CompleteInvite from "./CompleteInvite";
import Invite from "./Invite";

function Invites({newInvites, answeredInvites, events, handleCreateNewAnsweredInvite, userName}) {
    // invites is a list of all
    //we only want to display new invites - not ones that have already been rsvpd to
    let filteredNewInvites = newInvites
    newInvites.forEach(newInvite => {
        answeredInvites.forEach(invite => {
            if (newInvite.id === invite.eventId) {
                filteredNewInvites = filteredNewInvites.filter(oneEvent => oneEvent.id !== newInvite.id)
            }
        })
    })

    return (
        <>
            <h4>New Invites</h4>
            <Row className='mb-3'>{filteredNewInvites.map(newInvite => <Invite
                invite={newInvite}
                handleCreateNewAnsweredInvite={handleCreateNewAnsweredInvite}
                userName={userName}
            />)}</Row>
            <h4>Answered Invites</h4>
            <Row className='mb-3'>{answeredInvites.map(answeredInvite => <CompleteInvite
                invite={answeredInvite}
                events={events}
            />)}</Row>
        </>
    )
}

export default Invites