import { FaRegIdBadge, FaUniversity } from "react-icons/fa";

export default function AboutSection() {
  const team = [
    {
      name: "A. Sri Charan",
      regNo: "CB.EN.U4ECE23206",
      initials: "SC"
    },
    {
      name: "Chittesh",
      regNo: "CB.EN.U4ECE23012",
      initials: "C"
    }
  ];

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Banner / Intro */}
      <div className="bg-[#121214]/90 border border-zinc-800 rounded-2xl p-6 backdrop-blur-md shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-4">
          <div>
            <span className="text-xs bg-yellow-500 text-black font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider">
              Educational Project
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">
              About the Project
            </h2>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 font-semibold text-sm bg-black/40 border border-zinc-800 px-3.5 py-2 rounded-xl">
            <FaUniversity className="text-yellow-500" />
            <span>Amrita Vishwa Vidyapeetham</span>
          </div>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          The Consensus Algorithms Explorer is an interactive, sandbox-style educational platform designed to
          clarify distributed consensus systems. By mapping and analyzing 13 key consensus algorithms, simulating
          Vitalik Buterin's Blockchain Trilemma, and linking Layer 1 engines to Layer 2 scaling matrices, this platform
          serves as a visual resource for students, researchers, and developers exploring blockchain infrastructure.
        </p>
      </div>

      {/* Teammates Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-zinc-100 border-b border-zinc-850 pb-2">
          Development Team
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member) => (
            <div
              key={member.regNo}
              className="bg-[#121214]/90 border border-zinc-800 hover:border-yellow-500/40 rounded-2xl p-5 backdrop-blur-md shadow-lg transition duration-300 relative group flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center space-x-4">
                {/* Glowing Initials Avatar */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 flex items-center justify-center font-bold text-yellow-400 text-lg shadow-[0_0_8px_rgba(245,197,24,0.1)] group-hover:scale-105 transition-transform">
                  {member.initials}
                </div>
                <div>
                  <h4 className="text-md font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {member.name}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mt-0.5">
                    Team Member
                  </span>
                </div>
              </div>

              {/* ID Register info */}
              <div className="border-t border-zinc-850 pt-3 flex justify-between items-center text-[11px] text-zinc-500">
                <div className="flex items-center space-x-1.5">
                  <FaRegIdBadge className="text-yellow-500/70" />
                  <span className="font-mono text-zinc-400">{member.regNo}</span>
                </div>
                <span className="font-semibold text-zinc-600 uppercase tracking-widest text-[9px]">
                  ECE Department
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

