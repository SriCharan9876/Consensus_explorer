import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { comparisonTableData } from "../data/consensusData";

export default function ComparisonTable() {
  const [sortKey, setSortKey] = useState("algo");
  const [sortOrder, setSortOrder] = useState("asc");

  // Sort function
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const parseTps = (tpsStr) => {
    // extract digits
    const cleaned = tpsStr.replace(/[^0-9]/g, "");
    return cleaned ? parseInt(cleaned) : 0;
  };

  const getSortValue = (row, key) => {
    if (key === "tps") {
      return parseTps(row.tps);
    }
    // simple string fallback
    return row[key] || "";
  };

  const sortedData = [...comparisonTableData].sort((a, b) => {
    const valA = getSortValue(a, sortKey);
    const valB = getSortValue(b, sortKey);

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (key) => {
    if (sortKey !== key) return <FaSort className="text-zinc-600 text-[10px]" />;
    return sortOrder === "asc" ? (
      <FaSortUp className="text-yellow-500 text-[10px]" />
    ) : (
      <FaSortDown className="text-yellow-500 text-[10px]" />
    );
  };

  const getEnergyBadgeClass = (energy) => {
    const eng = energy.toLowerCase();
    if (eng.includes("extremely low") || eng.includes("minimal") || eng.includes("microscopic")) {
      return "bg-emerald-950/20 text-emerald-400 border-emerald-900/30";
    }
    if (eng.includes("very high")) {
      return "bg-red-950/20 text-red-400 border-red-900/30";
    }
    return "bg-amber-950/20 text-amber-400 border-amber-900/30";
  };

  return (
    <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg space-y-4 text-left">
      <div>
        <h3 className="text-lg font-bold text-white">Consensus Matrix Benchmark</h3>
        <p className="text-xs text-zinc-400">
          Comparative parameters across all 13 supported consensus algorithms. Click headers to sort by metrics.
        </p>
      </div>

      <div className="overflow-x-auto border border-zinc-800/80 rounded-xl bg-black/40">
        <table className="w-full border-collapse text-xs text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-zinc-800 bg-[#1e1e22]/50 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th
                onClick={() => handleSort("name")}
                className="py-3 px-4 cursor-pointer hover:bg-zinc-800/20 select-none transition"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Algorithm</span>
                  {renderSortIcon("name")}
                </div>
              </th>
              <th
                onClick={() => handleSort("mechanism")}
                className="py-3 px-3 cursor-pointer hover:bg-zinc-800/20 select-none transition"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Mechanism</span>
                  {renderSortIcon("mechanism")}
                </div>
              </th>
              <th
                onClick={() => handleSort("tps")}
                className="py-3 px-3 cursor-pointer hover:bg-zinc-800/20 select-none transition"
              >
                <div className="flex items-center space-x-1.5">
                  <span>TPS</span>
                  {renderSortIcon("tps")}
                </div>
              </th>
              <th
                onClick={() => handleSort("blockTime")}
                className="py-3 px-3 cursor-pointer hover:bg-zinc-800/20 select-none transition"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Block Time</span>
                  {renderSortIcon("blockTime")}
                </div>
              </th>
              <th
                onClick={() => handleSort("energy")}
                className="py-3 px-3 cursor-pointer hover:bg-zinc-800/20 select-none transition"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Energy</span>
                  {renderSortIcon("energy")}
                </div>
              </th>
              <th
                onClick={() => handleSort("security")}
                className="py-3 px-3 cursor-pointer hover:bg-zinc-800/20 select-none transition"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Security</span>
                  {renderSortIcon("security")}
                </div>
              </th>
              <th
                onClick={() => handleSort("decentralization")}
                className="py-3 px-3 cursor-pointer hover:bg-zinc-800/20 select-none transition"
              >
                <div className="flex items-center space-x-1.5">
                  <span>Decentr.</span>
                  {renderSortIcon("decentralization")}
                </div>
              </th>
              <th className="py-3 px-4 text-zinc-500 font-normal">Typical Networks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-850">
            {sortedData.map((row) => (
              <tr
                key={row.algo}
                className="hover:bg-zinc-800/10 transition text-zinc-300 font-medium"
              >
                <td className="py-3.5 px-4 font-bold text-zinc-100">{row.name}</td>
                <td className="py-3.5 px-3 text-xs">{row.mechanism}</td>
                <td className="py-3.5 px-3 font-mono font-bold text-yellow-400">{row.tps}</td>
                <td className="py-3.5 px-3 text-zinc-400 font-mono">{row.blockTime}</td>
                <td className="py-3.5 px-3">
                  <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold ${getEnergyBadgeClass(row.energy)}`}>
                    {row.energy}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-zinc-200">{row.security}</td>
                <td className="py-3.5 px-3 text-zinc-200">{row.decentralization}</td>
                <td className="py-3.5 px-4 text-xs text-zinc-400 truncate max-w-[180px]" title={row.networks}>
                  {row.networks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
