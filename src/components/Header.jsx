import {
  FaCube,
  FaBook,
  FaExchangeAlt,
  FaLayerGroup,
  FaBalanceScale,
  FaTh,
  FaUsers
} from "react-icons/fa";

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between py-4 border-b border-zinc-800 gap-4 mb-8 bg-[#070708]/60 backdrop-blur-md sticky top-0 z-50">
      {/* Logo */}
      <button
        onClick={() => setActiveTab("home")}
        className="flex items-center space-x-2 text-left group"
      >
        <div className="w-9 h-9 rounded-lg bg-yellow-500 flex items-center justify-center text-black font-black transition group-hover:scale-105 shadow-[0_0_10px_rgba(245,197,24,0.4)]">
          <FaCube className="text-base" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-white leading-none tracking-tight">
            CONSENSUS<span className="text-yellow-400">EXPLORER</span>
          </h1>
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block mt-0.5">
            Protocol Comparison Engine
          </span>
        </div>
      </button>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap items-center justify-center gap-1.5 bg-[#121214]/90 p-1.5 rounded-xl border border-zinc-800 shadow-md">
        {[
          { id: "home", label: "Home", icon: <FaBook /> },
          { id: "trilemma", label: "Trilemma", icon: <FaBalanceScale /> },
          { id: "explorer", label: "Explorer", icon: <FaCube /> },
          { id: "compare", label: "Compare", icon: <FaExchangeAlt /> },
          { id: "languages", label: "Languages", icon: <FaLayerGroup /> },
          { id: "analytics", label: "Analytics", icon: <FaTh /> },
          { id: "about", label: "About", icon: <FaUsers /> }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                isActive
                  ? "bg-yellow-500 text-black shadow-[0_0_8px_rgba(245,197,24,0.2)] font-extrabold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="text-[10px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
