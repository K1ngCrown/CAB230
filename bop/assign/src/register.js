import React from 'react';

function Register() {
    return (
    <div>
        <h1>Register Account</h1>
        
        <label for = "uname">Email:</label>
        <input type="text" placeholder="Enter Email" name="email" required></input>
        <br></br>

        <label for = "password">Password:</label>
        <input type="password" placeholder="Enter Password" name="psw" required></input>
        <br></br>

        <label for = "rpassword">Password:</label>
        <input type="password" placeholder="Repeat Password" name="rpsw" required></input>
        <br></br>

        <button type="submit">Register</button>
        
        <p>Already have an account? <a href="./login">Login</a>.</p>
        

    </div>
    );
}

export default Register;


/* login code
        <label for = "uname">Username:</label>
        <input type="text" placeholder="Enter Username" name="uname" required></input>
        <br></br>

        <label for = "uname">Password:</label>
        <input type="password" placeholder="Enter Password" name="psw" required></input>

        <br></br>
        <button type="submit">Login</button>
        */