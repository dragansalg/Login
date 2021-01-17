import React, { useState, useEffect } from 'react'
import { Link, useHistory} from 'react-router-dom'

export default function CustomerUpdatePage(props) {
    const customerId = props.match.params.id
    const [formData, setFormData] = useState({})
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
        .then(data => setFormData(data))
    }

    useEffect(() => {
        getCustomerItem()
    }, [])

    function handleOnChange(e){
        const name = e.target.name
        const value = e.target.value
        const newObj = {...formData, [name]: value}
        setFormData(newObj)
    }

    function renderInput(name, label, type){
        return (
            <div className="m-1">
                <label>{label}</label>
                <input
                type={type || "text"}
                name={name}
                value={formData[name] || ""}
                onChange={handleOnChange}
                />
            </div>
        )
    }

    function handleOnSubmit(e){
        e.preventDefault()
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(() => history.push(`/customers/${customerId}`))
    }

    return (
        <div className="container border text-left">
            <ul className="list-group list-group-horizontal text-center">
        <li className="list-group-item flex-fill">
          <Link to="/home">Home</Link>
        </li>
        <li className="list-group-item flex-fill">
          <Link to="/customers">Customers</Link>
        </li>
      </ul>

            <h1>Update Customer</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="w-25">
                    {renderInput("name", "Customer Name")}
                    {renderInput("organisationNr", "Organisation Number")}
                    {renderInput("vatNr", "VAT Number")}
                    {renderInput("reference", "Reference")}
                    {renderInput("paymentTerm", "Payment Term", "number")}
                    {renderInput("website", "Website", "url")}
                    {renderInput("email", "Customer Email", "email")}
                    {renderInput("phoneNumber", "Phone Number", "tel")}
                    <button className="btn btn-primary m-2" type="submit">Update Customer</button>
                </div>
            </form>
        </div>
    )
}
