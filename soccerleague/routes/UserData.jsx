import React from "react";
import useFetch from "react-fetch-hook";
import UserCredentials from "./UserCredentials";

export default function UserData(){
    const {data, isLoading, error } = useFetch('/user'); 
    if(isLoading) return <h2> Loading...</h2>;
    else if(error) return <h2> Error: {error.message} </h2>;
    else return (
        <table className="table table-striped table-hover">
            <thead>
                <tr> 
                    <th> First: </th>
                    <th> Last: </th>
                    <th> Email: </th>
                    <th> Role: </th>
                </tr>
            </thead>
            <tbody>
                { data.map(singleuser => 
                    <UserCredentials user={singleuser} /> ) } 
            </tbody>
        </table>
    );
}
