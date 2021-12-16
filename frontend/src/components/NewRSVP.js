import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function NewRSVP({invite, showRSVP, handleCloseRSVP, handlePostInvite, username}) {
    const [accepted, setAccepted] = useState('');
    const id = Math.random() * 999999 + 100
    const eventId = invite.id
    console.log(invite.id)
    const invitee = username

    function handleRadioClick(event) {
        setAccepted(event.target.value)
    }

    function handleAcceptedClick() {
        handleCloseRSVP()
        let attending
        attending = accepted === 'true';
        handlePostInvite({id, eventId, invitee, attending})
    }


    return (
        <Modal show={showRSVP} onHide={handleCloseRSVP}>
            <Modal.Header closeButton>
                <Modal.Title>Will you be attending?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>


                    <Form.Group className="mb-3">
                        <Form.Check
                            onClick={handleRadioClick}
                            type='radio'
                            name='accept'
                            id='yes'
                            label='Yes'
                            value='true'
                        />
                        <Form.Check
                            onClick={handleRadioClick}
                            type='radio'
                            name='accept'
                            id='no'
                            label='No'
                            value='false'
                        />
                    </Form.Group>
                        <Button variant="primary" onClick={handleAcceptedClick}>Send RSVP</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}