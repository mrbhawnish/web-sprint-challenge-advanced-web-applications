import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

const Login = () => {
   const [credentials, setCredentials] = useState({
     username: "",
     password: ""
   })
   const [ errors, setErrors ] = useState("")
   const { push } = useHistory();


  const getToken = () => {
   axios.post("http://localhost:5000/api/login", credentials)
   .then(res => {
     console.log(res.data.payload)
      localStorage.setItem("token", res.data.payload)
    push("/bubblepage")
   })
     .catch(err => {
       console.log(err)
       
     })
   }

   const changeHandler = (e) => {
     e.persist();
     setCredentials({
        ...credentials,
       [e.target.name]: e.target.value
       })
   }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
    {errors.length ? <h1>{errors}</h1> : <h2>...Nothing</h2>}
      <h1>Welcome to the Bubble App!</h1>
     <form onSubmit={getToken}>
       <label>
         Username:
        <input 
        type="text"
        name="username" 
        value={credentials.username} 
        onChange={changeHandler}/>
       </label>
       <label>
         Password: 
       <input 
       type="password" 
       name="password" 
       value={credentials.password} 
       onChange={changeHandler}/>
       </label>
       <button type="button" onClick={getToken}>Login</button>
     </form>
    </>
  );
};

export default Login;
