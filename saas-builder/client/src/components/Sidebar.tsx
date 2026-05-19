import { resetChat } from "../services/chat.service";

function Sidebar() {
  const handleNewChat = async () => {
  await resetChat();

  window.location.reload();
};
  return (
    <div className="w-72 border-r border-slate-800 p-4 flex flex-col">
      
      <div className="mb-8">
            <p className="text-sm text-slate-400 mt-1">
                AI Product Consultant
            </p>
      </div>

      <button 
      onClick={handleNewChat}
      className="bg-white text-black rounded-lg px-4 py-3 font-medium hover:bg-slate-200 transition">
        + New Chat
      </button>

      <div className="mt-6 space-y-2">
        
        <div className="p-3 rounded-lg bg-slate-900 hover:bg-slate-800 cursor-pointer transition">
          SaaS Idea Discussion
        </div>

        <div className="p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition">
          AI Startup Planning
        </div>

      </div>

    </div>
  );
}

export default Sidebar;