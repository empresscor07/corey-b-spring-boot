import {Toast, ToastContainer} from "react-bootstrap";
import {useEffect, useState} from "react";



function ErrorToast({loginFailed, createUserFailed}) {

    const [showLoginError, setShowLoginError] = useState(false);
    const [showCreateUserError, setShowCreateUserError] = useState(false);

    useEffect(() => {
        if (loginFailed)
            setShowLoginError(true)
    }, [loginFailed])

    useEffect(() => {
        if (createUserFailed)
            setShowCreateUserError(true)
    }, [createUserFailed])

    return <ToastContainer position='bottom-end'>
        <Toast bg='danger' show={showLoginError} onClose={() => setShowLoginError(false)} autohide delay={3000}>
            <Toast.Body className='text-white'>Login Failed</Toast.Body>
        </Toast>
        <Toast bg='danger' show={showCreateUserError} onClose={() => setShowCreateUserError(false)} autohide delay={3000}>
            <Toast.Body className='text-white'>Create User Failed - username may be taken</Toast.Body>
        </Toast>
    </ToastContainer>
}

export default ErrorToast