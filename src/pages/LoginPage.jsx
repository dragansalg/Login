import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "Dragan.Salg@yh.nackademin.se",
        password: "javascriptoramverk"
    })
    const history = useHistory()
    console.log(history)

    function handleOnSubmit(e){
        e.preventDefault()
        const url = "https://frebi.willandskill.eu/api-token-auth/"
        const payload = {
            email: formData.email,
            password: formData.password
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(data.token)
            localStorage.setItem("WEBB20", data.token)
            history.push('/home')
        })
    }

    function handleOnChange(e){
        const inputName = e.target.name
        const inputValue = e.target.value
        const newObj = {...formData, [inputName]: inputValue}
        setFormData(newObj)
    }

    return (
        <div className="container shadow mt-5">
            <form onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleOnChange} />
                    <small id="emailHelp" className="form-text text-muted">Your credentials will be sold to the lowest bidder. Get Rekt etc.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={formData.password} onChange={handleOnChange} />
                </div>
                <button className="btn btn-primary m-2" type="submit">Login</button>
            </form>
        </div>
    )
}
