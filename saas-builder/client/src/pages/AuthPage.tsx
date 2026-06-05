import { useState } from "react";

import { signIn, signUp, signInWithGoogle, } from "../services/auth.service";

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

                        <button type="button" onClick={signInWithGoogle}
                            className=" w-full flex items-center justify-center gap-3 bg-white text-black py-4 rounded-xl font-medium hover:bg-slate-100 transition " >

                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google"
                                className="h-5 w-5" />
                            Continue with Google
                        </button>

                        <div className="flex items-center gap-4 my-4">

                            <div className="h-px bg-slate-700 flex-1" />

                            <span className="text-slate-500 text-sm">
                                OR
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
                            className=" w-full bg-cyan-500 hover:bg-cyan-400 transition py-4 rounded-xl font-semibold text-black " >
                            {isLogin ? "Login" : "Create Account"}
                        </button>

                    </form>
                    <div className=" text-center mt-6 " >
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className=" text-cyan-400 hover:text-cyan-300 transition " >
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