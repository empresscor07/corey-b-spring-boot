import {
    Badge,
    Button,
    Card,
    CloseButton,
    Col,
    Form,
    FormControl,
    FormLabel,
    InputGroup,
    Offcanvas,
    Row
} from "react-bootstrap";
import {useState} from "react";
import EventDetails from "./EventDetails";
import Invitee from "./Invitee";

function Event({event, deleteEvent, handleEditEvent}) {
    const [showDetails, setShowDetails] = useState(false);
    const [edit, setEdit] = useState(false)
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    // convert backend date to javascript date object
    const rawDate = new Date(event.startTime)
    const rawEnd = new Date(event.endTime)
    const date = (rawDate.getMonth()+1) + '/' + rawDate.getDate() + '/' + rawDate.getFullYear()
    const [startTime, setStartTime] = useState(rawDate)
    const [endTime, setEndTime] = useState(rawEnd)
    const [name, setName] = useState(event.name)
    const [description, setDescription] = useState(event.description)
    const [location, setLocation] = useState(event.location)
    const [invitees, setInvitees] = useState(event.invitees)
    let amOrPmStart = 'am'
    let timeStart = rawDate.getHours()
    let amOrPmEnd = 'am'
    let timeEnd = rawEnd.getHours()

    if (timeStart > 12) {
        amOrPmStart = 'pm'
        timeStart = timeStart - 12
    }

    if (timeEnd > 12) {
        amOrPmEnd = 'pm'
        timeEnd = timeEnd - 12
    }

    let minStartString
    const minutes = rawDate.getMinutes()
    if (minutes < 10) {
        minStartString = '0' + minutes
    } else {
        minStartString = minutes
    }

    let minEndString
    const minutesEnd = rawEnd.getMinutes()
    if (minutesEnd < 10) {
        minEndString = '0' + minutes
    } else {
        minEndString = minutesEnd
    }

    const start_time = timeStart + ':' + minStartString + amOrPmStart
    const end_time = timeEnd + ':' + minEndString + amOrPmEnd

    function handleEditShow() {
        setEdit(true)

    }

    function handleEditClose() {
        setEdit(false)
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }
    function handleStartTimeChange(e) {
        setStartTime(new Date(e.target.value))
    }
    function handleEndTimeChange(e) {
        setEndTime(new Date(e.target.value))
    }
    function handleLocationChange(e) {
        setLocation(e.target.value)
    }
    function handleInviteesChange(e) {
        setInvitees([...invitees, ...e.target.value.split(',')])
    }
    function handleDeleteInvitee(invitee) {
        setInvitees(invitees.filter(oneInvitee => oneInvitee.id !== invitee.id))
    }

    function submitButton() {
        console.log(startTime)
        const id = event.id
        const host = event.host

        handleEditEvent({id, host, name, startTime, endTime, description, location, invitees})
        setEdit(false)
    }

    return (
        <>
            {edit?
                <Col md={4} className='my-3'>
                    <Card border="danger">
                        <Card.Body>
                            <Form>
                                <Card.Header>
                                    <Row>
                                        <Col xs='auto'><Button variant='danger' size={"sm"} onClick={handleEditClose}>Cancel</Button></Col>
                                        <Col xs='auto'><Button size={"sm"} onClick={submitButton}>Submit</Button></Col>
                                    </Row></Card.Header>
                                <Row className='align-items-center'>
                                    <Card.Text className='my-3'>
                                        <InputGroup>
                                            <Col sm={2} className="mx-lg-1">
                                                <FormLabel className='mb-1'>Event Name:</FormLabel>
                                            </Col>
                                            <Col sm={9} className="my-1">
                                                <FormControl className='mb-1' onChange={handleNameChange} defaultValue={event.name}/>
                                            </Col>
                                        </InputGroup>

                                        <InputGroup>
                                            <Col sm={2} className="mx-lg-1">
                                                <FormLabel className='mb-1'>Details:</FormLabel>
                                            </Col>
                                            <Col sm={9} className="my-1">
                                                <FormControl type='text' className='mb-1' onChange={handleDescriptionChange} defaultValue={event.description}/>
                                            </Col>
                                        </InputGroup>

                                        <InputGroup>
                                            <Col sm={3} className="mx-lg-1">
                                                <FormLabel className='mb-1'>Location:</FormLabel>
                                            </Col>
                                            <Col sm={8} className="my-1">
                                                <FormControl className='mb-1' onChange={handleLocationChange} defaultValue={event.location}/>
                                            </Col>
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <Row>
                                                <Form.Label>Original Start Time: {date} at {start_time}</Form.Label>
                                            </Row>
                                            <Row>
                                                <Col sm={2} className="mx-lg-1">
                                                    <FormLabel>New Start:</FormLabel>
                                                </Col>
                                                <Col sm={9} className="my-1">
                                                    <Form.Control
                                                        onChange={handleStartTimeChange}
                                                        type="datetime-local"
                                                        min="2021-10-12T00:00"
                                                        max="2025-01-01T00:00"
                                                        id='endTime'
                                                    />
                                                </Col>
                                            </Row>
                                        </InputGroup>

                                        <InputGroup className="mb-3">
                                            <Row>
                                                <Form.Label>Original End Time: {date} at {end_time}</Form.Label>
                                            </Row>
                                            <Row>
                                                <Col sm={2} className="mx-lg-1">
                                                    <FormLabel>New End:</FormLabel>
                                                </Col>
                                                <Col sm={9} className="my-1">
                                                    <Form.Control
                                                        onChange={handleEndTimeChange}
                                                        type="datetime-local"
                                                        min="2021-10-12T00:00"
                                                        max="2025-01-01T00:00"
                                                        id='endTime'
                                                    />
                                                </Col>
                                            </Row>
                                        </InputGroup>
                                    </Card.Text>
                                </Row>
                                <Card.Footer>
                                    <Form.Label>Invitees</Form.Label>
                                    {
                                        invitees?
                                            invitees.map(invitee => <ul>
                                                <Invitee invitee={invitee} deleteInvitee={handleDeleteInvitee} />
                                            </ul>):
                                            <h4>No current Invitees</h4>
                                    }
                                    <Form.Select onChange={handleInviteesChange} id='invitees' aria-label="Select Invitee">
                                        <option>Select Invitee</option>
                                        <option value="Sam">Sam</option>
                                        <option value="Kerrie">Kerrie</option>
                                        <option value="Kyla">Kyla</option>
                                    </Form.Select>
                                </Card.Footer>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                :
            <Col sm={4} className='mt-4'>
                <Card style={{ height: '18rem' }}>
                    <Card.Header>
                        <Row>
                            <Col><h4>{date}</h4></Col>
                            <Col xs='auto'><CloseButton onClick={() => deleteEvent(event)}/></Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {event.name}
                            <Row>
                                <Col xs='auto'><Badge bg='warning'>Hosted by: {event.host}</Badge></Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer border='warning'>
                        <Button className='mt-1 mx-1' variant="info" onClick={handleShowDetails}>
                            Details
                        </Button>
                        <Button className='mt-1 mx-1' variant="primary" onClick={handleEditShow}>
                            Edit
                        </Button>


                    </Card.Footer>
                </Card>
            </Col>
           }
            <EventDetails
                event={event}
                date={date}
                startTime={start_time}
                endTime={end_time}
                showDetails={showDetails}
                handleCloseDetails={handleCloseDetails}
                handleShowDetails={handleShowDetails}
            />
        </>

    )
}

export default Event