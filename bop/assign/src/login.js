import React from 'react';
import { useState } from 'react';
import Home from './home';
import { Switch, Route,Link, Redirect } from 'react-router-dom';

const token = localStorage.getItem("token")
const headers = {
    accept: "aaplication/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
}
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
        .then((info) => {
            console.log(info);
            localStorage.setItem("token", info.token);

            if  (getLogin == true){
                console.log("hello")
                console.log(info)
            }
            if (info.success){
                return <Redirect to ='/home' />
            }
            else if (info.error){
                return(
                    <p>"Bad"</p>
                )
            .catch(err => { console.log(err) })
            }

        })
    }

    return(
        <div id="inputs">
            <h1>Log into account</h1>
            <form onSubmit={getLogin}>

                <h2>Email</h2>
                <input id="email" type="text"  name="email" size="30"  required onChange={e => {
                    checkEmail(e.target.value);
                }}>
                </input>
                    
                <br></br>

                <h2>Password</h2>
                <input id="password" type="password"  name="password" required onChange={e => {
                   checkPassword(e.target.value);
                }}>
                </input>
                    

                <br></br>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
};
export default Login;
