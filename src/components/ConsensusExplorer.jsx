import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";
import {
  FaPlay,
  FaPause,
  FaChevronRight,
  FaChevronLeft,
  FaSearch,
  FaFilter,
  FaFire,
  FaLeaf,
  FaBolt,
  FaShieldAlt,
  FaClock,
  FaCoins,
  FaCheckCircle
} from "react-icons/fa";
import { consensusAlgorithms } from "../data/consensusData";

export default function ConsensusExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [familyFilter, setFamilyFilter] = useState("All");
  const [energyFilter, setEnergyFilter] = useState("All");
  const [tpsFilter, setTpsFilter] = useState("All");
  const [selectedId, setSelectedId] = useState("pow");

  // Step Timeline Player state
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const autoplayTimerRef = useRef(null);

  // Retrieve selected algorithm
  const selectedAlgo = consensusAlgorithms.find((a) => a.id === selectedId) || consensusAlgorithms[0];

  // Families groupings
  const getCategoryGroup = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("competitive") || cat.includes("burn") || cat.includes("space")) return "Competitive";
    if (cat.includes("stake") || cat.includes("delegate") || cat.includes("activity")) return "Staking";
    if (cat.includes("identity") || cat.includes("voting") || cat.includes("hardware")) return "Enterprise";
    return "Alternative";
  };

  // Filter Algorithms list
  const filteredAlgos = consensusAlgorithms.filter((algo) => {
    // Search match
    const searchMatch =
      algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      algo.coreMechanism.toLowerCase().includes(searchTerm.toLowerCase()) ||
      algo.example.toLowerCase().includes(searchTerm.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Family match
    const group = getCategoryGroup(algo.category);
    const familyMatch = familyFilter === "All" || group === familyFilter;

    // Energy match
    const energy = algo.performance.energy.toLowerCase();
    const isEco = energy.includes("low") || energy.includes("minimal") || energy.includes("microscopic");
    const energyMatch =
      energyFilter === "All" ||
      (energyFilter === "Eco-Friendly" && isEco) ||
      (energyFilter === "Resource Heavy" && !isEco);

    // TPS match
    const tpsVal = parseInt(algo.performance.tps.replace(/,/g, ""));
    let tpsGroup = "Standard";
    if (tpsVal > 5000 || algo.performance.tps.includes("50,000")) {
      tpsGroup = "Ultra-High";
    } else if (tpsVal >= 100 || tpsVal === 0) { // ranges
      tpsGroup = "High";
    }
    const tpsMatch =
      tpsFilter === "All" ||
      (tpsFilter === "Standard" && tpsGroup === "Standard" && tpsVal < 100) ||
      (tpsFilter === "High" && (tpsGroup === "High" || (tpsVal >= 100 && tpsVal <= 5000))) ||
      (tpsFilter === "Ultra-High" && tpsGroup === "Ultra-High");

    return searchMatch && familyMatch && energyMatch && tpsMatch;
  });

  // Keep selected ID valid under filters
  useEffect(() => {
    if (filteredAlgos.length > 0) {
      const exists = filteredAlgos.find((a) => a.id === selectedId);
      if (!exists) {
        setSelectedId(filteredAlgos[0].id);
      }
    }
  }, [filteredAlgos, selectedId]);

  // Autoplay functionality
  useEffect(() => {
    if (isAutoplay) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= selectedAlgo.steps.length - 1) {
            return 0; // Loop back
          }
          return prev + 1;
        });
      }, 3500);
    } else {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    }
    return () => clearInterval(autoplayTimerRef.current);
  }, [isAutoplay, selectedAlgo.steps.length]);

  // Reset steps counter when algorithm changes
  useEffect(() => {
    setCurrentStepIdx(0);
    setIsAutoplay(false);
  }, [selectedId]);

  const handleNextStep = () => {
    setIsAutoplay(false);
    setCurrentStepIdx((prev) => (prev < selectedAlgo.steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrevStep = () => {
    setIsAutoplay(false);
    setCurrentStepIdx((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Format radar data
  const radarData = [
    { subject: "Scalability", value: selectedAlgo.trilemma.scalability },
    { subject: "Security", value: selectedAlgo.trilemma.security },
    { subject: "Decentralization", value: selectedAlgo.trilemma.decentralization }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Sidebar Controls (4 columns on large screens) */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        {/* Search & Filter Panel */}
        <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md space-y-4 shadow-lg">
          <h4 className="text-sm font-bold uppercase tracking-wider text-yellow-400">Search & Filters</h4>
          
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search algorithms or chains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1e1e22]/90 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
            />
            <FaSearch className="absolute left-3.5 top-3.5 text-zinc-500 text-xs" />
          </div>

          {/* Family Dropdown */}
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 font-bold tracking-wide uppercase">Consensus Family</label>
            <select
              value={familyFilter}
              onChange={(e) => setFamilyFilter(e.target.value)}
              className="w-full bg-[#1e1e22]/90 border border-zinc-700 rounded-xl py-2 px-3 text-zinc-300 text-sm focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
            >
              <option value="All">All Families</option>
              <option value="Competitive">Competitive (PoW, PoB, Space)</option>
              <option value="Staking">Staking (PoS, DPoS, Importance)</option>
              <option value="Enterprise">Enterprise (PBFT, PoA, Hardware)</option>
              <option value="Alternative">Alternative (Avalanche, FBA, DAG)</option>
            </select>
          </div>

          {/* Energy Filter */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setEnergyFilter(energyFilter === "Eco-Friendly" ? "All" : "Eco-Friendly")}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold transition ${
                energyFilter === "Eco-Friendly"
                  ? "bg-emerald-950/40 text-emerald-400 border-emerald-800"
                  : "bg-[#1e1e22]/90 text-zinc-400 border-zinc-800 hover:text-zinc-300"
              }`}
            >
              <FaLeaf className="text-[10px]" /> Eco-Friendly
            </button>
            <button
              onClick={() => setEnergyFilter(energyFilter === "Resource Heavy" ? "All" : "Resource Heavy")}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold transition ${
                energyFilter === "Resource Heavy"
                  ? "bg-red-950/40 text-red-400 border-red-800"
                  : "bg-[#1e1e22]/90 text-zinc-400 border-zinc-800 hover:text-zinc-300"
              }`}
            >
              <FaFire className="text-[10px]" /> Resource Heavy
            </button>
          </div>

          {/* TPS Selector */}
          <div className="space-y-1">
            <label className="text-xs text-zinc-500 font-bold tracking-wide uppercase">Throughput (TPS)</label>
            <div className="grid grid-cols-4 gap-1.5 bg-[#1a1a1d] p-1 rounded-xl border border-zinc-800">
              {["All", "Standard", "High", "Ultra-High"].map((val) => (
                <button
                  key={val}
                  onClick={() => setTpsFilter(val)}
                  className={`py-1.5 rounded-lg text-[10px] font-bold uppercase transition ${
                    tpsFilter === val
                      ? "bg-yellow-500 text-black shadow"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {val === "Ultra-High" ? "Ultra" : val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Algorithm List Sidebar */}
        <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-4 backdrop-blur-md max-h-[500px] overflow-y-auto shadow-lg custom-scrollbar">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Algorithms ({filteredAlgos.length})
            </span>
            {filteredAlgos.length === 0 && (
              <span className="text-xs text-red-400 font-medium">No matches found</span>
            )}
          </div>

          <div className="space-y-2">
            {filteredAlgos.map((algo) => {
              const isActive = algo.id === selectedId;
              const isEco =
                algo.performance.energy.toLowerCase().includes("low") ||
                algo.performance.energy.toLowerCase().includes("minimal") ||
                algo.performance.energy.toLowerCase().includes("microscopic");
              return (
                <button
                  key={algo.id}
                  onClick={() => setSelectedId(algo.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition duration-200 group ${
                    isActive
                      ? "bg-yellow-500/10 border-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.15)] text-zinc-100"
                      : "bg-[#1e1e22]/50 border-zinc-900 text-zinc-400 hover:bg-[#1e1e22]/80 hover:border-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  <div className="space-y-1">
                    <span
                      className={`font-semibold text-sm transition-colors ${
                        isActive ? "text-yellow-400" : "text-zinc-300 group-hover:text-zinc-200"
                      }`}
                    >
                      {algo.name}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-medium">
                      <span>{algo.inventedBy.split(" ")[0]}</span>
                      <span>•</span>
                      <span>{algo.year}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1.5">
                    <span className="text-[10px] bg-black/40 text-zinc-400 px-2 py-0.5 rounded border border-zinc-800 font-bold uppercase tracking-wide">
                      {getCategoryGroup(algo.category)}
                    </span>
                    {isEco ? (
                      <span className="text-emerald-500 text-[10px] flex items-center gap-0.5">
                        <FaLeaf className="text-[8px]" /> Eco
                      </span>
                    ) : (
                      <span className="text-amber-500 text-[10px] flex items-center gap-0.5">
                        <FaFire className="text-[8px]" /> Power
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Panel Display (8 columns on large screens) */}
      <div className="lg:col-span-8 flex flex-col space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAlgo.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Header / Meta Card */}
            <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg relative overflow-hidden">
              {/* Background gradient flare */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
                <div className="space-y-1.5">
                  <span className="text-xs bg-yellow-500 text-black font-bold uppercase px-2.5 py-1 rounded-md tracking-wider">
                    {selectedAlgo.category}
                  </span>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    {selectedAlgo.name}
                  </h2>
                </div>
                <div className="text-right text-sm">
                  <div className="text-zinc-500 text-xs uppercase tracking-wider font-bold">Origin</div>
                  <div className="text-zinc-200 font-semibold">{selectedAlgo.inventedBy} ({selectedAlgo.year})</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-3">
                  <div>
                    <h5 className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Core Mechanism</h5>
                    <p className="text-zinc-100 font-medium text-sm bg-black/40 border border-zinc-800/80 rounded-lg px-3 py-1.5 inline-block">
                      {selectedAlgo.coreMechanism}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1">Functional Description</h5>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {selectedAlgo.description}
                    </p>
                  </div>
                </div>
                {/* Micro stat card */}
                <div className="bg-[#1e1e22]/70 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between h-full">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Representative Chain</span>
                  <span className="text-lg font-bold text-yellow-400 mt-2 block">{selectedAlgo.example}</span>
                  <span className="text-xs text-zinc-400 mt-1 leading-normal">
                    Pioneered or widely popularized this specific execution environment.
                  </span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Timeline Player */}
            <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4">
              <div className="flex flex-wrap justify-between items-center gap-4 border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">Block Validation Timeline</h3>
                  <p className="text-xs text-zinc-400">Step-by-step validator consensus sequencing</p>
                </div>

                {/* Player controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIdx === 0}
                    className="p-2.5 rounded-lg bg-[#1e1e22] text-zinc-400 border border-zinc-800 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition"
                    title="Previous Step"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <button
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                      isAutoplay
                        ? "bg-yellow-500 text-black font-extrabold"
                        : "bg-[#1e1e22] text-zinc-300 border border-zinc-800 hover:text-white"
                    }`}
                  >
                    {isAutoplay ? (
                      <>
                        <FaPause className="text-[10px]" /> Paused Auto
                      </>
                    ) : (
                      <>
                        <FaPlay className="text-[10px]" /> Autoplay
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={currentStepIdx === selectedAlgo.steps.length - 1}
                    className="p-2.5 rounded-lg bg-[#1e1e22] text-zinc-400 border border-zinc-800 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-400 transition"
                    title="Next Step"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Steps timeline track */}
              <div className="relative">
                {/* Horizontal Progress Bar */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-zinc-800 -z-10 hidden md:block">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-300"
                    style={{
                      width: `${(currentStepIdx / (selectedAlgo.steps.length - 1)) * 100}%`
                    }}
                  />
                </div>

                {/* Step Indicators */}
                <div className="flex justify-between items-center mb-6 overflow-x-auto pb-2 scrollbar-none">
                  {selectedAlgo.steps.map((step, idx) => {
                    const isPassed = idx < currentStepIdx;
                    const isActive = idx === currentStepIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsAutoplay(false);
                          setCurrentStepIdx(idx);
                        }}
                        className="flex flex-col items-center flex-shrink-0 mx-2 focus:outline-none"
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition duration-300 ${
                            isActive
                              ? "bg-yellow-500 text-black border-yellow-400 ring-4 ring-yellow-950/50"
                              : isPassed
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/40"
                              : "bg-[#1a1a1d] text-zinc-500 border-zinc-800"
                          }`}
                        >
                          {step.num}
                        </div>
                        <span
                          className={`text-[9px] mt-1.5 font-bold uppercase tracking-wider text-center hidden md:block w-16 truncate ${
                            isActive ? "text-yellow-400" : isPassed ? "text-zinc-300" : "text-zinc-600"
                          }`}
                        >
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Details Card */}
              <div className="bg-black/50 border border-zinc-800 rounded-xl p-5 relative min-h-[110px] flex flex-col justify-center">
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-12 bg-yellow-500 rounded-r-md" />
                <div className="pl-4 space-y-1">
                  <div className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">
                    Step {selectedAlgo.steps[currentStepIdx].num} / {selectedAlgo.steps.length} — {selectedAlgo.steps[currentStepIdx].title}
                  </div>
                  <h4 className="text-md font-bold text-zinc-100">{selectedAlgo.steps[currentStepIdx].title}</h4>
                  <p className="text-sm text-zinc-300 leading-relaxed mt-1">
                    {selectedAlgo.steps[currentStepIdx].desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Trilemma Score and Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Radar Chart (5 columns) */}
              <div className="md:col-span-5 bg-[#121214]/90 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col justify-between items-center">
                <div className="w-full border-b border-zinc-800 pb-3 mb-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Trilemma Balancing</h3>
                  <p className="text-[10px] text-zinc-400">Weighted scores (0-100)</p>
                </div>

                <div className="w-full h-[220px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                      <PolarGrid stroke="#27272a" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: "bold" }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: "#4b5563", fontSize: 8 }}
                      />
                      <Radar
                        name={selectedAlgo.name}
                        dataKey="value"
                        stroke="#F5C518"
                        fill="#F5C518"
                        fillOpacity={0.25}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Score breakdown metrics list */}
                <div className="w-full grid grid-cols-3 gap-2 text-center mt-3 pt-3 border-t border-zinc-800/80">
                  <div>
                    <div className="text-[9px] font-bold text-zinc-500 uppercase">Scale</div>
                    <div className="text-sm font-extrabold text-yellow-400">{selectedAlgo.trilemma.scalability}</div>
                  </div>
                  <div className="border-x border-zinc-800">
                    <div className="text-[9px] font-bold text-zinc-500 uppercase">Secure</div>
                    <div className="text-sm font-extrabold text-yellow-400">{selectedAlgo.trilemma.security}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-zinc-500 uppercase">Decentr.</div>
                    <div className="text-sm font-extrabold text-yellow-400">{selectedAlgo.trilemma.decentralization}</div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics (7 columns) */}
              <div className="md:col-span-7 bg-[#121214]/90 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col justify-between">
                <div className="border-b border-zinc-800 pb-3 mb-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Performance Benchmarks</h3>
                  <p className="text-[10px] text-zinc-400">Network efficiency & operational limits</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* TPS Card */}
                  <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-3 flex items-start space-x-2.5">
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 mt-0.5">
                      <FaBolt className="text-sm" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Throughput (TPS)</span>
                      <span className="text-sm font-bold text-zinc-100">{selectedAlgo.performance.tps}</span>
                    </div>
                  </div>

                  {/* Block Time */}
                  <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-3 flex items-start space-x-2.5">
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 mt-0.5">
                      <FaClock className="text-sm" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Block/Epoch Time</span>
                      <span className="text-sm font-bold text-zinc-100">{selectedAlgo.performance.blockTime}</span>
                    </div>
                  </div>

                  {/* Energy Usage */}
                  <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-3 flex items-start space-x-2.5">
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 mt-0.5">
                      <FaLeaf className="text-sm" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Energy footprint</span>
                      <span className="text-sm font-bold text-zinc-100">{selectedAlgo.performance.energy}</span>
                    </div>
                  </div>

                  {/* Tx Cost */}
                  <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-3 flex items-start space-x-2.5">
                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 mt-0.5">
                      <FaCoins className="text-sm" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Avg Tx Cost</span>
                      <span className="text-sm font-bold text-zinc-100">{selectedAlgo.performance.cost}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1e1e22]/50 border border-zinc-800/80 rounded-xl p-3 mt-4 text-xs flex justify-between items-center">
                  <span className="text-zinc-500 font-bold uppercase tracking-wide">Time To Finality</span>
                  <span className="font-extrabold text-yellow-400">{selectedAlgo.performance.finality}</span>
                </div>
              </div>
            </div>

            {/* Advantages and Disadvantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md shadow-lg space-y-3">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-800 pb-2 mb-1">
                  <FaCheckCircle className="text-xs" /> Architectural Pros
                </h4>
                <ul className="space-y-2.5">
                  {selectedAlgo.advantages.map((adv, idx) => (
                    <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-emerald-500 font-bold mt-0.5">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md shadow-lg space-y-3">
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-zinc-800 pb-2 mb-1">
                  <span className="text-[10px] font-extrabold bg-red-950 text-red-400 w-4 h-4 rounded-full flex items-center justify-center">!</span> 
                  Architectural Cons
                </h4>
                <ul className="space-y-2.5">
                  {selectedAlgo.disadvantages.map((dis, idx) => (
                    <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-red-500 font-bold mt-0.5">•</span>
                      <span>{dis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Security Analysis Table/Module */}
            <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4">
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaShieldAlt className="text-yellow-500" /> Security Vector Analysis
                </h3>
                <p className="text-xs text-zinc-400">Algorithmic resistance to common distributed network vulnerabilities</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-4 space-y-1">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-yellow-400">51% / 34% Attack Vector</h5>
                  <p className="text-sm text-zinc-300 leading-relaxed">{selectedAlgo.security.fiftyOnePercent}</p>
                </div>
                <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-4 space-y-1">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-yellow-400">Sybil Resistance</h5>
                  <p className="text-sm text-zinc-300 leading-relaxed">{selectedAlgo.security.sybil}</p>
                </div>
                <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-4 space-y-1">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-yellow-400">Double Spending Mitigation</h5>
                  <p className="text-sm text-zinc-300 leading-relaxed">{selectedAlgo.security.doubleSpending}</p>
                </div>
                <div className="bg-black/40 border border-zinc-800/80 rounded-xl p-4 space-y-1">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-yellow-400">Byzantine Fault Tolerance</h5>
                  <p className="text-sm text-zinc-300 leading-relaxed">{selectedAlgo.security.byzantine}</p>
                </div>
              </div>
            </div>

            {/* Real World Implementations */}
            <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white">Real-world Implementations</h3>
                <p className="text-xs text-zinc-400">Blockchains employing this model for security</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedAlgo.realWorldChains.map((chain, index) => (
                  <div key={index} className="bg-black/50 border border-zinc-800/85 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">
                        {chain.name}
                      </span>
                      <h4 className="text-md font-bold text-zinc-100 mt-2">{chain.name}</h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-2.5">
                      <span className="font-bold text-zinc-300 block mb-0.5">Deployment Rationale:</span>
                      {chain.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
