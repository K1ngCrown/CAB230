import React, {useState} from 'react';

import ReactDOM from 'react-dom';
const API_URL = "http://131.181.190.87:3000/user/register";

function Register() {

    const [emailAddress, setEmailAddress] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const getID = (event) => {
        event.preventDefault();
        const requestParams = {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ email: emailAddress, password: passwordField })
        }
        fetch(API_URL, requestParams)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("Account Works")
                    // something here
                    return 
                }
                if (data.error) {
                    console.log("Error")
                    // { error: true, message: '' }
                    // something else here
                    return
                }
                // { randomJSON }
                console.log("Try again")
                // Unknown something occured
                return
            })
            .catch(err => {
                // Failed to register for some reason
            });
    }
       
    return (
        <div>
            <h1>Register for an account</h1>
            <form onSubmit={getID}>
            <label for = "email">Email:</label>

            <input type="text" placeholder="Enter Email" name="email" required onChange={e => {
                setEmailAddress(e.target.value);
            }}></input>
            <br></br>

            <label for = "password">Password:</label>
            <input type="password" placeholder="Enter Password" name="password" required onChange={e => {
                setPasswordField(e.target.value);
            }}></input>
            <br></br>

            <input type="submit" value="Register"></input>
            
            <p>Already have an account? <a href="./login">Login</a>.</p>
            </form>
        </div>

        
    );
};

export default Register;