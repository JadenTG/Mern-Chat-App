import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import { baseURL } from '../util';

const SignUp = ({ setUser }) => {
    const [userform, setUserForm] = useState({
        username: "",
        password: "",
        email: "",
        confirmPass: ""
    });

    const [err, setErr] = useState()

    const handleChange = (event) => {
        setUserForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr();

        if(userform.password !== userform.confirmPass){
            return setErr("Password and Confirm Password must match");   
        }

        await axios.post(`${baseURL}/auth/register`, {
            username: userform.username,
            password: userform.password,
            password: userform.password
        }, {withCredentials: true }).then((res) => {
            if(res.data.user){
                setUser(res.data.user)
            } else {
                setErr(res.data.error)
            }
        }).catch((error) => {
            console.log('Error', error);
        })
    }

    return(
        <div className='form-wrapper'>
            <div className='container'>
                <h1>Sign Up</h1>
                {err && <div className='err'>
                    <p>{err}</p>
                    </div>}
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Username' name='username' value={userform.username} onChange={handleChange} />
                    <input type='email' placeholder='Email' name='email' value={userform.email} onChange={handleChange} />
                    <input type='password' placeholder='Password' name='password' value={userform.password} onChange={handleChange} />
                    <input type='password' placeholder='Confirm Password' name='confirmPass' value={userform.confirmPass} onChange={handleChange} />

                    <button type='submit' className='btn'>Sign Up</button>
                </form>
                <p>Already Have an Account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default SignUp