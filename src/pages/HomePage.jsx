import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    const [getMeData, setGetMeData] = useState({})

    useEffect( () => {
        getMe();
    }, [])

    function getMe(){
        const url = "https://frebi.willandskill.eu/api/v1/me"
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setGetMeData(data))
    }
    console.log(getMeData)

    return (
        <div>
            <ul className="list-group list-group-horizontal text-center">
        <li className="list-group-item flex-fill">
          <Link to="/customers">Customers</Link>
        </li>
        <li className="list-group-item flex-fill">
          <Link to="/customers/create">Create Customer</Link>
        </li>
      </ul>
            <h1>Current user</h1>
            <p>Email: {getMeData.email}</p>
            <p>Name: {getMeData.firstName} {getMeData.lastName}</p>
        </div>
    )
}
