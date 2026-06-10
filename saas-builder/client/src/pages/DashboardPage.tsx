import { useNavigate, } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { BarChart3, Target, FileText, } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

import { motion } from "framer-motion";

import { getCurrentUser, signOut, } from "../services/auth.service";

function DashboardPage() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState<any>(null);

    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        async function loadUser() {

            const currentUser = await getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
                setUserName(
                    currentUser.user_metadata?.name ||
                    currentUser.user_metadata?.full_name ||
                    currentUser.email?.split("@")[0] ||
                    "Founder"
                );
            }
        } loadUser();
    }, []);

    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (

        <div className=" min-h-screen px-8 py-12 " >
            <div className=" max-w-6xl mx-auto " >
                {/* NAVBAR */}

                <div className=" sticky top-6 z-50 bg-slate-950/70 backdrop-blur-xl border border-slate-800 rounded-3xl px-6 py-4 mb-12 " >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className=" h-12 w-12 rounded-xl bg-white flex items-center justify-center overflow-hidden " >
                                <img src="/new_Log.png" alt="Logo" className="h-9 w-9" />
                            </div>

                            <div>
                                <h2 className="font-bold text-lg"> SparkAI </h2>
                                <p className="text-xs text-slate-500"> AI Startup Consultant </p>
                            </div>

                        </div>

                        <div className="hidden md:flex gap-8 text-slate-400">
                            <button className=" text-slate-400 hover:text-white transition duration-300 " > Features </button>
                            <button className=" text-slate-400 hover:text-white transition duration-300 " > How It Works </button>
                            <button className=" text-slate-400 hover:text-white transition duration-300 " > Testimonials </button>
                            <button onClick={() => navigate("/contact")}
                                className=" text-slate-400 hover:text-white transition duration-300 " >
                                Contact
                            </button>
                        </div>

                        <div ref={menuRef} className="relative" >

                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="cursor-pointer flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl px-3 py-2 hover:border-cyan-500/30 transition " >

                                <img src={user?.user_metadata?.picture} alt="Profile"
                                    className=" h-10 w-10 rounded-full object-cover " />
                                <span className="font-medium"> {userName} </span>

                                <span className={` transition-transform duration-300 ${showMenu ? "rotate-180" : ""} `} > ▼ </span>
                            </button>

                            {showMenu && (
                                <div
                                    className=" hover:border-cyan-500/20 transition-all 
                                duration-300 absolute right-0 mt-3 w-64 bg-slate-900 border 
                                border-slate-800 rounded-3xl p-3 shadow-2xl " >

                                    <div className="mt-3 space-y-2">

                                        <button
                                            onClick={() => { setShowMenu(false); navigate("/profile"); }}
                                            className=" cursor-pointer w-full text-left px-4 py-3 rounded-xl hover:bg-slate-800 transition " >
                                            Profile
                                        </button>

                                        <button
                                            onClick={() => { setShowMenu(false); navigate("/chat"); }}
                                            className=" cursor-pointer w-full text-left px-4 py-3 rounded-xl hover:bg-slate-800 transition " >
                                            Start Analysis
                                        </button>

                                        <button
                                            onClick={async () => { await signOut(); window.location.reload(); }}
                                            className=" w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition cursor-pointer " >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>

                {/* HERO */}

                <div className=" relative overflow-hidden text-center py-24 " >

                    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-cyan-500/10 blur-[180px] " />
                    <div className=" absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[180px] " />
                    <div className="relative z-10">

                        <p className=" text-cyan-400 uppercase tracking-[0.3em] text-sm mb-6 " >
                            AI-Powered Startup Intelligence
                        </p>

                        <h1 className=" text-6xl md:text-7xl font-bold leading-tight mb-8 " > Validate Startup Ideas
                            <br />
                            Before You Build Them
                        </h1>

                        <p className=" max-w-3xl mx-auto text-xl text-slate-400 leading-9 mb-10 " >
                            Generate investor-grade startup evaluations,
                            market validation reports,
                            revenue projections,
                            and strategic recommendations
                            in minutes.
                        </p>

                        <div className=" flex flex-wrap justify-center gap-4 " >
                            <button onClick={() => navigate("/chat")}
                                className="cursor-pointer group bg-cyan-500 hover:bg-cyan-400 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] text-black px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 " >
                                Start Free Analysis
                            </button>

                            <button onClick={() => navigate("/report")}
                                className="cursor-pointer border border-slate-700 hover:border-cyan-500/30 hover:bg-slate-900 hover:scale-105 px-10 py-4 rounded-2xl text-lg transition-all duration-300 " >
                                View Sample Report
                            </button>
                        </div>

                        <p className=" mt-10 text-slate-500 " > Welcome back, {userName} 👋 </p>

                        {/* PRODUCT PREVIEW */}

                        <motion.div className=" max-w-4xl mx-auto mt-16 " animate={{ y: [0, -13, 0], }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", }} >

                            <div className=" bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl " >

                                {/* TOP BAR */}
                                <div className=" flex items-center gap-2 px-6 py-4 border-b border-slate-800 " >

                                    <div className="h-3 w-3 rounded-full bg-red-500" />

                                    <div className="h-3 w-3 rounded-full bg-yellow-500" />

                                    <div className="h-3 w-3 rounded-full bg-green-500" />

                                </div>

                                {/* CONTENT */}

                                <div className="p-8">
                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-2"> Startup Evaluation Report </h3>
                                        <p className="text-slate-400"> Investor-grade AI startup assessment </p>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <PreviewMetric title="Market Size" value="$2.1B" />
                                        <PreviewMetric title="Investor Interest" value="8.4/10" />
                                        <PreviewMetric title="Success Rate" value="72%" />
                                    </div>

                                    <div className=" mt-8 bg-slate-950 border border-slate-800 rounded-2xl p-5 " >
                                        <p className="text-green-400 mb-3"> Key Strength </p>
                                        <p className="text-slate-300">
                                            Large market opportunity with strong recurring revenue potential.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* STATISTICS */}

                        <AnimatedSection>

                            <div className="mb-24 mt-24">
                                <div className=" grid grid-cols-2 md:grid-cols-4 gap-6 " >
                                    <StatCard number="2 min" label="Average Analysis Time" />
                                    <StatCard number="30+" label="Startup Factors Evaluated" />
                                    <StatCard number="AI" label="Investor Grade Insights" />
                                    <StatCard number="24/7" label="Always Available" />
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>

                {/* TRUSTED BY */}
                <AnimatedSection>

                    <div className="mb-24">

                        <p className=" text-center text-slate-500 uppercase tracking-[0.2em] text-sm mb-10 " >
                            Powered By Modern AI Infrastructure
                        </p>

                        <div className=" grid grid-cols-2 md:grid-cols-5 gap-4 " >
                            {[
                                "Google Gemini",
                                "Supabase",
                                "Vercel",
                                "React",
                                "TypeScript",
                            ].map((item) => (
                                <div key={item}
                                    className=" bg-slate-900 border border-slate-800 rounded-2xl py-5 text-center text-slate-400 hover:border-cyan-500/20 transition " >
                                    {item}
                                </div>

                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* FEATURES */}

                <div className="mb-24">

                    <div className="text-center mb-16">

                        <h2 className="text-5xl font-bold mb-4"> Everything You Need To Validate A Startup </h2>
                        <p className="text-slate-400 text-lg"> From market validation to investor insights. </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-6">

                        <FeatureCard
                            index={0}
                            icon={<BarChart3 size={28} />}
                            title="Market Intelligence"
                            description="..."
                        />

                        <FeatureCard
                            index={1}
                            icon={<Target size={28} />}
                            title="Investor Evaluation"
                            description="Understand startup attractiveness through investor-grade analysis."
                        />

                        <FeatureCard
                            index={2}
                            icon={<FileText size={28} />}
                            title="Strategic Reports"
                            description="Receive actionable recommendations for launch and growth."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ title, description, icon, index }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) {
    return (

        <motion.div
            initial={{ opacity: 0, y: 30, }}
            whileInView={{ opacity: 1, y: 0, }}
            viewport={{ once: true, }}
            transition={{ duration: 0.5, delay: index * 0.15, }}
            className=" bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/20 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 " >
            <div className="mb-6">
                <div
                    className=" h-14 w-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 " >
                    {icon}
                </div>
            </div>

            <h3 className=" text-2xl font-bold mb-4 " > {title} </h3>
            <p className=" text-slate-400 leading-8 " > {description} </p>
        </motion.div>
    );
}

function PreviewMetric({ title, value, }: { title: string; value: string; }) {

    return (
        <div className=" bg-slate-950 border border-slate-800 rounded-2xl p-5 " >
            <p className="text-slate-500 text-sm mb-2"> {title} </p>
            <p className="text-xl font-bold"> {value} </p>
        </div>
    );
}

function StatCard({ number, label, }: { number: string; label: string; }) {
    return (
        <div
            className=" bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:-translate-y-2 hover:border-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 " >
            <div className=" text-4xl font-bold text-cyan-400 mb-3 " > {number} </div>
            <div className="text-slate-400">
                {label}
            </div>
        </div>
    );
}

export default DashboardPage;