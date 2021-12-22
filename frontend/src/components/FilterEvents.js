import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

export default function FilterEvents({showFilter, handleFilterClose, handleFilterEvents}) {
    const [startDate, setStartWindow] = useState('');
    const [endDate, setEndWindow] = useState('');

    function handleFilterSubmit(event) {
        event.preventDefault()
        // console.log(window_start, window_end)
        handleFilterClose()
        handleFilterEvents({startDate, endDate})
    }

    function handleStartWindowChange(event) {
        setStartWindow(event.target.value)
        // console.log(` handler ${window_start}`)
    }

    function handleEndWindowChange(event) {
        setEndWindow(event.target.value)
        // console.log(` handler ${window_end}`)
    }

    return (
        <Modal show={showFilter} onHide={handleFilterClose}>
            <Modal.Header closeButton>
                <Modal.Title>Filter Events:</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleFilterSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>From:</Form.Label>
                        <Form.Control type="datetime-local"
                             min="2021-10-12T00:00"
                             max="2025-01-01T00:00"
                                      onChange={handleStartWindowChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Until:</Form.Label>
                        <Form.Control type="datetime-local"
                             min="2021-10-12T00:00"
                             max="2025-01-01T00:00"
                                      onChange={handleEndWindowChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        See Events
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}