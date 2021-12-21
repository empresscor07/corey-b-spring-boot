import {Button, Form, Modal} from "react-bootstrap";

function NewEvent({showNewEvent, setShowNewEvent, userName, handleNewEvent}) {
    function handleClose() {
        setShowNewEvent(false)
    }

    function handleSubmit(event) {
        event.preventDefault()
        handleClose()
        const name = document.getElementById('name').value
        const startTime = document.getElementById('startTime').value
        const endTime = document.getElementById('endTime').value
        const description = document.getElementById('description').value
        const location = document.getElementById('location').value
        const invitees_string = document.getElementById('invitees').value

        handleNewEvent({
            host: userName,
            name: name,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            description: description,
            location: location,
            invitees: invitees_string.split(', ')
        })
    }

    return <Modal show={showNewEvent} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>New Event Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control type="text" placeholder="Event Name" id='name'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control type="datetime-local"
                                  min="2021-10-12T00:00"
                                  max="2025-01-01T00:00"
                                  id='startTime'
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control type="datetime-local"
                                  min="2021-10-12T00:00"
                                  max="2025-01-01T00:00"
                                  id='endTime'
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" id='description'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="text" placeholder="Location" id='location'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Invitees</Form.Label>
                    <Form.Select id='invitees' aria-label="Select Invitee">
                        <option>Open this select menu</option>
                        <option value="Sam">Sam</option>
                        <option value="Kerrie">Kerrie</option>
                        <option value="Kyla">Kyla</option>
                        <option value="Corey">Corey</option>
                        <option value="Julian">Julian</option>
                        <option value="Pam">Pam</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}

export default NewEvent