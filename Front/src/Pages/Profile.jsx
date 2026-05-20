import { useEffect, useState } from "react"
import { Logo } from "../Parts/Logo"
import { API_INSTANCE } from "../Utls/API";
import { useContext } from "react";
import AuthContext from "../Context";

function Profile() {
  const { userAuth, editInfo } = useContext(AuthContext);
  const [uFullName, setName] = useState(userAuth?.uFullName);
  const [uUserName, setUserName] = useState(userAuth?.uUserName);
  const [uBio, setBio] = useState(userAuth?.uBio);
  const [uProPic, setPIC] = useState(userAuth?.uProPic);
  // const [user, setUser] = useState({});

const saveChanges = async(a)=>{
  a.preventDefault();
  try {
      if(!uProPic){
        await editInfo({uFullName, uUserName, uBio })
      }
      const reader = new FileReader();
      reader.readAsDataURL(uProPic);
      reader.onload = async()=>{
        const base64Image = reader.result;
        setPIC(base64Image);
        await editInfo({uFullName, uUserName, uBio, uProPic})
      }
  } catch (error) {
    console.log("ERR-EDITS", error.message);
    
  }
}
console.log("USER:", userAuth);

  return (
    <div className="max-w-11/12 h-screen rounded-md py-20 px-36 space-y-4 backdrop-blur-2xl">
      <Logo/>
      <div className="w-5/6">
      <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
      <div className="flex gap-2 place-items-center my-4">
        <div className="flex items-center justify-center p-2 w-22 h-22 overflow-hidden rounded-full border border-amber-100 bg-blue-500">
          {
            uProPic ? (
              <img src={URL.createObjectURL(uProPic)} alt="uProPic" className="w-full h-full " />
            ) : <span className="text-4xl font-bold">{uFullName.toUpperCase().slice(0,1)}</span>
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
