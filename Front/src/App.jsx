
import {Route,  Routes} from 'react-router-dom'
import Home from './Pages/Home'
import OpenProfile from './Parts/OpenProfile'
import LoginToAccount from './Pages/Login'
import Profile from './Pages/Profile'
function App(){

  return(
    <>
    <main className="w-full min-h-screen bg-center bg-black/30 bg-[url('https://img.magnific.com/premium-photo/chat-app-icon-logo-design_113255-191767.jpg')] bg-contain bg-no-repeat flex justify-center items-center ">
    

    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<LoginToAccount/>} />
    </Routes>
    </main>
 
    </>
  )
}

export default App