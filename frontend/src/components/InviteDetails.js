import {Badge, Button, Card, Col, Offcanvas, Row} from "react-bootstrap";

function InviteDetails({invite, date, showDetails, handleCloseDetails, currentEvent, end_time, start_time}) {

    return (
        <Offcanvas show={showDetails} onHide={handleCloseDetails}>
            <Offcanvas.Header closeButton>
                <Col><Offcanvas.Title>{invite.name}</Offcanvas.Title></Col>
                <Col>Host: <Badge bg='warning'>{invite.host}</Badge></Col>
            </Offcanvas.Header>
            <Offcanvas.Body  className='mx-4' >
                <Row>Date: {date}</Row>
                <Row>Starts: {start_time}</Row>
                <Row>Ends: {end_time}</Row>
                <Row>Description: {invite.description}</Row>
                <Row>Location: {invite.location}</Row>
                <Row>Invitees:</Row>
                {
                    invite.invitees.length > 0 &&
                    <Row>
                        {invite.invitees.map(invitee => <Row className='mt-2' xs='auto'><Badge>{invitee}</Badge></Row>)}
                    </Row>
                }
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default InviteDetails