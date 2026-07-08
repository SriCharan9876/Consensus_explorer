import { useState } from "react";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { compatibilityMatrix } from "../data/consensusData";

export default function CompatibilityHeatmap() {
  const { blockchains, matrix } = compatibilityMatrix;
  const [hoveredCell, setHoveredCell] = useState({ row: "Bitcoin", col: "Bitcoin" });

  const getCellDetails = (row, col) => {
    return matrix[row]?.[col] || { status: "🔴", desc: "No direct compatibility record found." };
  };

  const getStatusColor = (status) => {
    if (status === "🟢") return "bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/35 text-emerald-400";
    if (status === "🟡") return "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/35 text-amber-400";
    return "bg-zinc-900/50 hover:bg-zinc-800/80 border-zinc-800/80 text-zinc-500";
  };

  const currentDetails = getCellDetails(hoveredCell.row, hoveredCell.col);

  return (
    <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-6 text-left">
      <div>
        <h3 className="text-lg font-bold text-white">Cross-Chain Compatibility Matrix</h3>
        <p className="text-xs text-zinc-400">
          Interactive heatmap comparing compatibility based on underlying consensus engines. Hover or tap cells to read specific bridge or architectural alignments.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-2.5 py-1 rounded-md">
          <FaCheckCircle className="text-[10px]" /> 🟢 Compatible (Same family)
        </span>
        <span className="flex items-center gap-1.5 text-amber-400 bg-amber-950/20 border border-amber-900/40 px-2.5 py-1 rounded-md">
          <FaExclamationTriangle className="text-[10px]" /> 🟡 Partially Compatible (Hybrid/Related)
        </span>
        <span className="flex items-center gap-1.5 text-zinc-400 bg-zinc-900/50 border border-zinc-800 px-2.5 py-1 rounded-md">
          <FaTimesCircle className="text-[10px]" /> 🔴 Different Mechanisms
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Heatmap Grid */}
        <div className="lg:col-span-8 overflow-x-auto pb-2">
          <div className="min-w-[480px]">
            {/* Column Headers */}
            <div className="grid grid-cols-9 gap-1 text-center font-bold text-[9px] text-zinc-500 mb-1">
              <div className="text-left font-normal pl-1">Blockchain</div>
              {blockchains.map((name) => (
                <div key={name} className="truncate" title={name}>
                  {name.substring(0, 5)}..
                </div>
              ))}
            </div>

            {/* Matrix Rows */}
            <div className="space-y-1">
              {blockchains.map((rowName) => (
                <div key={rowName} className="grid grid-cols-9 gap-1 items-center">
                  {/* Row Header */}
                  <div className="text-[10px] font-bold text-zinc-400 truncate pr-1">
                    {rowName}
                  </div>
                  {/* Heatmap cells */}
                  {blockchains.map((colName) => {
                    const details = getCellDetails(rowName, colName);
                    const isSelected = hoveredCell.row === rowName && hoveredCell.col === colName;
                    return (
                      <button
                        key={colName}
                        onMouseEnter={() => setHoveredCell({ row: rowName, col: colName })}
                        onClick={() => setHoveredCell({ row: rowName, col: colName })}
                        className={`h-9 rounded border text-sm font-bold flex items-center justify-center transition-all ${getStatusColor(
                          details.status
                        )} ${isSelected ? "ring-2 ring-yellow-500 scale-105 z-10" : ""}`}
                        title={`${rowName} ↔ ${colName}`}
                      >
                        {details.status}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Tooltip detail card */}
        <div className="lg:col-span-4 flex flex-col h-full justify-between">
          <div className="bg-black/50 border border-zinc-800 rounded-xl p-5 space-y-3 relative">
            <div className="absolute -left-1 top-6 w-2 h-10 bg-yellow-500 rounded-r-md" />
            <div className="space-y-1 pl-2">
              <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">
                Compatibility Relation
              </span>
              <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-1.5">
                {hoveredCell.row} ↔ {hoveredCell.col}
              </h4>
            </div>

            <div className="pl-2 space-y-2 border-t border-zinc-850 pt-2.5">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-zinc-500 font-semibold">Status:</span>
                <span
                  className={`font-bold flex items-center gap-1 ${
                    currentDetails.status === "🟢"
                      ? "text-emerald-400"
                      : currentDetails.status === "🟡"
                      ? "text-amber-400"
                      : "text-red-400"
                  }`}
                >
                  {currentDetails.status === "🟢" && "Fully Compatible"}
                  {currentDetails.status === "🟡" && "Partially Compatible"}
                  {currentDetails.status === "🔴" && "Incompatible (Different Engine)"}
                </span>
              </div>

              <div className="text-xs text-zinc-300 leading-relaxed bg-[#121214] border border-zinc-850 p-3 rounded-lg flex items-start gap-2">
                <FaInfoCircle className="text-yellow-500 mt-0.5 flex-shrink-0 text-[13px]" />
                <span>{currentDetails.desc}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
