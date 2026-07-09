import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSync, FaUndo, FaSlidersH, FaInfoCircle, FaCube } from "react-icons/fa";

const tradeOffs = {
  decentralization_security: {
    title: "Decentralization & Security (Traditional Sovereign L1)",
    description: "Prioritizes high censorship resistance, mathematical or cryptographic validation across thousands of independent nodes, and absolute resistance to state-level attacks. The trade-off is Scalability: transactions are slow, block times are long, and global sync overhead is high.",
    sacrifice: "Scalability (Low TPS, high latency, high gas/transaction fees under load).",
    examples: ["Proof of Work (PoW)", "Proof of Stake (PoS)", "Proof of Importance (PoI)", "Proof of Capacity (PoC)"],
    values: { decentralization: 95, security: 95, scalability: 10 }
  },
  security_scalability: {
    title: "Security & Scalability (Enterprise & Federated)",
    description: "Prioritizes immediate transaction settlement, high capacity (thousands of TPS), and resistance to hacks. To achieve this speed, the validator set is strictly restricted or centralized to a trusted circle or pre-approved entities, sacrificing open participation.",
    sacrifice: "Decentralization (Vulnerable to governance capture, censorship, validator collusion, and single points of control).",
    examples: ["Proof of Authority (PoA)", "Practical Byzantine Fault Tolerance (PBFT)", "Proof of Elapsed Time (PoET)"],
    values: { decentralization: 10, security: 95, scalability: 95 }
  },
  decentralization_scalability: {
    title: "Decentralization & Scalability (Modern Scale-Out)",
    description: "Attempts to achieve high speed and open, global participation. These protocols typically use sub-sampled consensus or blockless graph structures. The primary trade-off is Security Complexity: finality may be probabilistic, there are higher risks of spam/Sybil attacks during low activity, or they require helper mechanisms (like coordinators).",
    sacrifice: "Security Complexity (Vulnerable to 34% routing attacks, long-range history rewrites, or complex multi-hop validation bugs).",
    examples: ["DAG (Tangle)", "Delegated Proof of Stake (DPoS)", "Avalanche Consensus", "Proof of History + PoS (PoH)"],
    values: { decentralization: 90, security: 20, scalability: 90 }
  }
};

// 3D Pillar component using pure CSS 3D transforms
function Pillar3D({ x, y, height, color, label, value, rotateX, rotateZ }) {
  // Map height 0-100 to 0-120px
  const h = (height / 100) * 120;

  return (
    <div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: "20px",
        height: "20px",
        transform: "translate3d(-10px, -10px, 0px)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Pillar Sides */}
      {/* Front Face */}
      <div
        className="absolute bottom-0 left-0 w-5 transition-all duration-500 ease-out"
        style={{
          height: `${h}px`,
          background: `linear-gradient(to top, ${color}20, ${color}cc)`,
          transform: "rotateX(-90deg) translateZ(10px)",
          transformOrigin: "bottom",
          border: `1px solid ${color}40`,
          boxShadow: `0 0 10px ${color}30`,
        }}
      />
      {/* Back Face */}
      <div
        className="absolute bottom-0 left-0 w-5 transition-all duration-500 ease-out"
        style={{
          height: `${h}px`,
          background: `linear-gradient(to top, ${color}10, ${color}aa)`,
          transform: "rotateX(-90deg) translateZ(-10px) rotateY(180deg)",
          transformOrigin: "bottom",
          border: `1px solid ${color}30`,
        }}
      />
      {/* Left Face */}
      <div
        className="absolute bottom-0 left-0 w-5 transition-all duration-500 ease-out"
        style={{
          height: `${h}px`,
          background: `linear-gradient(to top, ${color}15, ${color}b5)`,
          transform: "rotateX(-90deg) rotateY(-90deg) translateZ(10px)",
          transformOrigin: "bottom",
          border: `1px solid ${color}30`,
        }}
      />
      {/* Right Face */}
      <div
        className="absolute bottom-0 left-0 w-5 transition-all duration-500 ease-out"
        style={{
          height: `${h}px`,
          background: `linear-gradient(to top, ${color}15, ${color}b5)`,
          transform: "rotateX(-90deg) rotateY(90deg) translateZ(10px)",
          transformOrigin: "bottom",
          border: `1px solid ${color}30`,
        }}
      />
      {/* Top Face */}
      <div
        className="absolute top-0 left-0 w-5 h-5 transition-all duration-500 ease-out"
        style={{
          backgroundColor: color,
          transform: `translateZ(${h}px)`,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: `0 0 15px ${color}`,
        }}
      />

      {/* Billboarded Value Label (always faces the camera) */}
      <div
        className="absolute text-center whitespace-nowrap pointer-events-none select-none transition-all duration-500 ease-out"
        style={{
          transform: `translateZ(${h + 16}px) rotateZ(${-rotateZ}deg) rotateX(${-rotateX}deg)`,
          width: "80px",
          left: "-30px",
          top: "-10px",
          transformStyle: "preserve-3d",
        }}
      >
        <span className="text-[10px] font-extrabold text-white bg-black/80 border border-zinc-800 px-1.5 py-0.5 rounded shadow-lg backdrop-blur-sm">
          {label}: {value}%
        </span>
      </div>
    </div>
  );
}

