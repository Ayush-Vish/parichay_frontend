import React, { useCallback, useEffect, useMemo, useState } from 'react'


const PeerContext = React.createContext(null) ;


export const usePeer = () => {
  return React.useContext(PeerContext)
}

export function PeerProvider(  {children}  : {children: React.ReactNode }) {
  const [remoteStream , setRemoteStream] = useState(null) ;
  const  [another ,setAnother] = useState(null) ;

    const peer = useMemo(()=> 
        new RTCPeerConnection({
            iceServers: [
              {
                urls: "stun:stun.stunprotocol.org",
              },
            ]
        })
    , []) ;


    const createOffer= async() => {
      try {

        const offer  = await peer.createOffer() ;
        await peer.setLocalDescription(offer) ;
        return offer ;
      }catch(err) {
        console.log(err) ;
      }
    }
    const createAnswer = async (offer )  => {
      await peer.setRemoteDescription(offer) ;
      const answer = await peer.createAnswer() ;
      await peer.setLocalDescription(answer) ;
      return answer ;
    }
    const setRemoteAnswer = async (answer) => {
      await peer.setRemoteDescription(answer) ;
    }
    const sendStream = async (stream) => {
      const tracks =stream.getTracks() ;
      for (const track of tracks) {
        peer.addTrack(track, stream);
      }
    }

    const handleTrackEvent= useCallback(
      (e) => {
        const streams= e.streams 
        console.log(streams) ;
        setRemoteStream(streams[0]) ;
        setAnother(streams[1]) ;
            
      } ,[]
    )

    useEffect(()=> {
      peer.addEventListener("track", handleTrackEvent)
      return () => {
        peer.removeEventListener("track" , handleTrackEvent) ;
      }
    } , [handleTrackEvent, peer])
  return (

    <PeerContext.Provider   value={{peer , createOffer  , createAnswer , setRemoteAnswer  , sendStream  ,remoteStream , another}}   >
        {children}
    </PeerContext.Provider>
  )
}

