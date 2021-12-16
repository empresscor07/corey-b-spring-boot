import {useState} from "react";
import {Badge, Button, Card, CloseButton, Col, Row} from "react-bootstrap";
import CompleteInviteDetails from "./CompleteInviteDetails";

function CompleteInvite({invite, events}) {
    const [showDetails, setShowDetails] = useState(false);
    const [show, setShow] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let eventStillExists = false;
    let date = ''
    let currentEvent

    console.log(invite.attending + ' is attending?')
    const isAttending = invite.attending
    console.log(isAttending)


    events.forEach(event => {
        if (event.id === invite.eventId) {
            currentEvent = event
            console.log(currentEvent.name)
        }
    })
    console.log(currentEvent + ' current event')
    if (currentEvent !== undefined) {
        console.log(currentEvent.startTime + ' current event start time')
        eventStillExists = true
        const rawDate = currentEvent.startTime
        console.log(rawDate)
        date = (rawDate.getMonth()+1) + '/' + rawDate.getDate() + '/' + rawDate.getFullYear()
    }
    return (
        <>
            <Col sm={4} className='mt-4'>
                <Card style={{ height: '19rem' }}>
                    <Card.Header>
                        <Row>
                                {
                                    eventStillExists?
                                        <h4>{date}</h4> :
                                        <h4>No date available</h4>

                                }


                        </Row>
                    </Card.Header>
                    <Card.Body>

                        <Card.Text>

                            {
                                currentEvent?

                                    <Row><Col>{currentEvent.name}</Col></Row> :
                                    <Row><Col>Event with id {invite.eventId} has been deleted</Col></Row>
                            }
                            {
                                currentEvent?
                                    <Row><Col xs='auto'><Badge bg='warning'>Hosted by: {currentEvent.host}</Badge></Col></Row>:
                                    <></>
                            }

                            {
                                invite.attending === true ?
                                    <Row className='mb-3'><Col><Badge bg='success'>Attending</Badge></Col></Row>:
                                    <Row className='mb-3'><Col><Badge bg='danger'>Declined</Badge></Col></Row>
                            }

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer border='warning'>
                        <Button className='mt-1 mx-1' variant="info" onClick={handleShowDetails}>
                            Details
                        </Button>
                        <Button className='mt-1 mx-1' variant="primary" >
                            Edit
                        </Button>


                    </Card.Footer>
                </Card>
            </Col>
            <CompleteInviteDetails
                currentEvent={currentEvent}
                invite={invite}
                date={date}
                showDetails={showDetails}
                handleCloseDetails={handleCloseDetails}
                handleShowDetails={handleShowDetails}
            />
        </>

    )
}

export default CompleteInvite