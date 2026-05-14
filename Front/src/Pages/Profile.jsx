import { useState } from "react"
import { Logo } from "../Parts/Logo"

function Profile() {
  const [newName, setName] = useState('');
  const [newBio, setBio] = useState('');
  const [pic, setPIC] = useState(null);
  return (
    <div className="max-w-11/12 h-screen rounded-md py-20 px-36 space-y-4 backdrop-blur-2xl">
      <Logo/>
      <div className="w-5/6">
      <h2 className="text-xl font-semibold text-gray-700">Profile Details</h2>
      <div className="flex gap-2 place-items-center my-4">
        <div className="flex items-center justify-center p-2 w-22 h-22 overflow-hidden rounded-full border border-amber-100 bg-blue-500">
          {
            pic ? (
              <img src={URL.createObjectURL(pic)} alt="pic" className="w-full h-full " />
            ) : <span className="text-4xl font-bold">MW</span>
          }
          </div>
        <label htmlFor="pic" className="cursor-pointer">
          <input type="file" id="pic"  onChange={(a)=> setPIC(a.target.files[0])} accept=".jpg, .png, jpeg, " hidden /> Update picture
        </label>
          </div>
        <form className="space-y-4">
           <input required type="text" placeholder="Enter Name"
                            value={newName}
                            onChange={(a) => setName(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
           <textarea    required cols={5} rows={4} placeholder="Write Your Bio..."
                        value={newBio}
                        onChange={(a) => setBio(a.target.value)}
                        className="bg-white/65 p-2 w-full resize-none text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
            <button type="submit"
                    className="cursor-pointer w-full border border-gray-500 rounded-md bg-blue-900/80 text-white p-2 transition duration-200 hover:bg-blue-900"> Save
                </button>
      </form>
      </div>
      {/* <Logo/> */}
    </div>
  )
}

export default Profile
