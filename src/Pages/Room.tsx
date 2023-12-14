import { useSocket } from '@/Context/Socket';
import React, { useEffect } from 'react'

function Room() {

  const {socket} = useSocket();

  function handleNewUserJoined (emailId ) {
    console.log(  "new User joined " + emailId  );

  }

  useEffect(()=> {
    console.log("flfnslkfnsdlkfnsd") ;
    
    socket.on("user-joined" , handleNewUserJoined)

  } , [socket])

  return (
    <div>Meeting</div>
  )
}

export default Room;
