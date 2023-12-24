

import { useSocket } from '@/Context/Socket';
import useMediaStream from '@/Context/hooks/useMediaStream';
import React, { useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/file';

import peer from "../Context/Peer";


function Room() {


  const {socket} = useSocket();
  console.log(socket);
  const [remoteSocketId, setRemoteSocketId] = useState("");
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const handleUserJoined = useCallback(
    async ({ roomId, emailId, socketId }) => {
      console.log(roomId, emailId, socketId);
        setRemoteSocketId(socketId);
    },[]);

  const handleCallUser =useCallback(async ( )=> {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true ,
        video: true ,
      })
      const offer = await peer.getOffer()
      socket.emit("user:call" , {to :remoteSocketId  , offer});
      
      setMyStream(stream);



  } , [remoteSocketId, socket])

  const handleIncommingCall = useCallback(async ({from  , offer})  =>  {
    console.log("Incoming call form " , from  , offer );
    setRemoteSocketId(from);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true ,
      video: true ,
    })
    setMyStream(stream);
    const answer = await peer.getAnswer(offer);
    socket.emit("call:accepted" , {to :from  ,answer});
      

  } , [socket])
  const handleSendStream = useCallback(async ( ) => {

    for (const track of myStream.getTracks()) {
      peer.peer?.addTrack(track, myStream);
    }
  } , [])
  const handleCallAccepted = useCallback(
    async ({answer , from } ) => {
      peer.setLocalDescription(answer);
      console.log("call Accepted " , from) ;
    } , [myStream]
  )




  const handleEventListener = useCallback(async (ev) => {
    const remoteStrm = ev.streams;
    setRemoteStream(remoteStrm);

  }
  , [setRemoteStream])

  const handleNegoNeeded = useCallback(async ( ev) => {
    console.log("negotiationneeded" );
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed" , {to :remoteSocketId  , offer});

  } , [remoteSocketId, socket])

  const handleIncomingNego = useCallback(
    async ({from , offer}) => {
      const answer  = peer.getAnswer(offer); 
      socket.emit("peer:nego:done" , {to :from , answer }) ;

    } , [socket]
  )
  const handleFinalNego = useCallback(async ( { answer}) => {
    await peer.setLocalDescription(answer);
    
  } , [])
  useEffect(()=>  {
    peer.peer.addEventListener("negotiationneeded" , handleNegoNeeded) ;
    return () => {
      peer.peer.removeEventListener("negotiationneeded" , handleNegoNeeded) ;
    }



  }  , [handleNegoNeeded])

  useEffect(()=> { 
    // Tracks recieved from a remote via handleCallAccepted
    peer?.peer?.addEventListener("track", handleEventListener)
    return ()=> {
      peer?.peer?.removeEventListener("track", handleEventListener)
    }
  }  , [handleEventListener])


  useEffect(() => {
    
      socket.on("user:joined" , handleUserJoined)
      socket.on("incomming:call" , handleIncommingCall);
      socket.on("call:accepted" , handleCallAccepted);
      socket.on("peer:nego:needed" , handleIncomingNego);
      socket.on("peer:nego:final" , handleFinalNego);

      
      return () => {
        socket.off("user:joined" , handleUserJoined)
        socket.off("incomming:call" , handleIncommingCall);
        socket.off("call:accepted" , handleCallAccepted);
        socket.off("peer:nego:needed" , handleIncomingNego);
        socket.off("peer:nego:final" , handleFinalNego);
      }
  }, [handleCallAccepted, handleFinalNego, handleIncomingNego, handleIncommingCall, handleUserJoined, socket]);

  return (
    <div className='text-3xl text-center'>
      {
        remoteSocketId && <div>You are Connected</div>
      }
      {
        remoteSocketId && <button onClick={handleCallUser}>Call</button>
      }
      {
        myStream && <button onClick={handleSendStream} >Send My Stream </button>
      }
      {
        <ReactPlayer url={myStream} playing   />
      }
      {
        remoteStream && <ReactPlayer url={remoteStream} playing   />
      }
    </div>
  );
}

export default Room;
