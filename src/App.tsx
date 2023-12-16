
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import CreateMeetingPage from './Pages/CreateMeeting'

import { SocketProvider } from './Context/Socket'
import { PeerProvider } from './Context/Peer'
import React from 'react'
import Room from './Pages/Room'


// const LazyComponent = React.lazy(() => import('./Pages/Room').then(module => ({ default })));

function App() {


  return (
    
    <SocketProvider>
      <PeerProvider   >

        <Routes  >
          
            <Route path="/" element={<Homepage/>} />
            <Route  path='/meeting/create' element={<CreateMeetingPage/>} />
            <Route  path='/meeting/:roomId' element={ <Room/> }/>
        </Routes>
      </PeerProvider>
    </SocketProvider>
  )
}

export default App
