import {CloseButton} from "react-bootstrap";

function Invitee({invitee, deleteInvitee }) {
    return <li>{invitee} <CloseButton onClick={deleteInvitee} /></li>

}
export default Invitee
