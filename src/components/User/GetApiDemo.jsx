import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const GetApiDemo = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const res = await axios.get("https://node5.onrender.com/user/user/")
            setUsers(res.data.data)
        } catch (error) {
            console.log("Error:", error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div style={{ textAlign: "center" }}>
            <h2>User List</h2>

            <table style={{
                width: "80%",
                margin: "20px auto",
                borderCollapse: "collapse"
            }} border="1">

                <thead style={{ backgroundColor: "#007bff", color: "white" }}>
                    <tr>
                        <th style={{ padding: "10px" }}>ID</th>
                        <th style={{ padding: "10px" }}>Name</th>
                        <th style={{ padding: "10px" }}>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td style={{ padding: "8px" }}>{user._id}</td>
                            <td style={{ padding: "8px" }}>{user.name}</td>
                            <td style={{ padding: "8px" }}>{user.email}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}