import React , {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {baseURL} from "../util"

const CreateRoom = ({ user, err, setErr, selectedUsers }) => {
    const [roomName, setRoomName] = useState("");

    let navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        if(roomName == "") {
            return setErr("You must give room name.")
        }

        if(selectedUsers.length < 2){
            return setErr("At least two users are required to create a chat room.")
        }

        setErr();

        axios.post(`${baseURL}/users/${user._id}/chat`, {
            name: roomName,
            members: selectedUsers,
            type: 'room'
        }, {withCredentials: true}).then(res => {
            if(res.data.chat){
                navigate('/');
            }
        })
        setRoomName('');
    }

    return(
        <div className='form-wrapper' id='createRoom'>
            <div className='container'>
                <h1>Create Room</h1>
                {err && 
                    <div className='err'>
                        <p>{err}</p>
                    </div>
                }

                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Room Name' name='roomName' value={roomName} onChange={(event) => setRoomName(event.target.value)} />
                    <button type='submit' className='btn'>Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom