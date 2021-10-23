import MyContacts from "./MyContacts";

const AgentDashboard = (props) => {
    const user = props.user



    return (
        <div>
            <MyContacts user={user} />
        </div>
    )
}

export default AgentDashboard;