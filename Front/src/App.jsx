import {Navigate, Route,  Routes} from 'react-router-dom'
import Home from './Pages/Home'
// import OpenProfile from './Parts/OpenProfile'
import LoginToAccount from './Pages/Login'
import Profile from './Pages/Profile'
import { useContext } from 'react'
import AuthContext from './Cntxts/Context'
// import { AuthContext } from './Context.jsx'
import {Toaster} from 'sonner'
function App(){
  const { userAuth } = useContext(AuthContext)
  return(
    <>
    <main className="w-full h-screen bg-center bg-black/30 
    flex justify-center items-center ">
      {/* bg-[url('https://img.magnific.com/premium-photo/chat-app-icon-logo-design_113255-191767.jpg')] bg-contain bg-no-repeat  */}
      <Toaster className='top-18 flex justify-center'/>
    <Routes>
        {/* <Route path='/' element={ <Home/> } />
        <Route path='/profile' element={ <Profile/> } /> */}
        <Route path='/' element={ userAuth ? <Home/> :  <Navigate to="/login" />} />
        <Route path='/profile' element={ userAuth ? <Profile/> :  <Navigate to="/login" />} />
        <Route path='/login' element={<LoginToAccount/>} />
    </Routes>
    </main>
 
    </>
  )
}

export default App