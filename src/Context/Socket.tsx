import React, { useMemo } from 'react'

import {io  } from "socket.io-client" ;




export const SocketContext = React.createContext  (null) ; 

export const useSocket = () => { 
    return React.useContext(SocketContext)
}

export function SocketProvider(  {children} :{children : React.ReactNode}  ) { 

    const socket = useMemo(
        () => io("localhost:4001"), [])


    return (
        <SocketContext.Provider  value={  {socket} } >
            {children}
        </SocketContext.Provider>
    )

 
}
