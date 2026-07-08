import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCode, FaLayerGroup, FaLink, FaQuestionCircle } from "react-icons/fa";
import { smartContractLanguages, layersData } from "../data/consensusData";

export default function MappingAndLayers() {
  const [activeTab, setActiveTab] = useState("languages");
  const [selectedLanguage, setSelectedLanguage] = useState(smartContractLanguages[0].blockchain);
  const [selectedL2, setSelectedL2] = useState(layersData[1].chains[0].name);

  // Get active L2 details
  const activeL2 = layersData[1].chains.find((c) => c.name === selectedL2) || layersData[1].chains[0];

  return (
    <div className="space-y-6 text-left">
      {/* Subnavigation toggle */}
      <div className="flex border-b border-zinc-800 pb-px">
        <button
          onClick={() => setActiveTab("languages")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm tracking-wide transition ${
            activeTab === "languages"
              ? "border-yellow-500 text-yellow-400"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <FaCode /> Smart Contract Languages
        </button>
        <button
          onClick={() => setActiveTab("layers")}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-bold text-sm tracking-wide transition ${
            activeTab === "layers"
              ? "border-yellow-500 text-yellow-400"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <FaLayerGroup /> Layer Classification (L1 vs L2)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "languages" ? (
          <motion.div
            key="languages"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            {/* Sidebar list */}
            <div className="md:col-span-4 space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                Supported Platforms
              </span>
              {smartContractLanguages.map((lang) => {
                const isActive = lang.blockchain === selectedLanguage;
                return (
                  <button
                    key={lang.blockchain}
                    onClick={() => setSelectedLanguage(lang.blockchain)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                      isActive
                        ? "bg-yellow-500/10 border-yellow-500 text-yellow-400"
                        : "bg-[#1e1e22]/50 border-zinc-900 text-zinc-400 hover:bg-[#1e1e22]/80 hover:border-zinc-800"
                    }`}
                  >
                    <span className="font-semibold text-sm">{lang.blockchain}</span>
                    <span className="text-xs bg-black/40 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 font-mono">
                      {lang.language}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Info pane */}
            <div className="md:col-span-8 bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg flex flex-col justify-between">
              {smartContractLanguages
                .filter((l) => l.blockchain === selectedLanguage)
                .map((lang) => (
                  <div key={lang.blockchain} className="space-y-4">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                      <div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Target Platform</span>
                        <h3 className="text-xl font-bold text-white">{lang.blockchain} Chain</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Programming Language</span>
                        <span className="text-md font-bold text-yellow-400">{lang.language}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-zinc-200">Consensus & Virtual Machine Alignment:</h4>
                      <p className="text-sm text-zinc-300 leading-relaxed bg-black/40 border border-zinc-800 p-4 rounded-xl">
                        {lang.desc}
                      </p>
                    </div>

                    <div className="bg-[#1e1e22]/60 border border-zinc-800/80 rounded-xl p-3.5 flex items-center space-x-3 text-xs">
                      <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 font-bold uppercase">
                        Key Benefit
                      </div>
                      <span className="text-zinc-300 font-medium">{lang.benefits}</span>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="layers"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* L1 vs L2 description cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {layersData.map((layerInfo, idx) => (
                <div key={idx} className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-3">
                  <span className="text-xs bg-yellow-500 text-black font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
                    {layerInfo.layer}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed mt-1">
                    {layerInfo.description}
                  </p>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider border-t border-zinc-800/80 pt-3">
                    Representative Implementations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {layerInfo.chains.map((chain, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-black/40 border border-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded-lg"
                      >
                        {chain.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Settlement mapping tree */}
            <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
                Layer 2 Scaling & Settlement Tree
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                {/* L2 Buttons (List) */}
                <div className="md:col-span-4 space-y-2">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                    Select a Scaling Protocol
                  </span>
                  {layersData[1].chains.map((chain) => (
                    <button
                      key={chain.name}
                      onClick={() => setSelectedL2(chain.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition ${
                        selectedL2 === chain.name
                          ? "bg-yellow-500/10 border-yellow-500 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.1)]"
                          : "bg-[#1e1e22]/50 border-zinc-900 text-zinc-400 hover:bg-[#1e1e22]/80 hover:border-zinc-850"
                      }`}
                    >
                      <span className="text-xs font-bold">{chain.name}</span>
                      <span className="text-[9px] bg-black/40 text-zinc-500 px-2 py-0.5 rounded border border-zinc-800/80">
                        {chain.mechanism.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Animated visual tree link */}
                <div className="md:col-span-8 flex flex-col justify-between h-full bg-black/40 border border-zinc-800/80 rounded-xl p-5 relative">
                  <div className="absolute -left-1 top-12 w-2 h-10 bg-yellow-500 rounded-r-md" />
                  
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-850 pb-3">
                      <div>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide block">Layer 2 Engine</span>
                        <h4 className="text-base font-extrabold text-white">{activeL2.name}</h4>
                      </div>
                      <div className="flex items-center space-x-2 bg-yellow-500/5 border border-yellow-500/20 px-3 py-1 rounded-lg">
                        <FaLink className="text-yellow-500 text-xs" />
                        <span className="text-xs text-yellow-400 font-bold">Settles to: {activeL2.l1} (L1)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-500 font-semibold uppercase tracking-wide">Scaling Mechanism</span>
                        <span className="font-bold text-zinc-200">{activeL2.mechanism}</span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed mt-1">
                        {activeL2.details}
                      </p>
                    </div>

                    <div className="bg-[#1e1e22]/50 border border-zinc-850 rounded-lg p-3 text-xs leading-normal text-zinc-400 flex items-start space-x-2">
                      <FaQuestionCircle className="text-yellow-500/70 mt-0.5 flex-shrink-0 text-sm" />
                      <span>
                        Transactions occur at high speed on {activeL2.name}, while security guarantees are derived from the root consensus of {activeL2.l1} where state proofs are finalized.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
