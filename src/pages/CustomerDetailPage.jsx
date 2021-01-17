import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

export default function CustomerDetailPage(props) {
    const customerId = props.match.params.id
    const [customerItem, setCustomerItem] = useState(null)
    const history = useHistory()

    function getCustomerItem(){
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setCustomerItem(data))
    }

    function deleteCustomer(){
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => history.push('/customers'))
    }

    useEffect( () => {
        getCustomerItem()
    }, [])

    return (
        <div className="border shadow text-center">
            <ul className="list-group list-group-horizontal text-center">
        <li className="list-group-item flex-fill">
          <Link to="/Home">Home</Link>
        </li>
        <li className="list-group-item flex-fill">
          <Link to="/customers">Customers</Link>
        </li>
      </ul>
            <h1>Customer Detail Page</h1>
            {customerItem
            ? (
                <div className="card">
                    <h1 className="card-header text-center font-weight-bold border">{customerItem.name}</h1>
                    <table className="table border-solid">
                        <tbody>
                            <tr>
                                <td>Organisation Number</td>
                                <td>{customerItem.organisationNr}</td>
                            </tr>
                            <tr>
                                <td>VAT Number</td>
                                <td>{customerItem.VatNr}</td>
                            </tr>
                            <tr>
                                <td>Reference</td>
                                <td>{customerItem.reference}</td>
                            </tr>
                            <tr>
                                <td>Payment Term</td>
                                <td>{customerItem.paymentTerm}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td>
                                    <a href={customerItem.website} target="_blank">
                                        {customerItem.website}
                                    </a>
                                    </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <a href={`mailto:${customerItem.email}`}>
                                        {customerItem.email}
                                    </a>
                                    </td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{customerItem.phoneNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link className="bg-secondary text-light m-1 rounded-sm" to={`/customers/${customerId}/edit`}>Edit Customer</Link>
                    <button className="btn btn-secondary m-1 rounded-sm" onClick={deleteCustomer}>Delete Customer</button>
                </div>
            )
            :
            (
                <span>Laddar Data...</span>
            )
            }
        </div>
    )
}
