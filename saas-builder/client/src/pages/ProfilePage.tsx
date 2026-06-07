import { useEffect, useState, } from "react";
import { getCurrentUser, } from "../services/auth.service";

function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => { async function loadUser() 
    { const currentUser = await getCurrentUser(); setUser( currentUser ); }
    loadUser();
  }, 
[]);

  return (

    <div className=" min-h-screen flex items-center justify-center px-6 " >
      <div className=" bg-slate-900 border border-slate-800 rounded-3xl p-10 w-full max-w-xl " >
        <h1 className=" text-4xl font-bold mb-8 " > Profile </h1>
        <div className="space-y-4">
          <div>
            <p className="text-slate-400"> Email </p>
            <p> {user?.email} </p>
          </div>

          <div>
            <p className="text-slate-400"> User ID </p>
            <p className=" break-all " > {user?.id} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;