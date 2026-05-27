import { useState } from "react";

import { resetChat }
from "../services/chat.service";

function Sidebar() {

  const [
    isCollapsed,
    setIsCollapsed,
  ] = useState(false);

  const handleNewChat =
    async () => {

      await resetChat();

      window.location.reload();
    };

  return (

    <div
      className={`
        border-r border-slate-800
        p-4
        flex flex-col
        transition-all duration-200
        ${isCollapsed ? "w-20" : "w-72"}
      `}
    >

      <div className="flex justify-end mb-3">

        <button
          onClick={() =>
            setIsCollapsed(
              (prev) => !prev
            )
          }
          className="
            bg-slate-800
            hover:bg-slate-700
            rounded-lg
            px-3
            py-1
            text-sm
          "
        >

          {isCollapsed ? ">" : "<"}

        </button>

      </div>

      {/* HEADER */}
      <div className="mb-5">

        <div className="flex items-center gap-3 mb-3">

          <img
            src="/new_Log.png"
            alt="CloudTrains logo"
            className="
              h-10
              w-10
              rounded-lg
              object-contain
              bg-white
              p-1
            "
          />

          {!isCollapsed && (

            <h1 className="text-2xl font-bold leading-none">

              AI SaaS Consultant

            </h1>

          )}

        </div>

        {!isCollapsed && (

          <p className="text-sm text-slate-400 mt-2">

            Build smarter SaaS ideas with AI guidance.

          </p>

        )}

      </div>

      {/* NEW CHAT */}
      <button
        onClick={handleNewChat}
        className="
          bg-white
          text-black
          rounded-xl
          px-4
          py-3
          font-medium
          hover:bg-slate-200
          transition
          mb-4
        "
      >

        {isCollapsed
          ? "+"
          : "+ New Chat"}

      </button>
    </div>
  );
}

export default Sidebar;