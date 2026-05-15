import { useState } from "react";
import { Logo } from "../Parts/Logo";
import { API_INSTANCE } from "../Utls/API";
import { useNavigate } from "react-router-dom";
function LoginToAccount() {

    const [uEmail, setEmail] = useState('');
    const [uFullName, setName] = useState('');
    const [uPassword, setPassword] = useState('');
    const [uBio, setBio] = useState('');
    const [uProPic, setProPic] = useState(''); 
    const [CurrentState, setCurrentState] = useState('signUp');
    const [ShowBio, setShowBio] = useState(false);
    let navigateTO = useNavigate();
    // const [fomrData, setFromData] = useState(
    // )
const submitFORM = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
        if (CurrentState === 'signUp' && !ShowBio) {
            // if (!ShowBio) {
            //     setShowBio(true);
            //     return;
            // }
            formData.append("uFullName", uFullName);
            formData.append("uEmail", uEmail);
            formData.append("uPassword", uPassword);
            // formData.append("uBio", uBio);
            // formData.append("uProPic", uProPic);
            if(CurrentState === 'signUp' && ShowBio){
                let rsp = await API_INSTANCE.post("/user/create", formData)
                console.log(rsp.data);
            }
        } else if (CurrentState === 'login') {
            let rspns = await API_INSTANCE.post("/user/login", { uEmail, uPassword });
            console.log(rspns.data);
            navigateTO('/');
        } 
        // else {
        //     let rspns = await API_INSTANCE.post("/user/create", formData);
        //     console.log(rspns.data);
        //     console.log("Created!");
        //     navigateTO('/');
        // }
    } catch (error) {
        console.log({ "Login Failed!": error.message });
    }
};

    // TOGGLE LOGIN/SIGNUP
    const toggleForm = () => {
        if (CurrentState === 'signUp') {
            setCurrentState('login');
        } else {
            setCurrentState('signUp');
        }
        // Reset step
        // setShowBio(false);
    };

    return (

        <div className="w-full min-h-screen items-center flex gap-12 rounded-md justify-center backdrop-blur-2xl border-2 border-gray-400 p-8">

            {/* LEFT SIDE */}
            <div className="border border-gray-400 py-14 px-12 space-y-8 rounded-md bg-blue-600/15 flex flex-col justify-center place-items-center">
            <Logo/>

            {/* FORM */}
            <form
                onSubmit={submitFORM}
                className="flex flex-col max-w-[320px] items-center justify-center gap-y-3 w-full"
            >
                {/* SIGNUP STEP 1 */}
                {CurrentState === 'signUp' && !ShowBio && (
                    <>
                        <input required
                            type="text"
                            placeholder="Enter Name"
                            value={uFullName}
                            onChange={(a) => setName(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />

                        <input required
                            type="email"
                            placeholder="Enter Email"
                            value={uEmail}
                            onChange={(a) => setEmail(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />

                        <input required
                            type="password"
                            placeholder="Enter Password"
                            value={uPassword}
                            onChange={(a) => setPassword(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
                    </>
                )}

                {/* SIGNUP STEP 2 */}
                {CurrentState === 'signUp' && ShowBio && (
                    <div className="w-full flex flex-col">
                        <label htmlFor="pic" className="cursor-pointer">Choose image</label>
                        <input type="file" onChange={(a)=> setProPic(a.target.files[0])}
                        className="hidden" id="pic" />
                        <div className="rounded-full w-6 h-6 flex items-center justify-center p-1">
                        {
                            uProPic ? (

                                <img src={URL.createObjectURL(uProPic)} alt="Profile img" />
                            ) : (
                                <span className="text-xl">{uFullName.toUpperCase().slice(0,1)}</span>
                            )
                        }
                        </div>
                        <textarea
                            required
                            cols={5}
                            rows={4}
                            placeholder="Write Your Bio..."
                            value={uBio}
                            onChange={(a) => setBio(a.target.value)}
                            className="bg-white/65 p-2 w-full resize-none text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
                    </div>
                )}

                {/* LOGIN */}
                {CurrentState === 'login' && (
                    <>
                        <input required
                            type="email"
                            placeholder="Enter Email"
                            value={uEmail}
                            onChange={(a) => setEmail(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />

                        <input required 
                            type="password"
                            placeholder="Enter Password"
                            value={uPassword}
                            onChange={(a) => setPassword(a.target.value)}
                            className="bg-white/65 autofill:none p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
                    </>
                )}

                <button
                    type="submit"
                    // onClick={ ShowBio && }
                    className="cursor-pointer w-full border border-gray-500 rounded-md bg-blue-900/80 text-white p-2 transition duration-200 hover:bg-blue-900"
                >
                    {CurrentState === 'signUp'
                        ? (ShowBio ? 'Create Account' : 'Next')
                        : 'Login'}
                </button>

            {/* TOGGLE */}
            <div>

                {CurrentState === 'signUp' ? (

                    <p>
                        Already have an account?
                        <span
                            onClick={toggleForm}
                            className="underline text-white/65 cursor-pointer ml-1"
                        >
                            Login Now
                        </span>
                    </p>

                ) : (

                    <p>
                        Don&apos;t have an account?
                        <span
                            onClick={toggleForm}
                            className="underline text-white/65 cursor-pointer ml-1"
                        >
                            Sign Up
                        </span>
                    </p>

                )}

            </div>
            </form>


        </div>
        </div>
    );
}

export default LoginToAccount;