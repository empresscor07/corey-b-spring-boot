import {Button, Form, Toast, ToastContainer} from "react-bootstrap";
import {useEffect, useState} from "react";
import ErrorToast from "./ErrorToast";

function Login(params) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        params.login({username, password})
    }

    function handleNewUser() {
        params.register({username, password})
    }

    return <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"
                              onChange={event => setUsername(event.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              onChange={event => setPassword(event.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            <Button onClick={handleNewUser} className="mx-2" variant="outline-danger">
                New User
            </Button>
        </Form>
        <ErrorToast
            loginFailed={params.loginFailure}
            createUserFailed={params.createUserFailed}
        />
    </>
}

export default Login