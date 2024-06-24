import { useState,useEffect } from "react";
import axios from "axios";

function UserDetails(props){
    const [user, setUser] = useState([]);
    const fetchData = () => {
        axios.get("https://jsonplaceholder.typicode.com/users/"+props.todo.userId)
             .then((response) => setUser([response.data][0]));
     }
   
     useEffect(() => {
       fetchData();
     },)

    return(
        <div className="popup">
            <h5>User Details</h5>
            <table>
                <tr>
                    <td>ToDo Id </td>
                    <td>{props.todo.id}</td>
                </tr>
                <tr>
                    <td>ToDo Title </td>
                    <td>{props.todo.title}</td>
                </tr>
                <tr>
                    <td>User Id </td>
                    <td>{props.todo.userId}</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                </tr>
            </table>
        </div>
    );
}
export default UserDetails;