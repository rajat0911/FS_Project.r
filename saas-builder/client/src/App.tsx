import {
  useEffect,
  useState,
} from "react";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ChatPage from "./pages/ChatPage";

import AuthPage from "./pages/AuthPage";

import DashboardPage from "./pages/DashboardPage";

import ProfilePage from "./pages/ProfilePage";

import {
  getCurrentUser,
} from "./services/auth.service";

import {
  supabase,
} from "./lib/supabase";

function App() {

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {

    async function loadUser() {

      const currentUser =
        await getCurrentUser();

      setUser(
        currentUser
      );

      setLoading(false);
    }

    loadUser();

    const {
      data: authListener,
    } =
      supabase.auth.onAuthStateChange(

        async (
          _event,
          session
        ) => {

          setUser(
            session?.user ?? null
          );

          setLoading(false);
        }
      );

    return () => {

      authListener
        .subscription
        .unsubscribe();
    };

  }, []);

  if (loading) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
        "
      >
        Loading...
      </div>

    );
  }

  if (!user) {

    return <AuthPage />;
  }

  return (

    <Routes>

      <Route
        path="/"
        element={
          <DashboardPage />
        }
      />

      <Route
        path="/chat"
        element={
          <ChatPage />
        }
      />

      <Route
        path="/profile"
        element={
          <ProfilePage />
        }
      />

      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />

    </Routes>
  );
}

export default App;