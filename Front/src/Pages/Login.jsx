import { useState } from "react";
import { Logo } from "../Parts/Logo";
import { API_INSTANCE } from "../Utls/API";
import { useNavigate } from "react-router-dom";
function LoginToAccount() {

    const [uEmail, setEmail] = useState('');
    const [uFullName, setName] = useState('');
    const [uUserName, setUserName] = useState('');
    const [uPassword, setPassword] = useState('');
    const [uBio, setBio] = useState('');
    const [uProPic, setProPic] = useState('');
    const [CurrentState, setCurrentState] = useState('signUp');
    const [ShowBio, setShowBio] = useState(false);
    let navigateTO = useNavigate();

    const handleLogin = async (a) => {
        a.preventDefault();
        try {
            let rspns = await API_INSTANCE.post("/user/login", { uEmail, uPassword });
            console.log("RSPNS", rspns.data);
        } catch (error) {
            console.log("ERR:", error.message);
        }
    };
    const handleNeXt = () => {
        setShowBio(true);
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        try {
            if (CurrentState === "signUp" && ShowBio) {
                // let base64Image = "";
                // const reader = new FileReader();
                // reader.readAsDataURL(uProPic)
                // reader.onload = async () => {
                //     base64Image = reader.result;
                // }
                formData.append("uFullName", uFullName);
                formData.append("uUserName", uUserName);
                formData.append("uEmail", uEmail);
                formData.append("uPassword", uPassword);
                formData.append("uBio", uBio);
                if(uProPic){
                    formData.append("uProPic", uProPic);
                }
                let rsp = await API_INSTANCE.post("/user/create", formData
                )
                console.log(rsp.data);
                navigateTO("/")
            }
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
        setShowBio(false);
    };

    return (
        <div className="w-full min-h-screen items-center flex gap-12 rounded-md justify-center backdrop-blur-2xl border-2 border-gray-400 p-8">

            {/* LEFT SIDE */}
            <div className="border border-gray-400 py-14 px-12 space-y-8 rounded-md bg-blue-600/15 flex flex-col justify-center place-items-center">
                <Logo />

                {/* FORM */}
                <form
                    onSubmit={CurrentState === 'login' ? handleLogin : handleSignUp}
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
                                type="text"
                                placeholder="Set  user-name"
                                value={uUserName}
                                onChange={(a) => setUserName(a.target.value)}
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
                        <div className="w-full flex flex-col space-y-2 justify-center items-center">
                            <div className="rounded-full overflow-hidden bg-gray-300 border border-black w-26 h-26 flex items-center justify-center p-px">
                                <input type="file" onChange={(a) => setProPic(a.target.files[0])}
                                    className="hidden" id="pic" />
                                {
                                    uProPic ? (

                                        <img src={URL.createObjectURL(uProPic)} alt="Profile img" className="rounded-full " />
                                    ) : (
                                        <span className="text-xl font-extrabold">{uFullName.toUpperCase().slice(0, 1)}</span>
                                    )
                                }
                            </div>
                            <label htmlFor="pic" className="cursor-pointer text-sm mb-4">Choose image</label>
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

                    {/* Handle buttons */}
                    {
                        CurrentState === 'signUp' && !ShowBio && (
                            <button onClick={handleNeXt} className="cursor-pointer w-full border border-gray-500 rounded-md bg-blue-900/80 text-white p-2 transition duration-200 hover:bg-blue-900">Next</button>
                        )
                    }
                    {
                        CurrentState === 'signUp' && ShowBio && (
                            <button
                                type={!ShowBio ? 'button' : 'submit'}
                                onClick={!ShowBio ? handleNeXt : undefined}
                                className="cursor-pointer w-full border border-gray-500 rounded-md bg-blue-900/80 text-white p-2 transition duration-200 hover:bg-blue-900"> Create Account
                            </button>
                        )
                    }
                    {CurrentState === 'login' && (
                        <button
                            type="button"
                            onClick={CurrentState === 'login' ? handleLogin : handleNeXt}
                            className={`cursor-pointer w-full border border-gray-500 rounded-md bg-blue-900/80 text-white p-2 transition duration-200 hover:bg-blue-900`}
                        > Login </button>
                    )}
                    {/* TOGGLE */}
                    <div>
                        {CurrentState === 'signUp' ? (
                            <p>
                                Already have an account?
                                <span
                                    onClick={toggleForm}
                                    className="underline text-white/65 cursor-pointer ml-1">
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