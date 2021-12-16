import {Badge, Button, Card, Col, Offcanvas, Row} from "react-bootstrap";

function CompleteInviteDetails({invite, date, showDetails, handleCloseDetails, currentEvent}) {
    let start_time
    let end_time
    console.log(currentEvent)

    if (currentEvent !== undefined){
        let amOrPmStart = 'am'
        let timeStart = currentEvent.startTime.getHours()
        let amOrPmEnd = 'am'
        let timeEnd = currentEvent.endTime.getHours()

        if (timeStart > 12) {
            amOrPmStart = 'pm'
            timeStart = timeStart - 12
        }

        if (timeEnd > 12) {
            amOrPmEnd = 'pm'
            timeEnd = timeEnd - 12
        }

        start_time = timeStart + ':' + currentEvent.startTime.getMinutes() + amOrPmStart
        end_time = timeEnd + ':' + currentEvent.endTime.getMinutes() + amOrPmEnd
    }

    return (
        <Offcanvas show={showDetails} onHide={handleCloseDetails}>
            <Offcanvas.Header closeButton>
                <Col>{currentEvent? <Offcanvas.Title>{currentEvent.name}</Offcanvas.Title>:
                                    <Offcanvas.Title>No matching event</Offcanvas.Title>}</Col>

            </Offcanvas.Header>
            <Offcanvas.Body  className='mx-4' >
                <Row className='mb-3'><Col>{ currentEvent? <Badge bg='warning'>{currentEvent.host}</Badge>:<Badge>No Host</Badge>}</Col></Row>

                {
                    invite.attending === true ?
                        <Row className='mb-3'><Col><Badge bg='success'>Attending</Badge></Col></Row>:
                        <Row className='mb-3'><Col><Badge bg='danger'>Declined</Badge></Col></Row>
                }
                {currentEvent?
                    <>
                    <Row className='mx-1'>Date: {date}</Row>
                    <Row className='mx-1'>Starts: {start_time}</Row>
                    <Row className='mx-1'>Ends: {end_time}</Row>
                    <Row className='mx-1'>Description: {currentEvent.description}</Row>
                    <Row className='mx-1'>Location: {currentEvent.location}</Row>
                    <Row className='mx-1'>Invitees:</Row>
                        {
                            currentEvent.invitees.length > 0 &&
                            <Row className='mx-1'>
                                {currentEvent.invitees.map(invitee => <Row className='mt-2' xs='auto'><Badge>{invitee}</Badge></Row>)}
                            </Row>
                        }
                </>:
                <>
                    <Row className='mx-1'>Event no longer exists</Row>
                </>
                }

            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default CompleteInviteDetails