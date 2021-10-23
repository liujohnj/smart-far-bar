import MyAgencies from "./MyAgencies";

const ClientDashboard = (props) => {
    const username = props.username

    
    return (
        <div>
             <MyAgencies user={username, "agent"} />
        </div>
    )
}

export default ClientDashboard;