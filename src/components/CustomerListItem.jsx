import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomerListItem({customerData}) {
    return (
        <div className="border m-2 w-100 text-center">
            <h2>
                <Link to={`/customers/${customerData.id}`}>
                    {customerData.name}
                </Link>
            </h2>            
        </div>
    )
}
