import React, {useState, useEffect } from 'react'

import Header from '../components/Header.jsx'
import ContactsList from '../components/ContactList.jsx'
import OpenChat from '../components/OpenChat.jsx'

const Home = ({ user, logout }) => {
    const [openChat, setOpenChat] = useState();

    return(
        <>
        <Header username={user.username} logout={logout} link={'/create-room'} icon={"bi-person-plus-fill"} />
        <div id='chats'>
            <ContactsList user={user} setOpenChat={setOpenChat} />
            {openChat ? 
                <OpenChat user={user} openChat={openChat} />
                :
                <div id="openChat">
                    <h2>Select a user/room to start a chat</h2>
                </div>
            }
        </div>
        </>
    )
}

export default Home