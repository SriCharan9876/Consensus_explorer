export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 py-6 text-center text-xs text-zinc-500 flex flex-col md:flex-row justify-between items-center gap-2 mt-auto bg-[#070708]/90 z-20">
      <span>© 2026 Blockchain Consensus Explorer. Designed for interactive ledger education.</span>
      <div className="flex space-x-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-yellow-400 transition"
        >
          GitHub
        </a>
        <span>•</span>
        <a
          href="https://ethereum.org"
          target="_blank"
          rel="noreferrer"
          className="hover:text-yellow-400 transition"
        >
          Ethereum Docs
        </a>
        <span>•</span>
        <a
          href="https://solana.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-yellow-400 transition"
        >
          Solana Specs
        </a>
      </div>
    </footer>
  );
}
