
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import CreateMeetingPage from './Pages/CreateMeeting'

import { SocketProvider } from './Context/Socket'
import Room from './Pages/Room'


// const LazyComponent = React.lazy(() => import('./Pages/Room').then(module => ({ default })));

function App() {


  return (
    
    <SocketProvider>

        <Routes  >
          
            <Route path="/" element={<Homepage/>} />
            <Route  path='/meeting/create' element={<CreateMeetingPage/>} />
            <Route  path='/meeting/:roomId' element={ <Room/> }/>
        </Routes>
    </SocketProvider>
  )
}

export default App
