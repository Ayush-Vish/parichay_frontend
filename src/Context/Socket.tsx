import React, { createContext , useContext, useMemo } from 'react'

import {io  } from "socket.io-client" ;




 const SocketContext = createContext  (null) ; 

export const useSocket = () => { 
    const socket =  useContext(SocketContext)
    return socket;
}

export function SocketProvider(  {children}  ) { 

    const socket = useMemo(
        () => io("localhost:4002"),
     []);
    

    return (
        <SocketContext.Provider  value={  { socket } } >
            {children}
        </SocketContext.Provider>
    )

 
}
