import { useNavigate, } from "react-router-dom";

import { getCurrentUser, } from "../services/auth.service";
import { useEffect, useState, } from "react";

function DashboardPage() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");

    useEffect(() => {

        async function loadUser() {

            const user = await getCurrentUser();
            if (user) {
                setUserName( user.user_metadata?.full_name || user.email?.split("@")[0] || "Founder" );
            }
        } loadUser(); 
    }, []);

    return (

        <div className=" min-h-screen px-8 py-12 " >
            <div className=" max-w-6xl mx-auto " >
                {/* HERO */}
                <div className=" bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-3xl p-12 mb-10 text-center " >
                    <div className=" flex justify-center mb-6 " >

                        <div className=" h-24 w-24 rounded-3xl bg-white flex items-center justify-center overflow-hidden shadow-lg " >
                            <img src="/new_Log.png" alt="Logo" className=" h-20 w-20 object-contain " />
                        </div>
                    </div>
                    <h1 className=" text-4xl md:text-5xl font-bold mb-3 " >
                        AI SaaS Consultant
                    </h1>

                    <p className=" text-slate-400 text-lg mb-8 " >
                        Build, validate and scale startups
                        with AI-powered business intelligence.
                    </p>

                    <h2 className=" text-2xl font-semibold mb-3 " >
                        Good to see you, {userName} 👋
                    </h2>

                    <p className=" text-slate-400 mb-8 " >
                        Ready to validate your next startup idea?
                    </p>

                    <button onClick={() => navigate("/chat") } 
                    className=" bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-4 rounded-2xl font-semibold text-lg transition " >
                        Start New Startup Analysis
                    </button>

                </div>


                {/* RECENT ACTIVITY */}

                <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-6 " >

                    <h2 className=" text-2xl font-bold mb-4 " >
                        Recent Activity
                    </h2>

                    <p className="text-slate-400"> No startup analyses yet. </p>
                    <p className=" text-slate-500 mt-2 " >
                        Start your first startup
                        analysis to receive
                        AI-generated insights.
                    </p>

                </div>


                {/* STATS */}

                <div className=" grid md:grid-cols-3 gap-6 mb-12 " >

                    <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-6 " >

                        <h3 className="text-slate-400">
                            Startup Analyses
                        </h3>

                        <p className=" text-5xl font-bold mt-3 " > 0 </p>
                    </div>

                    <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-6 " >

                        <h3 className="text-slate-400"> Reports Generated </h3>

                        <p className=" text-5xl font-bold mt-3 " > 0 </p>
                    </div>

                    <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-6 " >
                        <h3 className="text-slate-400">
                            Account Status
                        </h3>

                        <p className=" text-xl font-semibold text-green-400 mt-4 " > Active </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;