export default function TrilemmaSimulator() {
  const [selectedTradeOff, setSelectedTradeOff] = useState("decentralization_security");
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [bypassLimits, setBypassLimits] = useState(false);

  // Custom balance values
  const [customValues, setCustomValues] = useState({
    decentralization: 66,
    security: 67,
    scalability: 67
  });

  // 3D Scene Rotation Angles
  const [rotateX, setRotateX] = useState(55);
  const [rotateZ, setRotateZ] = useState(-35);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Handle auto rotation animation
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    let animId;
    const tick = () => {
      setRotateZ((z) => (z + 0.15) % 360);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    setRotateX((x) => Math.max(20, Math.min(80, x - dy * 0.5)));
    setRotateZ((z) => z + dx * 0.5);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    
    setRotateX((x) => Math.max(20, Math.min(80, x - dy * 0.5)));
    setRotateZ((z) => z + dx * 0.5);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Reset 3D view coordinates
  const resetView = () => {
    setRotateX(55);
    setRotateZ(-35);
  };

  // Get active values based on mode
  const currentValues = isCustomMode ? customValues : tradeOffs[selectedTradeOff].values;
  const currentDetails = tradeOffs[selectedTradeOff];

  // Barycentric Mapping for selector orb (coordinates in 300x300 container)
  const getOrbCoords = () => {
    const { decentralization: d, security: sec, scalability: s } = currentValues;
    const sum = d + sec + s;
    
    if (sum === 0) {
      return { x: 150, y: 163.3 };
    }
    
    const wD = d / sum;
    const wSec = sec / sum;
    const wS = s / sum;
    
    // Vertices: D=(50, 220), Sec=(250, 220), S=(150, 50)
    const x = wD * 50 + wSec * 250 + wS * 150;
    const y = wD * 220 + wSec * 220 + wS * 50;
    
    return { x, y };
  };

  const { x: orbX, y: orbY } = getOrbCoords();

  // Slider adjustments with Auto-Balancing (budget of 200)
  const handleSliderChange = (name, value) => {
    const valChanged = Math.max(0, Math.min(100, Number(value)));

    if (bypassLimits) {
      setCustomValues((prev) => ({ ...prev, [name]: valChanged }));
      return;
    }

    const otherNames = ["scalability", "security", "decentralization"].filter((n) => n !== name);
    const other1 = otherNames[0];
    const other2 = otherNames[1];

    const val1 = customValues[other1];
    const val2 = customValues[other2];
    
    const targetSum = 200;
    const remaining = targetSum - valChanged;
    
    let newVal1, newVal2;
    
    if (val1 + val2 === 0) {
      newVal1 = remaining / 2;
      newVal2 = remaining / 2;
    } else {
      newVal1 = (val1 / (val1 + val2)) * remaining;
      newVal2 = (val2 / (val1 + val2)) * remaining;
    }
    
    // Clamp both to [0, 100] and distribute excess
    if (newVal1 > 100) {
      newVal1 = 100;
      newVal2 = remaining - 100;
    } else if (newVal2 > 100) {
      newVal2 = 100;
      newVal1 = remaining - 100;
    }
    
    newVal1 = Math.max(0, Math.min(100, Math.round(newVal1)));
    newVal2 = Math.max(0, Math.min(100, Math.round(newVal2)));
    
    // Rectify rounding differences
    const currentSum = valChanged + newVal1 + newVal2;
    const diff = targetSum - currentSum;
    
    if (diff !== 0) {
      if (newVal1 + diff >= 0 && newVal1 + diff <= 100) {
        newVal1 += diff;
      } else if (newVal2 + diff >= 0 && newVal2 + diff <= 100) {
        newVal2 += diff;
      }
    }
    
    setCustomValues({
      [name]: valChanged,
      [other1]: newVal1,
      [other2]: newVal2
    });
  };

  // Get Custom Ledger Classification
  const getClassification = () => {
    const { decentralization: d, security: sec, scalability: s } = customValues;
    
    if (bypassLimits && d >= 90 && sec >= 90 && s >= 90) {
      return {
        title: "The Holy Grail Ledger (Impossible Network)",
        desc: "A theoretical perfect consensus engine. Completely secure against arbitrary faults, infinitely scalable, and fully decentralized. Unfortunately, this violates the FLP Impossibility Theorem and network synchrony limits in physics.",
        color: "text-yellow-400 border-yellow-500/50 bg-yellow-950/20"
      };
    }

    // Ultra-centralized
    if (s >= 92 && d <= 15 && sec >= 80) {
      return {
        title: "Enterprise / Federated Ledger",
        desc: "Maximizes throughput and speed by restricting validation to a small set of pre-approved, trusted entities (e.g. Ripple, Hyperledger, PBFT). Censorship resistance is completely sacrificed.",
        color: "text-blue-400 border-blue-500/30 bg-blue-950/10"
      };
    }
    
    // Traditional sovereignty L1
    if (d >= 85 && sec >= 85 && s <= 25) {
      return {
        title: "Traditional Sovereign L1 Chain",
        desc: "Prioritizes absolute censorship resistance and deep cryptographic security (e.g., Bitcoin, Ethereum L1). To ensure every independent node can verify the chain, blocks are small and execution is slow.",
        color: "text-purple-400 border-purple-500/30 bg-purple-950/10"
      };
    }

    // High-throughput Scale-out
    if (d >= 80 && s >= 80 && sec <= 40) {
      return {
        title: "Scale-Out/DPoS/DAG Network",
        desc: "Optimizes for open participation and high speed (e.g., DPoS, Avalanche, DAGs). Security is weaker: prone to routing attacks, long-range history rewrites, or validator collusion under stress.",
        color: "text-red-400 border-red-500/30 bg-red-950/10"
      };
    }

    // SQL DB
    if (s >= 95 && d <= 5 && sec <= 15) {
      return {
        title: "Standard Centrally Managed DB",
        desc: "Extremely fast, but lacks any decentralization or cryptographic security. One entity has absolute write and read access. Great for web2, not a blockchain.",
        color: "text-zinc-400 border-zinc-500/30 bg-zinc-950/10"
      };
    }

    // Balanced Rollup
    if (s >= 50 && sec >= 65 && d >= 50) {
      return {
        title: "Optimized L2 Rollup / Hybrid Chain",
        desc: "A modern hybrid approach. Achieves scalability through transaction batching off-chain (L2) while inheriting safety from a sovereign L1 base, balancing the trilemma through modular architecture.",
        color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/10"
      };
    }

    return {
      title: "Custom Consensus Balance",
      desc: "A custom consensus configuration balancing decentralization, security, and scalability. This ledger is tailored for specific performance/governance needs in a sharded or multi-chain ecosystem.",
      color: "text-yellow-400 border-yellow-500/30 bg-yellow-950/10"
    };
  };

  const classification = getClassification();

  return (
    <div className="w-full bg-[#121214]/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-left">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
            <FaCube className="text-yellow-400" /> Interactive 3D Trilemma Simulator
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Drag the 3D space to rotate. Click tradeoffs or toggle Custom Mode to sculpt your own consensus dimensions.
          </p>
        </div>
        
        {/* Toggle Mode Button */}
        <div className="flex bg-black/40 border border-zinc-850 p-1 rounded-xl w-fit">
          <button
            onClick={() => setIsCustomMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              !isCustomMode
                ? "bg-yellow-500 text-black shadow-md"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Presets
          </button>
          <button
            onClick={() => {
              setIsCustomMode(true);
              setAutoRotate(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 ${
              isCustomMode
                ? "bg-yellow-500 text-black shadow-md"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FaSlidersH className="text-[10px]" /> Custom Designer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* 3D Visualizer Column */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-black/30 border border-zinc-850 rounded-2xl p-4 min-h-[380px] relative select-none">
          
          {/* Rotate Helper Hint */}
          <div className="absolute top-3 left-3 text-[10px] text-zinc-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Drag scene to rotate in 3D
          </div>

          {/* 3D Scene Controls */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title="Toggle Auto-Rotation"
              className={`p-2 rounded-lg border text-xs transition duration-200 ${
                autoRotate
                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                  : "bg-black/40 border-zinc-850 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <FaSync className={autoRotate ? "animate-spin" : ""} style={{ animationDuration: "10s" }} />
            </button>
            <button
              onClick={resetView}
              title="Reset 3D Perspective"
              className="p-2 rounded-lg border bg-black/40 border-zinc-850 text-zinc-500 hover:text-zinc-300 transition duration-200"
            >
              <FaUndo />
            </button>
          </div>

          {/* Perspective Camera Container */}
          <div
            className="w-full max-w-[340px] h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: "1000px" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* 3D Object Container */}
            <div
              className="relative w-[300px] h-[300px] transition-transform duration-100 ease-out"
              style={{
                transform: `rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              
              {/* Flat base layout (SVG flat on XY plane) */}
              <div
                className="absolute inset-0"
                style={{
                  transform: "translateZ(0px)",
                  transformStyle: "preserve-3d",
                }}
              >
                <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible pointer-events-none">
                  {/* Grid canvas background */}
                  <defs>
                    <pattern id="grid3d" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="300" height="300" fill="url(#grid3d)" rx="16" className="stroke-zinc-800/30 stroke-[2]" />

                  {/* Outer base triangle */}
                  <polygon
                    points="150,50 250,220 50,220"
                    className="fill-none stroke-zinc-700/50 stroke-[2] transition-all duration-300"
                    strokeDasharray="4,4"
                  />

                  {/* Inner shaded areas to highlight selection balance */}
                  <polygon
                    points={`150,163.3 ${orbX},${orbY} 50,220`}
                    className="fill-purple-500/5 stroke-none transition-all duration-500 ease-out"
                  />
                  <polygon
                    points={`150,163.3 ${orbX},${orbY} 250,220`}
                    className="fill-emerald-500/5 stroke-none transition-all duration-500 ease-out"
                  />
                  <polygon
                    points={`150,163.3 ${orbX},${orbY} 150,50`}
                    className="fill-blue-500/5 stroke-none transition-all duration-500 ease-out"
                  />

                  {/* Radiating lines to centroid */}
                  <line x1="150" y1="163.3" x2={orbX} y2={orbY} className="stroke-yellow-400/30 stroke-[1.5] transition-all duration-500 ease-out" />

                  {/* Outer polygon bounds tracing current selection */}
                  <polygon
                    points={`150,50 ${orbX},${orbY} 50,220`}
                    className="fill-none stroke-purple-500/20 stroke-[1] transition-all duration-500 ease-out"
                  />
                  <polygon
                    points={`150,50 ${orbX},${orbY} 250,220`}
                    className="fill-none stroke-emerald-500/20 stroke-[1] transition-all duration-500 ease-out"
                  />
                </svg>

                {/* Billboarded vertex names */}
                {/* Scalability (Top) */}
                <div
                  className="absolute text-center pointer-events-none select-none"
                  style={{
                    left: "150px",
                    top: "50px",
                    transform: `translate3d(-50%, -100%, 0px) translateZ(8px) rotateZ(${-rotateZ}deg) rotateX(${-rotateX}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase bg-[#0d1527]/90 border border-blue-500/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                    Scalability
                  </span>
                </div>

                {/* Security (Right) */}
                <div
                  className="absolute text-center pointer-events-none select-none"
                  style={{
                    left: "250px",
                    top: "220px",
                    transform: `translate3d(-50%, 4px, 0px) translateZ(8px) rotateZ(${-rotateZ}deg) rotateX(${-rotateX}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase bg-[#081b15]/90 border border-emerald-500/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                    Security
                  </span>
                </div>

                {/* Decentralization (Left) */}
                <div
                  className="absolute text-center pointer-events-none select-none"
                  style={{
                    left: "50px",
                    top: "220px",
                    transform: `translate3d(-50%, 4px, 0px) translateZ(8px) rotateZ(${-rotateZ}deg) rotateX(${-rotateX}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span className="text-[10px] font-black tracking-widest text-purple-400 uppercase bg-[#180d2b]/90 border border-purple-500/30 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.15)]">
                    Decentralization
                  </span>
                </div>
              </div>

              {/* 3D Pillars at the Vertices */}
              {/* Scalability (Top) */}
              <Pillar3D
                x={150}
                y={50}
                height={currentValues.scalability}
                color="#3b82f6"
                label="SC"
                value={currentValues.scalability}
                rotateX={rotateX}
                rotateZ={rotateZ}
              />
              {/* Security (Right) */}
              <Pillar3D
                x={250}
                y={220}
                height={currentValues.security}
                color="#10b981"
                label="SE"
                value={currentValues.security}
                rotateX={rotateX}
                rotateZ={rotateZ}
              />
              {/* Decentralization (Left) */}
              <Pillar3D
                x={50}
                y={220}
                height={currentValues.decentralization}
                color="#8b5cf6"
                label="DE"
                value={currentValues.decentralization}
                rotateX={rotateX}
                rotateZ={rotateZ}
              />

              {/* Floating Selector Orb & Shadow Drops */}
              {/* Flat projection shadow */}
              <div
                className="absolute w-4 h-4 rounded-full bg-yellow-400/20 blur-[1px] border border-yellow-400/40 transition-all duration-500 ease-out"
                style={{
                  transform: `translate3d(${orbX - 8}px, ${orbY - 8}px, 1px)`,
                }}
              />
              
              {/* Vertical line connection */}
              <div
                className="absolute w-[1px] bg-gradient-to-t from-yellow-500/10 to-yellow-400/70 transition-all duration-500 ease-out"
                style={{
                  left: `${orbX}px`,
                  top: `${orbY}px`,
                  height: "36px",
                  transform: "rotateX(-90deg)",
                  transformOrigin: "bottom",
                }}
              />
              
              {/* Floating orb node */}
              <div
                className="absolute w-3.5 h-3.5 rounded-full bg-yellow-400 border border-white shadow-[0_0_12px_#eab308] transition-all duration-500 ease-out"
                style={{
                  left: `${orbX}px`,
                  top: `${orbY}px`,
                  transform: `translate3d(-7px, -7px, 36px) rotateZ(${-rotateZ}deg) rotateX(${-rotateX}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 rounded-full bg-yellow-400/50 animate-ping" />
              </div>

            </div>
          </div>
        </div>

        {/* Configurations Controls Panel Column */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          {/* Preset Trade-off Mode UI */}
          {!isCustomMode && (
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Select Trade-off Edge</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTradeOff("decentralization_security")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      selectedTradeOff === "decentralization_security"
                        ? "bg-yellow-500 text-black border-yellow-400 shadow-md shadow-yellow-500/10"
                        : "bg-black/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    Decentralization + Security
                  </button>
                  <button
                    onClick={() => setSelectedTradeOff("security_scalability")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      selectedTradeOff === "security_scalability"
                        ? "bg-yellow-500 text-black border-yellow-400 shadow-md shadow-yellow-500/10"
                        : "bg-black/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    Security + Scalability
                  </button>
                  <button
                    onClick={() => setSelectedTradeOff("decentralization_scalability")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                      selectedTradeOff === "decentralization_scalability"
                        ? "bg-yellow-500 text-black border-yellow-400 shadow-md shadow-yellow-500/10"
                        : "bg-black/40 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-900/60"
                    }`}
                  >
                    Decentralization + Scalability
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTradeOff}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="bg-black/40 border border-zinc-800/80 rounded-2xl p-5 space-y-4 shadow-inner"
                >
                  <h4 className="font-bold text-base text-zinc-100 border-b border-zinc-850 pb-2 flex items-center justify-between">
                    <span>{currentDetails.title}</span>
                    <span className="text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-bold">
                      Preset
                    </span>
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {currentDetails.description}
                  </p>
                  <div className="text-xs text-red-400 border border-red-950/40 bg-red-950/10 px-3 py-2.5 rounded-xl font-medium flex gap-2">
                    <span className="font-bold text-red-300 shrink-0">Sacrifices:</span>
                    <span>{currentDetails.sacrifice}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-wider block mb-2">
                      Representative Protocols
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentDetails.examples.map((item, idx) => (
                        <span
                          key={idx}
                          className="bg-zinc-900 text-zinc-300 text-xs px-3 py-1 rounded-lg border border-zinc-800 hover:border-zinc-700 transition"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Custom Network Designer Mode UI */}
          {isCustomMode && (
            <div className="space-y-5 bg-black/20 border border-zinc-850/80 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3 mb-2">
                <span className="text-sm font-bold text-zinc-200">Custom Network Sculptor</span>
                
                {/* Bypass limits checkbox */}
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={bypassLimits}
                    onChange={(e) => {
                      setBypassLimits(e.target.checked);
                      if (!e.target.checked) {
                        // Re-scale values to 200 total when enabling constraints
                        const { decentralization: d, security: sec, scalability: s } = customValues;
                        const sum = d + sec + s;
                        if (sum > 0) {
                          const scale = 200 / sum;
                          setCustomValues({
                            decentralization: Math.round(d * scale),
                            security: Math.round(sec * scale),
                            scalability: Math.round(s * scale)
                          });
                        } else {
                          setCustomValues({ decentralization: 66, security: 67, scalability: 67 });
                        }
                      }
                    }}
                    className="w-3.5 h-3.5 bg-zinc-850 border-zinc-700 rounded text-yellow-500 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                    Bypass Trilemma Limits
                  </span>
                </label>
              </div>

              {/* Range Sliders */}
              <div className="space-y-4">
                {/* Scalability Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-blue-400 uppercase tracking-wide">Scalability</span>
                    <span className="font-extrabold text-blue-300">{customValues.scalability}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={customValues.scalability}
                    onChange={(e) => handleSliderChange("scalability", e.target.value)}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                {/* Security Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-400 uppercase tracking-wide">Security</span>
                    <span className="font-extrabold text-emerald-300">{customValues.security}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={customValues.security}
                    onChange={(e) => handleSliderChange("security", e.target.value)}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Decentralization Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-purple-400 uppercase tracking-wide">Decentralization</span>
                    <span className="font-extrabold text-purple-300">{customValues.decentralization}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={customValues.decentralization}
                    onChange={(e) => handleSliderChange("decentralization", e.target.value)}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>
              </div>

              {/* Dynamic Classification Card */}
              <div className={`border p-4 rounded-xl space-y-2 mt-4 transition-all duration-300 ${classification.color}`}>
                <h5 className="text-sm font-black uppercase tracking-wider flex items-center gap-1.5">
                  <FaInfoCircle className="text-xs shrink-0" />
                  {classification.title}
                </h5>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {classification.desc}
                </p>
                {!bypassLimits && (
                  <div className="text-[9px] text-zinc-400 font-medium italic pt-1 border-t border-zinc-800/40">
                    * Trilemma constraints active: total network capacity capped at 200%. Increasing one dimension reduces other properties.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick learning tip footer card */}
          <div className="bg-[#121214]/50 border border-zinc-850 p-4 rounded-xl text-xs text-zinc-400 leading-relaxed">
            <span className="font-bold text-zinc-200 block mb-1">💡 Consensus Insight</span>
            The Blockchain Trilemma states that a decentralized ledger can only deliver two out of three guarantees effectively at the base layer. Layer 2 scaling (like rollups or state channels) shifts execution off-chain to maintain L1 security while bypassing physical scaling limits.
          </div>

        </div>
      </div>
    </div>
  );
}
