import { useState } from "react";
import NodeBackground from "./components/NodeBackground";
import TrilemmaSimulator from "./components/TrilemmaSimulator";
import ConsensusExplorer from "./components/ConsensusExplorer";
import ComparisonMode from "./components/ComparisonMode";
import MappingAndLayers from "./components/MappingAndLayers";
import CompatibilityHeatmap from "./components/CompatibilityHeatmap";
import ComparisonTable from "./components/ComparisonTable";
import {
  FaCube,
  FaBook,
  FaExchangeAlt,
  FaLayerGroup,
  FaBalanceScale,
  FaTh
} from "react-icons/fa";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-10 md:py-16 space-y-6 relative max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2 animate-pulse">
                <FaCube className="text-[10px]" /> Interactive Learning Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Consensus Algorithms in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 animate-neon-text">
                  Blockchain Networks
                </span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Explore how different blockchain consensus mechanisms secure decentralized networks,
                solve Vitalik Buterin's Blockchain Trilemma, and power modern global economies.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={() => setActiveTab("explorer")}
                  className="px-8 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-[0_0_15px_rgba(245,197,24,0.3)] text-sm uppercase tracking-wider"
                >
                  Explore Algorithms
                </button>
                <button
                  onClick={() => setActiveTab("compare")}
                  className="px-8 py-3.5 bg-[#121214]/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-bold rounded-xl transition duration-300 transform hover:scale-[1.02] text-sm uppercase tracking-wider"
                >
                  Compare Side-by-Side
                </button>
              </div>
            </section>

            {/* Introduction to Blockchain */}
            <section className="space-y-6 max-w-5xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">Blockchain Foundations</h2>
                <p className="text-zinc-400 text-sm mt-1">Understanding the fundamental nature of shared ledgers</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className="bg-[#121214]/80 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-yellow-400">What is Blockchain?</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      A blockchain is a distributed digital ledger that stores records in blocks linked together using cryptographic hashes.
                      Instead of relying on a central authority, copies of the ledger are maintained by thousands of independent nodes.
                      Once recorded, transactions are verified collectively and become practically immutable.
                    </p>
                  </div>
                  <div className="border-t border-zinc-850 mt-4 pt-4 text-xs text-zinc-400">
                    * Removes intermediate parties, lowering transaction frictions.
                  </div>
                </div>

                <div className="bg-[#121214]/80 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between text-left">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-yellow-400">Why Consensus is Required</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      Without a central clearinghouse (like Visa or a central bank), participants in a distributed network must agree on the validity of transactions.
                      Consensus algorithms solve this by mathematically proving which block of transactions is valid, dictating block authorship, and preventing double spending.
                    </p>
                  </div>
                  <div className="border-t border-zinc-850 mt-4 pt-4 text-xs text-zinc-400">
                    * Guarantees network safety, liveness, and order.
                  </div>
                </div>
              </div>

              {/* Pillars of Blockchain */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { title: "Decentralization", desc: "No central point of control" },
                  { title: "Transparency", desc: "Verifiable transaction histories" },
                  { title: "Immutability", desc: "Tamper-proof records" },
                  { title: "Security", desc: "Cryptographic protection" },
                  { title: "Fault Tolerance", desc: "Survives offline nodes" }
                ].map((pillar, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121214]/50 border border-zinc-800 rounded-xl p-4 text-center hover:border-yellow-500/40 transition duration-200"
                  >
                    <h4 className="font-bold text-sm text-zinc-200">{pillar.title}</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-normal">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case "trilemma":
        return <TrilemmaSimulator />;
      case "explorer":
        return <ConsensusExplorer />;
      case "compare":
        return <ComparisonMode />;
      case "languages":
        return <MappingAndLayers />;
      case "analytics":
        return (
          <div className="space-y-8">
            <CompatibilityHeatmap />
            <ComparisonTable />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative px-4 md:px-8 max-w-7xl mx-auto py-4">
      {/* Interactive Background */}
      <NodeBackground />

      {/* Header / Nav */}
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
            { id: "analytics", label: "Analytics", icon: <FaTh /> }
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

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">{renderTabContent()}</main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-6 text-center text-xs text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-2 mt-auto bg-[#070708]/90 z-20">
        <span>© 2026 Blockchain Consensus Explorer. Designed for interactive ledger education.</span>
        <div className="flex space-x-4">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">
            GitHub
          </a>
          <span>•</span>
          <a href="https://ethereum.org" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">
            Ethereum Docs
          </a>
          <span>•</span>
          <a href="https://solana.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">
            Solana Specs
          </a>
        </div>
      </footer>
    </div>
  );
}
