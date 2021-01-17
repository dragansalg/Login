import React, { useState, useEffect } from 'react'
import CustomerListItem from '../components/CustomerListItem'
import { Link } from 'react-router-dom'

export default function CustomerListPage() {
    const [customerList, setCustomerList] = useState([])

    useEffect( () => {
        getCustomerList()
    }, [])
    
    function getCustomerList(){
        const url = "https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setCustomerList(data.results))
    }

    return (
        <div>
            <ul className="list-group list-group-horizontal text-center">
        <li className="list-group-item flex-fill">
          <Link to="/home">Home</Link>
        </li>
        <li className="list-group-item flex-fill">
          <Link to="/customers/create">Create Customer</Link>
        </li>
      </ul>
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item flex-fill">
                    {customerList.map(item => {
                        return <CustomerListItem key={item.id} customerData={item} />
                    })}
                </li>
            </ul>
            
        </div>
    )
}
