import { useState } from "react";
import { Logo } from "../Parts/Logo";

function LoginToAccount() {

    const [email, setEmail] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Bio, setBio] = useState('');

    const [CurrentState, setCurrentState] = useState('signUp');
    const [ShowBio, setShowBio] = useState(false);

    const submitFORM = (a) => {
        a.preventDefault();

        // SIGNUP FLOW
        if (CurrentState === 'signUp') {

            // First Step
            if (!ShowBio) {
                setShowBio(true);
                return;
            }

            // Final Signup Submit
            console.log({
                Name,
                Bio,
                email,
                Password
            });

        } else {

            // LOGIN
            console.log({
                email,
                Password
            });

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
                            value={Name}
                            onChange={(a) => setName(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />

                        <input required
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(a) => setEmail(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />

                        <input required
                            type="password"
                            placeholder="Enter Password"
                            value={Password}
                            onChange={(a) => setPassword(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
                    </>
                )}

                {/* SIGNUP STEP 2 */}
                {CurrentState === 'signUp' && ShowBio && (
                    <textarea
                        required
                        cols={5}
                        rows={4}
                        placeholder="Write Your Bio..."
                        value={Bio}
                        onChange={(a) => setBio(a.target.value)}
                        className="bg-white/65 p-2 w-full resize-none text-xs text-gray-900 border border-gray-500 rounded-md"
                    />
                )}

                {/* LOGIN */}
                {CurrentState === 'login' && (
                    <>
                        <input required
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(a) => setEmail(a.target.value)}
                            className="bg-white/65 p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />

                        <input required 
                            type="password"
                            placeholder="Enter Password"
                            value={Password}
                            onChange={(a) => setPassword(a.target.value)}
                            className="bg-white/65 autofill:none p-2 w-full text-xs text-gray-900 border border-gray-500 rounded-md"
                        />
                    </>
                )}

                <button
                    type="submit"
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