import React, { useMemo } from 'react'


const PeerContext = React.createContext(null) ;


export const usePeer = () => {
  return React.useContext(PeerContext)
}

function PeerProvider(  {childrens}  : {childrens: React.ReactNode}) {
    const peer = useMemo(()=> 
        new RTCPeerConnection({
            iceServers :[
                {
                    urls :[ "stun:stun.l.google.com:19302" , "stun:stun1.l.google.com:19302" , "stun:stun2.l.google.com:19302" , "stun:stun3.l.google.com:19302" , "stun:stun4.l.google.com:19302" ]
                }
            ]
        })
    , []); 
  return (

    <PeerContext.Provider   value={{}}  >
        {childrens}
    </PeerContext.Provider>
  )
}

export default Peer