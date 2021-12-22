import {Navbar, Container, Button, Row, Col} from "react-bootstrap";
import NewEvent from "./NewEvent";
import Events from "./Events";
import Login from "./Login";
import {initiateCreateNewEvent} from "../modules/eventMod";
import ErrorToast from "./ErrorToast";
import {useEffect, useState} from "react";
import MainErrorToasts from "./MainErrorToasts";

function Header({dispatch, handleLogoutRequest, userName, show, setShow, handleShow, han}) {
    console.log('My username ' + userName)
    function handleNewEvent(newEvent) {
        dispatch(initiateCreateNewEvent(newEvent))
    }
    return (
        <>
            <Navbar bg="light" variant="light" expand={false}>
                <Container fluid>
                    <Navbar.Brand>
                        <img src="https://cdn.pixabay.com/photo/2012/04/13/11/23/calendar-31953_1280.png"
                             width="80" height="80"
                             className="d-inline-block align-top"
                             alt="Calendar Icon"/>
                    </Navbar.Brand>
                    <Navbar.Text className="navbar-center">
                        <h2>{userName}'s Calendar</h2>
                    </Navbar.Text>
                    <Button onClick={handleShow}>New Event</Button>
                    <Button className='mx-2' variant="danger" onClick={handleLogoutRequest} size={"md"}>Logout</Button>
                </Container>
            </Navbar>
            <Container fluid>
                <NewEvent userName={userName} showNewEvent={show} setShowNewEvent={setShow} handleNewEvent={handleNewEvent}/>
            </Container>
            <MainErrorToasts

            />
        </>


    )
}

export default Header