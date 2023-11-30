import React, {useState} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../util';

const Login = ({ setUser }) => {
    const [userform, setUserForm] = useState({
        username: "",
        password: "",
    });

    const [err, setErr] = useState()
    
    const handleChange = (event) => {
        setErr();
        setUserForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr();

        await axios.post(`${baseURL}/auth/login`, userform, {withCredentials: true})
        .then((res) => {
            if(res.data.user){
                setUser(res.data.user)
            }else{
                setErr(res.data.error)
            }
        }).catch((error) => {
            console.log(error.message)
            setErr(error.message)
        })
    }

    return(
        <div className="form-wrapper">
            <div className="container">
                <h1>Login</h1>
                {err && <div className="err">
                    <p>{err}</p>
                    </div>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" name="username" value={userform.username} onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" value={userform.password} onChange={handleChange} />

                    <button type="submit" className="btn">Login</button>
                </form>
                <p>Don't Have an Account <Link to="/sign-up">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login