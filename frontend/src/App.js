import Login from "./components/Login";
import {useState} from "react";
import {Button, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import Events from "./components/Events";
import NewEvent from "./components/NewEvent";
import {initiateLogin, initiateRegister, logout} from "./modules/UserMod"
import {initiateCreateNewEvent, initiateDeleteEvent, initiateGetEvents, initiateEditEvent, initiateGetEventsInWindow} from "./modules/eventMod";
import {initiateGetNewInvites, initiateCreateNewInviteAnswer} from "./modules/inviteModule";
import Header from "./components/Header";
import Invites from "./components/Invites";
import {connect} from "react-redux";

function App({
               dispatch,
               isLoggedIn,
               users,
               userName,
               createUserFailure,
               loginFailure,
               events,
               myEvents,
               getEventsFailed,
               newInvites,
               myAnsweredInvites,
               getNewInvitesFailed,
               createUserFailed
             }) {
  const [show, setShow] = useState(false)
  const [key, setKey] = useState('events');

  function handleFilterEvents(window) {
    dispatch(initiateGetEventsInWindow(window))
  }

  // resets events to show all after filter has been applied
  // passes the function we wrote inside calendar module to dispatch
  function handleResetEvents() {
    dispatch(initiateGetEvents())
  }

  const handleShow = () => setShow(true)

  function handleDeleteEvent(event) {
    dispatch(initiateDeleteEvent(event))
  }

  function handleEditEvent(event) {
    dispatch(initiateEditEvent(event))
  }

  function handleLogin(credentials) {
    dispatch(initiateLogin(credentials))
  }

  function handleRegister(userInfo) {
    console.log(userInfo)
    dispatch(initiateRegister(userInfo))
  }

  function handleLogout() {
    dispatch(logout())
  }

  function handleCreateNewAnsweredInvite(invite) {
    dispatch(initiateCreateNewInviteAnswer(invite))
  }

  return (
      <Container>
        {
          isLoggedIn ?
              <>
                <Header
                    handleLogoutRequest={handleLogout}
                    userName={userName}
                    show={show}
                    setShow={setShow}
                    handleShow={handleShow}
                    dispatch={dispatch}
                    initiateCreateNewEvent={initiateCreateNewEvent}
                />

                <div className="app-container">

                  <Tabs
                      id="controlled-tab"
                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3"
                  >


                    <Tab eventKey="events" title="Events">
                      <Events className={"tab-container"}
                              events={myEvents}
                              userName={userName}
                              handleDeleteEvent={handleDeleteEvent}
                              handleEditEvent={handleEditEvent}
                              createUserFailed={createUserFailed}
                              handleResetEvents={handleResetEvents}
                              handleFilterEvents={handleFilterEvents}
                      />
                    </Tab>


                    <Tab eventKey="invites" title="Invites">

                      <Invites className={"tab-container"}
                               userName={userName}
                               newInvites={newInvites}
                               answeredInvites={myAnsweredInvites}
                               events={events}
                               handleCreateNewAnsweredInvite={handleCreateNewAnsweredInvite}
                      />
                    </Tab>
                  </Tabs>


                </div>

              </>:
              <Login
                  login={handleLogin}
                  register={handleRegister}
                  users={users}
                  loginFailure={loginFailure}
                  createUserFailed={createUserFailed}
              />
        }
      </Container>
  )


}
function mapStateToProps(state) {
  //return copy of state
  return {...state.user, ...state.event, ...state.invite}
}

export default connect(mapStateToProps)(App);
