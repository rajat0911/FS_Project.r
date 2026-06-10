import { useState } from "react";

import { signIn, signUp, signInWithGoogle, signInWithLinkedIn, } from "../services/auth.service";

function AuthPage() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [isLogin, setIsLogin] = useState(true);

    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {

        e.preventDefault(); setError("");
        try {
            if (isLogin) {
                await signIn(email, password);
            } else {
                await signUp(email, password);
            }
            window.location.reload();

        } catch (err: any) {
            setError(err.message || "Authentication failed");
        }
    }

    return (

        <div className=" min-h-screen relative overflow-hidden text-white flex items-center justify-center px-6 " >

            {/* Glow 1 */}

            <div className=" absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-200/5 blur-3xl " />

            {/* Glow 2 */}

            <div className=" absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-200/10 blur-3xl " />

            <div className=" w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10 " >

                {/* LEFT SIDE */}

                <div className="hidden lg:block"> <div className=" inline-flex items-center gap-4 mb-8 " >

                    <img src="/new_Log.png" alt="Logo" className=" h-16 w-16 rounded-2xl bg-white p-2 " />

                    <div> <h1 className=" text-4xl font-bold " >
                        AI SaaS Consultant
                    </h1>
                        <p className="text-slate-400">
                            Startup Validation Platform
                        </p>

                    </div>
                </div>
                    <h2 className=" text-5xl font-bold leading-tight mb-6 " >
                        Turn Startup Ideas Into
                        <span className=" text-cyan-400 " >
                            {" "}Actionable Business Plans
                        </span>
                    </h2>

                    <p className=" text-slate-400 text-lg mb-10 max-w-xl " >
                        Validate your startup idea, understand your market,
                        estimate revenue potential,
                        and receive investor-style business insights powered by AI.
                    </p>

                    <div className="space-y-5">

                        <Feature text="Market Opportunity Analysis" />

                        <Feature text="Audience & Customer Validation" />

                        <Feature text="Revenue & Monetization Insights" />

                        <Feature text="Competition Research" />

                        <Feature text="Investor Readiness Evaluation" />

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl " >

                    <div className="text-center mb-8">
                        <img src="/new_Log.png" alt="Logo" className=" h-16 w-16 mx-auto mb-4 rounded-2xl bg-white p-2 " />

                        <h1 className=" text-3xl font-bold " >
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>

                        <p className=" text-slate-400 mt-2 " >
                            Access your AI startup workspace
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" >

                        <div className="grid grid-cols-2 gap-3">

                            <button
                                type="button"
                                onClick={signInWithGoogle}
                                className="
    flex
    items-center
    justify-center
    gap-3
    bg-white
    text-black
    py-4
    rounded-xl
    font-medium
    hover:bg-slate-100
    transition
    cursor-pointer
    "
                            >

                                <img
                                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                    alt="Google"
                                    className="h-5 w-5"
                                />

                                Google

                            </button>

                            <button
                                type="button"
                                onClick={signInWithLinkedIn}
                                className="
    flex
    items-center
    justify-center
    gap-3
    bg-[#0077B5]
    text-white
    py-4
    rounded-xl
    font-medium
    hover:opacity-90
    transition
    cursor-pointer
    "
                            >

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path d="M20.447 20.452H16.89V14.87c0-1.331-.027-3.045-1.856-3.045-1.858 0-2.143 1.45-2.143 2.949v5.678H9.336V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.603 0 4.268 2.372 4.268 5.456v6.285zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.119 20.452H3.556V9H7.12v11.452z" />
                                </svg>

                                LinkedIn

                            </button>

                        </div>

                        <div className="flex items-center gap-4 my-4">

                            <div className="h-px bg-slate-700 flex-1" />

                            <span className="text-slate-500 text-sm">
                                Continue with Email
                            </span>
                            <div className="h-px bg-slate-700 flex-1" />
                        </div>

                        <input type="email" placeholder="Email Address" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=" w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none " />

                        <input type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=" w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none " />

                        {error && (<div className=" bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm " >
                            {error}
                        </div>
                        )}

                        <button type="submit"
                            className=" w-full bg-cyan-500 hover:bg-cyan-400 transition py-4 rounded-xl font-semibold text-black cursor-pointer" >
                            {isLogin ? "Login" : "Create Account"}
                        </button>

                    </form>
                    <div className=" text-center mt-6 " >
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className=" text-cyan-400 hover:text-cyan-300 transition cursor-pointer" >
                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Feature({ text, }: { text: string; }) {
    return (
        <div className=" flex items-center gap-3 " >

            <div className=" h-6 w-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center " >
                ✓
            </div>

            <span className=" text-slate-300 " >
                {text}
            </span>
        </div>
    );
}

export default AuthPage;