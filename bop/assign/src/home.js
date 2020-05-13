import React from 'react';

function Home() {
return(
    <div id = "home">
    <h1 id = "headings">Welcome to Stockers</h1>

    <img src = {"https://specials-images.forbesimg.com/imageserve/5deac8c3b269e900075d9921/960x0.jpg?fit=scale"} id="hello"/>
    
    <h2>Here at Stockers we proud ourselves as being for the consumers</h2>
    <p>Already have an account? <a href="./login">Login</a>.</p>
    </div>
);

}

export default Home;