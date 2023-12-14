
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import CreateMeetingPage from './Pages/CreateMeeting'

import { SocketProvider } from './Context/Socket'
import Meeting from './Pages/Room'

function App() {


  return (
    <SocketProvider>

      <Routes  >
        
          <Route path="/" element={<Homepage/>} />
          <Route  path='/meeting/create' element={<CreateMeetingPage/>} />
          <Route  path='/meeting/:roomId' element={<Meeting/>}  />
      </Routes>
    </SocketProvider>
  )
}

export default App
