import React from "react";

export default function UserCredentials(props){
    return (
        <tr>
            <td> {props.user.first_name} </td>
            <td> {props.user.last_name} </td>
            <td> {props.user.email} </td>
            <td> {props.user.role} </td>
        </tr>
    );
}
