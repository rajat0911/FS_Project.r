import { useEffect, useState, } from "react";
import { getCurrentUser, } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  const userName = user?.user_metadata?.name || user?.user_metadata?.full_name ||
    `${user?.user_metadata?.given_name || ""}
     ${user?.user_metadata?.family_name || ""}`.trim() ||
    user?.email?.split("@")[0] || "Founder";

  const joinDate = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown";

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    }
    loadUser();
  }, []);

  return (
    <div className="min-h-screen px-8 py-12">

      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON */}

        <div className="mb-6">

          <button onClick={() => navigate("/")}
            className=" px-4 py-2 rounded-xl border border-slate-700 hover:border-cyan-500/40 hover:bg-slate-800 transition cursor-pointer " >
            ← Back to Dashboard
          </button>

        </div>

        {/* HERO */}

        <div className=" relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-10 mb-8 " >
          <div className=" absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full " />

          <div className="flex items-center gap-6">

            <div className=" h-28 w-28 rounded-full overflow-hidden border-4 border-cyan-500/20 shadow-lg shadow-cyan-500/20 " >
              {user?.user_metadata?.picture ? (

                <img src={user.user_metadata.picture} alt="Profile" className=" h-full w-full object-cover " />) : (
                <div className=" h-full w-full bg-cyan-500 flex items-center justify-center text-black text-3xl font-bold " >
                  {userName[0]?.toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-4xl font-bold"> {userName} </h1>
              {/* LINKEDIN BADGE */}

              {user?.app_metadata?.providers?.includes("linkedin_oidc") && (
                <div
                  className=" inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm " >
                  ✓ LinkedIn Connected
                </div>
              )}

              {/* PROVIDERS */}

              <div className="flex gap-2 mt-3">

                {user?.app_metadata?.providers?.map((provider: string) => (
                  <span key={provider} className=" px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs " >
                    {provider === "linkedin_oidc" ? "LinkedIn" : "Email"}
                  </span>
                )
                )}
              </div>

              <p className="text-slate-400 mt-4"> Founder Account </p>

              <p className="text-slate-500 mt-1"> Member since {joinDate} </p>

              <div
                className=" inline-flex items-center mt-4 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm " >
                ● Active Account
              </div>
            </div>
          </div>
        </div>

        {/* GRID */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* ACCOUNT DETAILS */}
          <div className=" lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-8 " >

            <h2 className="text-2xl font-bold mb-6"> Account Details </h2>
            <div className="space-y-6">

              <div>
                <p className="text-slate-400"> Email </p>
                <p className="text-lg mt-1"> {user?.email} </p>

              </div>

              <div>
                <p className="text-slate-400"> User ID </p>
                <p className="text-lg mt-1"> {user?.id?.slice(0, 12)}... </p>
              </div>
            </div>
          </div>

          {/* USAGE */}

          <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-8 " >
            <h2 className="text-2xl font-bold mb-6"> Usage </h2>
            <div className="space-y-6">

              <div>
                <p className="text-slate-400"> Startup Analyses </p>
                <p className="text-3xl font-bold mt-1"> 0 </p>
              </div>

              <div>
                <p className="text-slate-400"> Reports Generated </p>
                <p className="text-3xl font-bold mt-1"> 0 </p>
              </div>

              <div>
                <p className="text-slate-400"> Account Type </p>
                <p className="text-xl font-semibold mt-1"> Founder </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;