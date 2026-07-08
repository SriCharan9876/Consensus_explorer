import { useState } from "react";
import { motion } from "framer-motion";
import { FaBolt, FaClock, FaLeaf, FaCoins, FaLock, FaShieldAlt } from "react-icons/fa";
import { consensusAlgorithms } from "../data/consensusData";

export default function ComparisonMode() {
  const [idA, setIdA] = useState("pow");
  const [idB, setIdB] = useState("pos");

  const algoA = consensusAlgorithms.find((a) => a.id === idA) || consensusAlgorithms[0];
  const algoB = consensusAlgorithms.find((a) => a.id === idB) || consensusAlgorithms[1];

  const statCompRow = (icon, title, valA, valB) => (
    <div className="bg-[#1e1e22]/50 border border-zinc-800/80 rounded-xl p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
      <div className="flex items-center space-x-2 text-yellow-500 font-bold uppercase tracking-wider text-xs md:w-1/4">
        {icon}
        <span>{title}</span>
      </div>
      <div className="text-zinc-200 text-sm font-semibold md:w-3/8 text-left md:border-r border-zinc-800 pr-4">
        {valA}
      </div>
      <div className="text-zinc-200 text-sm font-semibold md:w-3/8 text-left md:pl-4">
        {valB}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 text-left">
      {/* Selector bar */}
      <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-2/5">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Algorithm A</label>
          <select
            value={idA}
            onChange={(e) => setIdA(e.target.value)}
            className="w-full bg-[#1e1e22] border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 font-semibold focus:outline-none focus:border-yellow-500 transition"
          >
            {consensusAlgorithms.map((a) => (
              <option key={a.id} value={a.id} disabled={a.id === idB}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex bg-yellow-500 text-black w-10 h-10 rounded-full items-center justify-center font-black shadow-[0_0_12px_rgba(234,179,8,0.3)] select-none">
          VS
        </div>

        <div className="w-full md:w-2/5">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Algorithm B</label>
          <select
            value={idB}
            onChange={(e) => setIdB(e.target.value)}
            className="w-full bg-[#1e1e22] border border-zinc-800 rounded-xl py-3 px-4 text-zinc-200 font-semibold focus:outline-none focus:border-yellow-500 transition"
          >
            {consensusAlgorithms.map((a) => (
              <option key={a.id} value={a.id} disabled={a.id === idA}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Algo A Details */}
        <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-[10px] bg-yellow-500 text-black font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
            {algoA.category}
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">{algoA.name}</h3>
          <div className="text-xs text-zinc-500">
            Invented by <span className="text-zinc-300 font-semibold">{algoA.inventedBy}</span> in <span className="text-zinc-300 font-semibold">{algoA.year}</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed border-t border-zinc-800 pt-3">
            {algoA.description}
          </p>
        </div>

        {/* Algo B Details */}
        <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
          <span className="text-[10px] bg-yellow-500 text-black font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
            {algoB.category}
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">{algoB.name}</h3>
          <div className="text-xs text-zinc-500">
            Invented by <span className="text-zinc-300 font-semibold">{algoB.inventedBy}</span> in <span className="text-zinc-300 font-semibold">{algoB.year}</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed border-t border-zinc-800 pt-3">
            {algoB.description}
          </p>
        </div>
      </div>

      {/* Trilemma Comparison */}
      <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4">
        <h4 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-2">
          Trilemma Balance Scores
        </h4>
        <div className="space-y-4">
          {/* Scalability */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-zinc-400">
              <span>SCALABILITY</span>
              <div className="flex space-x-6">
                <span className="text-yellow-400">{algoA.name}: {algoA.trilemma.scalability}%</span>
                <span className="text-yellow-500">{algoB.name}: {algoB.trilemma.scalability}%</span>
              </div>
            </div>
            <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden flex">
              <div className="bg-yellow-500 h-full transition-all duration-300" style={{ width: `${algoA.trilemma.scalability / 2}%` }} />
              <div className="w-[1px] bg-black" />
              <div className="bg-yellow-600 h-full transition-all duration-300" style={{ width: `${algoB.trilemma.scalability / 2}%` }} />
            </div>
          </div>

          {/* Security */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-zinc-400">
              <span>SECURITY</span>
              <div className="flex space-x-6">
                <span className="text-yellow-400">{algoA.name}: {algoA.trilemma.security}%</span>
                <span className="text-yellow-500">{algoB.name}: {algoB.trilemma.security}%</span>
              </div>
            </div>
            <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden flex">
              <div className="bg-yellow-500 h-full transition-all duration-300" style={{ width: `${algoA.trilemma.security / 2}%` }} />
              <div className="w-[1px] bg-black" />
              <div className="bg-yellow-600 h-full transition-all duration-300" style={{ width: `${algoB.trilemma.security / 2}%` }} />
            </div>
          </div>

          {/* Decentralization */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-zinc-400">
              <span>DECENTRALIZATION</span>
              <div className="flex space-x-6">
                <span className="text-yellow-400">{algoA.name}: {algoA.trilemma.decentralization}%</span>
                <span className="text-yellow-500">{algoB.name}: {algoB.trilemma.decentralization}%</span>
              </div>
            </div>
            <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden flex">
              <div className="bg-yellow-500 h-full transition-all duration-300" style={{ width: `${algoA.trilemma.decentralization / 2}%` }} />
              <div className="w-[1px] bg-black" />
              <div className="bg-yellow-600 h-full transition-all duration-300" style={{ width: `${algoB.trilemma.decentralization / 2}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats comparison table rows */}
      <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-3">
        <h4 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 mb-2">
          Performance Metrics Comparison
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {statCompRow(<FaBolt />, "Throughput (TPS)", algoA.performance.tps, algoB.performance.tps)}
          {statCompRow(<FaClock />, "Block / Epoch Time", algoA.performance.blockTime, algoB.performance.blockTime)}
          {statCompRow(<FaLeaf />, "Energy Consumption", algoA.performance.energy, algoB.performance.energy)}
          {statCompRow(<FaCoins />, "Transaction Cost", algoA.performance.cost, algoB.performance.cost)}
          {statCompRow(<FaLock />, "Time To Finality", algoA.performance.finality, algoB.performance.finality)}
        </div>
      </div>

      {/* Pros & Cons comparison columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4">
          <h4 className="font-bold text-zinc-100 text-md border-b border-zinc-800 pb-2">
            Pros/Cons: <span className="text-yellow-400">{algoA.name}</span>
          </h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-emerald-400 font-bold tracking-wider block mb-1">ADVANTAGES</span>
              <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                {algoA.advantages.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div>
              <span className="text-xs text-red-400 font-bold tracking-wider block mb-1">DISADVANTAGES</span>
              <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                {algoA.disadvantages.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4">
          <h4 className="font-bold text-zinc-100 text-md border-b border-zinc-800 pb-2">
            Pros/Cons: <span className="text-yellow-400">{algoB.name}</span>
          </h4>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-emerald-400 font-bold tracking-wider block mb-1">ADVANTAGES</span>
              <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                {algoB.advantages.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
            <div>
              <span className="text-xs text-red-400 font-bold tracking-wider block mb-1">DISADVANTAGES</span>
              <ul className="list-disc pl-4 text-xs text-zinc-400 space-y-1">
                {algoB.disadvantages.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Security matrix comparisons */}
      <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-3">
        <h4 className="text-base font-bold text-white uppercase tracking-wider border-b border-zinc-800 pb-3 mb-2 flex items-center gap-2">
          <FaShieldAlt className="text-yellow-500" /> Vulnerability Resistance comparison
        </h4>
        <div className="grid grid-cols-1 gap-4 mt-2">
          {/* 51% Attack */}
          <div className="border border-zinc-800 rounded-xl p-4 bg-black/40">
            <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wide mb-2">51% / 34% Attacks</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-xs text-zinc-300 border-r border-zinc-800/80 pr-4">
                <span className="font-bold text-zinc-500 block mb-1">{algoA.name}</span>
                {algoA.security.fiftyOnePercent}
              </div>
              <div className="text-xs text-zinc-300 md:pl-4">
                <span className="font-bold text-zinc-500 block mb-1">{algoB.name}</span>
                {algoB.security.fiftyOnePercent}
              </div>
            </div>
          </div>

          {/* Double Spending */}
          <div className="border border-zinc-800 rounded-xl p-4 bg-black/40">
            <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wide mb-2">Double Spending</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-xs text-zinc-300 border-r border-zinc-800/80 pr-4">
                <span className="font-bold text-zinc-500 block mb-1">{algoA.name}</span>
                {algoA.security.doubleSpending}
              </div>
              <div className="text-xs text-zinc-300 md:pl-4">
                <span className="font-bold text-zinc-500 block mb-1">{algoB.name}</span>
                {algoB.security.doubleSpending}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
