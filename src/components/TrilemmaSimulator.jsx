import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tradeOffs = {
  decentralization_security: {
    title: "Decentralization & Security (Traditional Blockchains)",
    description: "Prioritizes high censorship resistance, mathematical or cryptographic validation across thousands of independent nodes, and absolute resistance to state-level attacks. The trade-off is Scalability: transactions are slow, block times are long, and global sync overhead is high.",
    sacrifice: "Scalability (Low TPS, high latency, high gas/transaction fees under load).",
    examples: ["Proof of Work (PoW)", "Proof of Stake (PoS)", "Proof of Importance (PoI)", "Proof of Capacity (PoC)"],
    point: { x: 250, y: 250 } // Bottom edge
  },
  security_scalability: {
    title: "Security & Scalability (Enterprise & Federated)",
    description: "Prioritizes immediate transaction settlement, high capacity (thousands of TPS), and resistance to hacks. To achieve this speed, the validator set is strictly restricted or centralized to a trusted circle or pre-approved entities, sacrificing open participation.",
    sacrifice: "Decentralization (Vulnerable to governance capture, censorship, validator collusion, and single points of control).",
    examples: ["Proof of Authority (PoA)", "Practical Byzantine Fault Tolerance (PBFT)", "Proof of Elapsed Time (PoET)"],
    point: { x: 300, y: 155 } // Right edge
  },
  decentralization_scalability: {
    title: "Decentralization & Scalability (Modern Scale-Out)",
    description: "Attempts to achieve high speed and open, global participation. These protocols typically use sub-sampled consensus or blockless graph structures. The primary trade-off is Security Complexity: finality may be probabilistic, there are higher risks of spam/Sybil attacks during low activity, or they require helper mechanisms (like coordinators).",
    sacrifice: "Security Complexity (Vulnerable to 34% routing attacks, long-range history rewrites, or complex multi-hop validation bugs).",
    examples: ["DAG (Tangle)", "Delegated Proof of Stake (DPoS)", "Avalanche Consensus", "Proof of History + PoS (PoH)"],
    point: { x: 200, y: 155 } // Left edge
  }
};

export default function TrilemmaSimulator() {
  const [selectedTradeOff, setSelectedTradeOff] = useState("decentralization_security");

  const current = tradeOffs[selectedTradeOff];

  return (
    <div className="w-full bg-[#121214]/80 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-xl text-left">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-yellow-400">Interactive Trilemma Simulator</h3>
        <p className="text-sm text-zinc-400">
          Click the edges of the triangle or use the selector buttons below to examine how consensus mechanisms balance the trade-offs of the Blockchain Trilemma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Triangle SVG Visualizer */}
        <div className="md:col-span-5 flex justify-center py-4">
          <div className="relative w-[300px] h-[300px]">
            <svg viewBox="0 0 500 300" className="w-full h-full">
              {/* Outer Glow Triangle */}
              <polygon
                points="250,60 350,250 150,250"
                className="fill-none stroke-yellow-500/20 stroke-[3]"
              />

              {/* Dynamic filled area connecting selection */}
              <motion.polygon
                points={`250,60 ${current.point.x},${current.point.y} ${selectedTradeOff === 'decentralization_security' ? '150,250' : selectedTradeOff === 'security_scalability' ? '350,250' : '150,250'}`}
                className="fill-yellow-500/5 stroke-yellow-500/60 stroke-[2] transition-all duration-500"
              />

              {/* Edges Buttons / Hotspots (Invisible overlays for clicking lines) */}
              {/* Left Edge (Decentralization - Scalability) */}
              <line
                x1="250" y1="60" x2="150" y2="250"
                className="stroke-transparent stroke-[16] cursor-pointer hover:stroke-yellow-500/10 transition-colors"
                onClick={() => setSelectedTradeOff("decentralization_scalability")}
              />
              {/* Right Edge (Scalability - Security) */}
              <line
                x1="250" y1="60" x2="350" y2="250"
                className="stroke-transparent stroke-[16] cursor-pointer hover:stroke-yellow-500/10 transition-colors"
                onClick={() => setSelectedTradeOff("security_scalability")}
              />
              {/* Bottom Edge (Decentralization - Security) */}
              <line
                x1="150" y1="250" x2="350" y2="250"
                className="stroke-transparent stroke-[16] cursor-pointer hover:stroke-yellow-500/10 transition-colors"
                onClick={() => setSelectedTradeOff("decentralization_security")}
              />

              {/* Vertices Points */}
              {/* Scalability (Top) */}
              <circle cx="250" cy="60" r="8" className="fill-black stroke-yellow-400 stroke-2" />
              <text x="250" y="42" textAnchor="middle" className="fill-yellow-400 text-xs font-bold tracking-wider uppercase">
                Scalability
              </text>

              {/* Security (Right) */}
              <circle cx="350" cy="250" r="8" className="fill-black stroke-yellow-400 stroke-2" />
              <text x="362" y="254" textAnchor="start" className="fill-yellow-400 text-xs font-bold tracking-wider uppercase">
                Security
              </text>

              {/* Decentralization (Left) */}
              <circle cx="150" cy="250" r="8" className="fill-black stroke-yellow-400 stroke-2" />
              <text x="138" y="254" textAnchor="end" className="fill-yellow-400 text-xs font-bold tracking-wider uppercase">
                Decentralization
              </text>

              {/* Selection Indicator Node */}
              <motion.circle
                cx={current.point.x}
                cy={current.point.y}
                r="10"
                className="fill-yellow-400 filter drop-shadow-[0_0_8px_#EAB308]"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </svg>
          </div>
        </div>

        {/* Tradeoff Details Display */}
        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
          {/* Edge buttons for easy access */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTradeOff("decentralization_security")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                selectedTradeOff === "decentralization_security"
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "bg-black/40 text-zinc-400 border-zinc-800 hover:text-zinc-200"
              }`}
            >
              Decentralization + Security
            </button>
            <button
              onClick={() => setSelectedTradeOff("security_scalability")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                selectedTradeOff === "security_scalability"
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "bg-black/40 text-zinc-400 border-zinc-800 hover:text-zinc-200"
              }`}
            >
              Security + Scalability
            </button>
            <button
              onClick={() => setSelectedTradeOff("decentralization_scalability")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                selectedTradeOff === "decentralization_scalability"
                  ? "bg-yellow-500 text-black border-yellow-400"
                  : "bg-black/40 text-zinc-400 border-zinc-800 hover:text-zinc-200"
              }`}
            >
              Decentralization + Scalability
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTradeOff}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-black/40 border border-zinc-800/80 rounded-xl p-5 space-y-3"
            >
              <h4 className="font-semibold text-lg text-zinc-100 border-b border-zinc-800 pb-2">
                {current.title}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {current.description}
              </p>
              <div className="text-xs text-red-400 border border-red-950 bg-red-950/20 px-3 py-2 rounded-lg font-medium">
                <span className="font-bold text-red-300">Sacrifices:</span> {current.sacrifice}
              </div>
              <div>
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider block mb-1">
                  Example Mechanisms
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {current.examples.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-zinc-800 text-zinc-300 text-xs px-2.5 py-1 rounded border border-zinc-700/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
