import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCurrentUser, signOut, } from "../services/auth.service";

import { LayoutDashboard, Bot, UserCircle, } from "lucide-react";

function Sidebar() {

  const [isCollapsed, setIsCollapsed,] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const navigate = useNavigate();

  const [userEmail, setUserEmail,] = useState("");
  useEffect(() => {
    async function loadUser() { const user = await getCurrentUser(); if (user?.email) { setUserEmail(user.email); } } loadUser();
  },
    []);

  async function handleLogout() {

    try { await signOut(); navigate("/"); }
    catch (error) { console.log(error); }
  }

  return (
    <div
      className={` flex flex-col transition-all duration-300 
    ${isCollapsed ? "w-20 bg-transparent" : "w-72 bg-slate-950 border-r border-slate-800"} `} >
      {/* HEADER */}

      <div className="p-4" onMouseEnter={() => setShowExpandButton(true)} onMouseLeave={() => setShowExpandButton(false)} >

        <div className="flex items-center justify-between">
          <div className="relative flex items-center gap-3">
            <div className=" h-12 w-12 rounded-xl bg-white flex items-center justify-center overflow-hidden " >
              <img src="/new_Log.png" alt="Logo" className="h-10 w-10 object-contain" />
            </div>

            {!isCollapsed && (

              <div>
                <h1 className="text-lg font-bold text-white">
                  AI SaaS Consultant
                </h1>
                <p className="text-xs text-slate-400">
                  Build smarter SaaS ideas
                </p>
              </div>
            )}

            {isCollapsed && (

              <button onClick={() => setIsCollapsed(false)}
                className={` absolute left-0 top-0 h-12 w-12 rounded-xl bg-slate-900/90 border border-slate-700 transition-all duration-300
          ${showExpandButton ? "opacity-100" : "opacity-0 pointer-events-none"} cursor-pointer`} >
                →
              </button>
            )}

          </div>

          {!isCollapsed && (

            <button onClick={() => setIsCollapsed(true)}
              className=" h-10 w-10 rounded-xl bg-slate-900/70 border border-slate-700 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer" >
              ←
            </button>
          )}
        </div>
      </div>
      {/* BODY */}

      <div className="flex-1 px-4 space-y-2">
        <div 
        onClick={() => navigate("/")}
        className="
        flex items-center gap-4 group w-full rounded-2xl 
        border border-slate-800 bg-slate-900/40 hover:bg-slate-800/70 hover:border-cyan-500/30 
        backdrop-blur-sm transition-all duration-300 py-3 px-4 text-left cursor-pointer " >
          <LayoutDashboard
            size={19}
            className=" text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 " />
          {!isCollapsed && (
            <span className=" text-slate-300 group-hover:text-white transition-colors duration-300 " >
              Dashboard
            </span>
          )}
        </div>

        <div 
        onClick={() => navigate("/new-analysis")}
        className=" flex items-center gap-4 group w-full rounded-2xl border
             border-slate-800 bg-slate-900/40 hover:bg-slate-800/70 hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-300
             py-3 px-4 text-left cursor-pointer " >
          <Bot
            size={19}
            className=" text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 " />
          {!isCollapsed && (
            <span className=" text-slate-300 group-hover:text-white transition-colors duration-300 " >
              New Analysis
            </span>
          )}
        </div>

        <div 
        onClick={() => navigate("/profile")}
        className=" flex items-center gap-4 group w-full
             rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/70
             hover:border-cyan-500/30 backdrop-blur-sm transition-all duration-300 py-3 px-4 text-left cursor-pointer " >
          <UserCircle size={19}
            className=" text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 " />
          {!isCollapsed && (
            <span className=" text-slate-300 group-hover:text-white transition-colors duration-300 " >
              Profile
            </span>
          )}
        </div>

      </div>

      {/* FOOTER */}

      <div className="p-4 cursor-pointer" onClick={() => navigate("/profile")}>

        <div className=" flex items-center gap-3 mb-3 " >

          <div className=" h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold " >

            {userEmail ? userEmail[0].toUpperCase() : "U"}

          </div>

          {!isCollapsed && (

            <div className=" overflow-hidden" 
            
            >

              <p className=" text-sm text-white truncate " >
                {userEmail}
              </p>

              <p className=" text-xs text-slate-500 " >
                Logged In
              </p>

            </div>

          )}

        </div>

        <button onClick={handleLogout}
          className=" w-full rounded-xl bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/30 transition py-2 text-sm text-slate-300 cursor-pointer" >
          {isCollapsed ? "↩" : "↩ Logout"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;