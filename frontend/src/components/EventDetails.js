import {Badge, Button, Card, Col, Offcanvas, Row} from "react-bootstrap";

function EventDetails({event, date, showDetails, handleCloseDetails, startTime, endTime}) {

    return (
        <Offcanvas show={showDetails} onHide={handleCloseDetails}>
            <Offcanvas.Header closeButton>
                <Col><Offcanvas.Title>{event.name}</Offcanvas.Title></Col>
                <Col>Host: <Badge bg='warning'>{event.host}</Badge></Col>
            </Offcanvas.Header>
            <Offcanvas.Body  className='mx-4' >
                <Row>Date: {date}</Row>
                <Row>Starts: {startTime}</Row>
                <Row>Ends: {endTime}</Row>
                <Row>Description: {event.description}</Row>
                <Row>Location: {event.location}</Row>
                <Row>Invitees:</Row>
                {
                    event.invitees.length > 0 &&
                    <Row>
                        {event.invitees.map(invitee => <Row className='mt-2' xs='auto'><Badge>{invitee}</Badge></Row>)}
                    </Row>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default EventDetails