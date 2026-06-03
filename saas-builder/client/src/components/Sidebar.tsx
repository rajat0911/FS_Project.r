import { useEffect, useState } from "react";

import { getCurrentUser, signOut, } from "../services/auth.service";

function Sidebar() {

  const [isCollapsed, setIsCollapsed,] = useState(false);

  const [userEmail, setUserEmail,] = useState("");
  useEffect(() => {

    async function loadUser() {
      const user = await getCurrentUser();
      if (user?.email) { setUserEmail(user.email); }
    }
    loadUser();
  },
    []);

  async function handleLogout() {

    try { await signOut(); window.location.reload(); }
    catch (error) { console.log(error); }
  }

  return (
    <div className={` border-r border-slate-800 bg-slate-950 flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-72" } `} >
      {/* HEADER */}

      <div className="p-4">
        <div className="flex justify-end mb-4">

          <button onClick={() => setIsCollapsed( prev => !prev ) } 
          className=" h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition " >
            {isCollapsed ? "→" : "←"}
          </button>

        </div>

        <div className="flex items-center gap-3">

          <div className=" h-12 w-12 rounded-xl bg-white flex items-center justify-center overflow-hidden " >
            <img src="/new_Log.png" alt="Logo" className=" h-10 w-10 object-contain " />
          </div>

          {!isCollapsed && (

            <div> <h1 className=" text-lg font-bold text-white " >
                AI SaaS Consultant
              </h1>

              <p className=" text-xs text-slate-400 " >
                Build smarter SaaS ideas
              </p>
            </div>
          )}

        </div>
      </div>

      {/* BODY */}

      <div className="flex-1 px-4">

        <button className=" w-full rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 transition py-3 px-4 text-left " >
          {isCollapsed ? "+" : "+ New Chat"}
        </button>

      </div>

      {/* FOOTER */}

      <div className=" border-t border-slate-800 p-4 " >

        <div className=" flex items-center gap-3 mb-3 " >

          <div className=" h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold " >

            {userEmail ? userEmail[0] .toUpperCase() : "U"}

          </div>

          {!isCollapsed && (

            <div className=" overflow-hidden " >

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
        className=" w-full rounded-xl bg-slate-900 hover:bg-red-500/20 border border-slate-800 hover:border-red-500/30 transition py-2 text-sm text-slate-300 " >
          {isCollapsed ? "↩" : "↩ Logout"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;