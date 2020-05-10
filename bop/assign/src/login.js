import React from 'react';
//import jwt from 'jsonwebtoken'

const API_URL = "http://131.181.190.87:3000"

function App() {
function Login() {
    const url = `${API_URL}/user/login`

    return fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({ email: "example@api.com", password: "asdlkfj1" })
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            console.log("done")
        })
    }

    return(
        <div>
            <h1>JWT Token Example</h1>

            <button onClick={Login}>Login</button>
        </div>
    )
}  
export default App;
