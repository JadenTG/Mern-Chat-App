import React, { useState, useEffect } from 'react'
import axios from "axios"
import { baseURL } from "../util"

const ContactList = ({ user, setOpenChat }) => {
    const [showContacts, setShowContacts] = useState(true);
    const [showRooms, setShowRooms] = useState(true);

    const [userList, setUserList] = useState([]);
    const [roomsList, setRoomsList] = useState([]);

    const fetchUsers = async () => {
        axios.get(`${baseURL}/users/${user._id}/contacts`, { withCredentials: true }).then((res) => {
            if (res.data.users) {
                setUserList(res.data.users);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const fetchRooms = async () => {
        axios.get(`${baseURL}/users/${user._id}/chat/room`, { withCredentials: true }).then((res) => {
            console.log(res.data)
            if (res.data.chats) {
                setRoomsList(res.data.chats);
            }
        }).catch((err) => {
            console.log(err.message)
        })
    }

    const handleOpenChat = async (chatType, contact, room) => {
        if (chatType == 'private') {
            await axios.get(`${baseURL}/users/chat/${user._id}/${contact._id}`).then(async (res) => {
                console.log(res.data.chat)
                if (res.data.chat) {
                    setOpenChat({ chatId: res.data.chat._id, chatType: res.data.chat.type, members: res.data.chat.members, title: contact.username })
                } else {
                    await axios.post(`${baseURL}/users/${user._id}/chat`, {
                        type: chatType,
                        members: [contact._id]
                    }).then((res) => {
                        setOpenChat({ chatId: res.data.chat._id, chatType: res.data.chat.type, members: res.data.chat.members, title: contact.username })
                    })
                }
            })
        } else if (chatType == "room") {
            await axios.get(`${baseURL}/users/chat/${room._id}`).then((res) => {
                setOpenChat({ chatId: res.data.chat._id, chatType: res.data.chat.type, members: res.data.chat.members, title: res.data.chat.name })
            })
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchRooms();
    }, [])

    return (
        <div id='contactsList'>
            <button onClick={() => setShowContacts(!showContacts)}>
                Users
                {showContacts ?
                    <i className='bi bi-chevorn-up' />
                    :
                    <i className='bi bi-chevorn-down' />
                }
            </button>
            <ul className='contacts'>
                {showContacts && userList && userList.map((contact) => {
                    return (
                        <li onClick={() => handleOpenChat('private', contact, null)} key={contact._id}>{contact.username}</li>
                    )
                })}
            </ul>
            <button onClick={() => setShowRooms(!showRooms)}>
                Rooms
                {showRooms ?
                    <i className='bi bi-chevorn-up' />
                    :
                    <i className='bi bi-chevorn-down' />
                }
            </button>
            <ul className='rooms'>
                {showRooms && roomsList.length ? roomsList.map((room) => {
                    return (
                        <li onClick={() => handleOpenChat('room', null, room)} key={room._id}>
                            <p>{room.name}</p>
                            <p>{room.members.length} users</p>
                        </li>
                    )
                }) : <p>Your aren't in any rooms :/</p>
                }
            </ul>
        </div>
    )
}

export default ContactList