import MyContacts from "./MyContacts";

const ClientDashboard = (props) => {
    const user = props.user

    
    return (
        <div>
             <MyContacts user={user} />
        </div>
    )
}

export default ClientDashboard;