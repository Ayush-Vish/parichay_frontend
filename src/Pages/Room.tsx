import { usePeer } from '@/Context/Peer';
import { useSocket } from '@/Context/Socket';
import useMediaStream from '@/Context/hooks/useMediaStream';
import Player from '@/components/Player';
import { Button } from '@/components/ui/button';
import React, { useCallback, useEffect  , useState} from 'react'
import ReactPlayer from 'react-player/file';

import { useSelector } from 'react-redux';

function Room() {
  
  const {socket} = useSocket();
  const {peer , createOffer , createAnswer , setRemoteAnswer  , remoteStream  ,sendStream  , another} = usePeer() ;


  const [remoteEmailId , setRemoteEmailId] = useState("") ;
  const [myStream , setMyStream] = useState ("") ;
  const userData = useSelector(state => state.auth)
  console.log(userData) ;
  const {stream } = useMediaStream( );

  const handleNewUserJoined = useCallback(
    async ({emailId , roomId}) => {
      console.log("New User Joined " , emailId , roomId) ;


      const offer=await  createOffer();
      socket.emit("call-user" , {emailId , offer}) ;
      setRemoteEmailId(emailId); 
      sendStream(stream)

    },
    [createOffer, sendStream, socket, stream]
  )


  

  const handleIncomingCall = useCallback(
    async (data)=> {
      const   {offer , from} = data ;
      console.log("Incoming Call" , from , offer) ;
      const ans = await createAnswer(offer) ;
      socket.emit("call-accepted" , {emailId:from , ans})
      setRemoteEmailId(from) ;


    },[createAnswer, socket])
    const handleNegotiationNeeded = useCallback(
      (e)=>{
        const localOffer = peer.localDescription;
  
        socket.emit("call-user" , {emailId : remoteEmailId ,offer : localOffer})
      },  [peer.localDescription, remoteEmailId, socket]
    )
  const handleAcceptedCall = useCallback(
    async(data)=>{
      console.log("Call Accepted" , data)
      const {ans} = data ;
      console.log("Call Accepted" , ans) ;
      await setRemoteAnswer(ans);


    }, [setRemoteAnswer])
  useEffect(()=> {
    console.log("flfnslkfnsdlkfnsd") ;
    
    socket.on("user-joined" , handleNewUserJoined)
    socket.on("incoming-call" , handleIncomingCall )
    socket.on("call-accepted" , handleAcceptedCall)
    

    return () => {    
      socket.off("user-joined" , handleNewUserJoined)
      socket.off("incoming-call" , handleIncomingCall )
      socket.off("call-accepted" , handleAcceptedCall)
      
    }
  } , [socket, handleNewUserJoined, handleIncomingCall, handleAcceptedCall])




  useEffect (() => { 
    peer.addEventListener("negotiationneeded" , handleNegotiationNeeded)
    return () => {
      peer.removeEventListener("negotiationneeded" , handleNegotiationNeeded) ;
    }
  } , [])

  return (
    <div className='flex  flex-col items-center text-center gap-8 '>
      <h1>Room</h1>
                  <h1>
                    You are connected to : {remoteEmailId}
                  </h1>
            
                  <Button   > Send My Video </Button>
                  <Player  url={stream} muted={true} emailId={userData.data.email} playing={true}  />
                  <Player  url={remoteStream} muted={true} emailId={1} playing={true}  />
                  <Player  url={another} muted={true} emailId={2} playing={true}  />

              
            
          
        
    </div>
  )
}

export default Room;
