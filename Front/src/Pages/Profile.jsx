import { useEffect, useState } from "react"
import { Logo } from "../Parts/Logo"
import { IoIosArrowRoundBack } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "../Cntxts/Context";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userAuth, editInfo } = useContext(AuthContext);
  const [uFullName, setName] = useState('');
  const [uUserName, setUserName] = useState('');
  const [uBio, setBio] = useState('');
  const [uProPic, setPIC] = useState('');
  // const [user, setUser] = useState({});
  useEffect(()=>{
    const getME = async()=>{

      if(userAuth){
        setUserName(userAuth.uUserName || '')
        setName(userAuth.uFullName || '')
        setBio(userAuth.uBio || '')
        setPIC(userAuth.uProPic || '')
      }
    }
    getME()
  }, [userAuth])
  const saveChanges = async(a)=>{
    a.preventDefault();
    const myData = new FormData()
    try {
      myData.append("uUserName", uUserName)
      myData.append("uFullName", uFullName)
      myData.append("uBio", uBio)
      if(uProPic){
        myData.append('uProPic', uProPic)
      }
      await editInfo(myData)
  } catch (error) {
    console.log("ERR-EDITS", error.message);  
  } 
}
const navigateTo = useNavigate()
  return (
    <div className="w-full md:max-w-11/12 h-screen rounded-md py-20 md:px-36 space-y-4 backdrop-blur-2xl sm:grid place-items-center">
      <span onClick={()=> navigateTo(-1)} className='absolute bg-gray-500/70 flex place-items-center text-center top-12 left-2 w-6 h-6 rounded-full p-0.5 cursor-pointer'><IoIosArrowRoundBack className='font-extrabold text-xl'/></span>
      <Logo/>
      <div className="w-5/6">
      <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
      <div className="flex gap-2 place-items-center my-4">
        <div className="flex items-center justify-center  w-22 h-22 overflow-hidden rounded-full border border-amber-100 bg-blue-500">
          {
            uProPic ? (
              <img src={uProPic instanceof File ? URL.createObjectURL(uProPic) : uProPic} alt="uProPic" className="w-full h-full rounded-full " />
            ) : <span className="text-4xl font-bold">{uFullName.slice(0,1).toUpperCase()}</span>
          }
          </div>
        <label htmlFor="uProPic" className="cursor-pointer">
          <input type="file" id="uProPic"  onChange={(a)=> setPIC(a.target.files[0])} accept=".jpg, .png, jpeg, " hidden /> Update picture
        </label>
          </div>
        <form onSubmit={saveChanges} className="space-y-4">
           <input required type="text" placeholder="Enter Name"
                            value={uFullName}
                            onChange={(a) => setName(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
           <input required type="text" placeholder="Enter Name"
                            value={uUserName}
                            onChange={(a) => setUserName(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
           <textarea    required cols={5} rows={4} placeholder="Write Your Bio..."
                        value={uBio}
                        onChange={(a) => setBio(a.target.value)}
                        className="bg-white/65 p-2 w-full resize-none text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
            <button type="submit"
                    className="cursor-pointer w-full border border-gray-500 rounded-md bg-blue-900/80 text-white p-2 transition duration-200 hover:bg-blue-900"> Save Changes
                </button>
      </form>
      </div>
      {/* <Logo/> */}
    </div>
  )
}

export default Profile
