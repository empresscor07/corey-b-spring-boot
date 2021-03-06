import {Badge, Button, Card, CloseButton, Col, Offcanvas, Row} from "react-bootstrap";
import {useState} from "react";
import InviteDetails from "./InviteDetails";
import NewEvent from "./NewEvent";
import NewRSVP from "./NewRSVP";

function Invite(props) {
    console.log(props.invite)
    const [showDetails, setShowDetails] = useState(false);
    const [show, setShow] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const rawDate = new Date(props.invite.startTime)
    const rawEnd = new Date(props.invite.endTime)
    const date = (rawDate.getMonth()+1) + '/' + rawDate.getDate() + '/' + rawDate.getFullYear()
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

    return (
        <>
            <Col sm={4} className='mt-4'>
                <Card style={{ height: '18rem' }}>
                    <Card.Header>
                        <Row>
                            <Col><h4>{date}</h4></Col>
                            <Col xs='auto'><CloseButton onClick={() => props.delete(props.invite.id)}/></Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {props.invite.name}
                            <Row>
                                <Col xs='auto'><Badge bg='warning'>Hosted by: {props.invite.host}</Badge></Col>
                            </Row>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer border='warning'>
                        <Button className='mt-1 mx-1' variant="info" onClick={handleShowDetails}>
                            Details
                        </Button>
                        <Button className='mt-1 mx-1' variant="primary" onClick={handleShow} disabled={true}>
                            RSVP
                        </Button>


                    </Card.Footer>
                </Card>
            </Col>
            <InviteDetails
                invite={props.invite}
                date={date}
                showDetails={showDetails}
                handleCloseDetails={handleCloseDetails}
                handleShowDetails={handleShowDetails}
                start_time={start_time}
                end_time={end_time}
            />
            <NewRSVP
                invite={props.invite}
                showRSVP={show}
                handleCloseRSVP={handleClose}
                handlePostInvite={props.handleCreateNewAnsweredInvite}
                username={props.userName}
            />
        </>

    )
}

export default Invite