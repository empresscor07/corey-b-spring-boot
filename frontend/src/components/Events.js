import Event from "./Event";
import {Button, Col, Row} from "react-bootstrap";
import {useState} from "react";
import FilterEvents from "./FilterEvents";

function Events({events, handleDeleteEvent, handleEditEvent, handleResetEvents, handleFilterEvents}) {
    const [showFilter, setShowFilter] =useState(false);

    const [showFilteredEventsReset, setShowFilteredEventsReset] = useState(false);
    const handleFilterShow = async () => {
        await setShowFilter(true)
        await handleShowResetButton()
    }
    function handleShowResetButton() {
        setShowFilteredEventsReset(true);
    }
    function handleShowFilterButton() {
        setShowFilteredEventsReset(false)
    }
    const resetEvents = async () => {
        await handleResetEvents()
        await handleShowFilterButton()
    }
    const handleFilterClose = () => setShowFilter(false);

    return (
        <>
            <Col xs='auto'>
                {
                    showFilteredEventsReset ?
                        <Button variant='outline-success' onClick={resetEvents}>Reset</Button> :
                        <Button variant='success' onClick={handleFilterShow}>Filter</Button>
                }
            </Col>
            <FilterEvents showFilter={showFilter} handleFilterClose={handleFilterClose} handleFilterEvents={handleFilterEvents}/>
            <Row>{events.map(event => <Event event={event} deleteEvent={handleDeleteEvent} handleEditEvent={handleEditEvent}/>)}</Row>
        </>


    )


}

export default Events