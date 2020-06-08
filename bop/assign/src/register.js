import React, {useState} from 'react';
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
                    alert("Your Account has been registered, please sign in")
                    return 
                }
                if (data.error) {
                    console.log("Error")
                    alert("Please try again")
                    return
                }
                // { randomJSON }
                console.log("Try again")
                alert("Please try again")
                return
            })
            .catch(err => {
                // Failed to register for some reason
            });
    }
       
    return (
        <div id="inputs">
            <h1>Sign Up</h1>
            <form onSubmit={getID}>
            
            <h2>Email</h2>
            <input id="email" type="text"  name="email" required onChange={e => {
                setEmailAddress(e.target.value);
            }}></input>
            

            <h2>Password</h2>
            <input id="password" type="password"  name="password" required onChange={e => {
                setPasswordField(e.target.value);
            }}>
            </input>

            <br></br>
            <br></br>
            <input id="submit" type="submit" value="Register"></input>
            
            <p>Already have an account? <a href="./login">Login</a>.</p>
            </form>
            
        </div>

        
    );
};

export default Register;