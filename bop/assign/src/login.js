import React from 'react';
import { useState } from 'react';





const API_URL = "http://131.181.190.87:3000/user/login"

function Login() {

    const [emailAddress, checkEmail] = useState([]);
    const [passwordInput, checkPassword] = useState([]);

   const getLogin = (event) => {
    event.preventDefault();
    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email : emailAddress, password : passwordInput,}),
    })
        .then((res) => res.json())
        .then((info) => { localStorage.setItem("token", info.token);
            if  (info.success){
                
                alert("You are now logged in")
            }
            else if (info.error){
                alert("Please try again")
            .catch(err => { console.log(err) })
            }

        })
    }

    return(
        
        <div id="inputs">
            
            
            <h1>Welcome to Stockers</h1>
            
            <form onSubmit={getLogin}>

                <h2>Email</h2>
                <input id="email" type="text"  name="email" required onChange={e => {
                    checkEmail(e.target.value);
                }}>
                </input>
                    
                <h2>Password</h2>
                <input id="password" type="password"  name="password" required onChange={e => {
                   checkPassword(e.target.value);
                }}>
                </input>
                    

                <br></br>
                <br></br>
                <input id="submit" type="submit" value="Submit"></input>
            </form>
            
        </div>
    );
};
export default Login;
