import { useEffect, useState } from "react";

import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";

import { getCurrentUser } from "./services/auth.service";

import { supabase }
from "./lib/supabase";

function App() {

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    async function loadUser() {

      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      setLoading(false);
    }

    loadUser();

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(

      async (_event, session) => {

        setUser(
          session?.user ?? null
        );

        setLoading(false);
      }
    );

    return () => {

      authListener.subscription.unsubscribe();
    };

  }, []);

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        bg-slate-950
        text-white
        flex
        items-center
        justify-center
        "
      >

        Loading...

      </div>

    );
  }

  if (!user) {

    return <AuthPage />;
  }

  return <ChatPage />;
}

export default App;