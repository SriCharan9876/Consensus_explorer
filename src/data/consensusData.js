// Comprehensive dataset for Blockchain Consensus Explorer

export const consensusAlgorithms = [
  {
    id: "pow",
    name: "Proof of Work",
    inventedBy: "Satoshi Nakamoto",
    year: 2008,
    coreMechanism: "Computational Mining",
    category: "Competitive Consensus",
    description: "Miners compete to solve complex cryptographic puzzles. The first miner to find a hash matching the network's difficulty target earns the right to append the next block and receives block rewards and transaction fees.",
    example: "Bitcoin (BTC)",
    trilemma: { scalability: 30, security: 98, decentralization: 90 },
    performance: {
      blockTime: "10 min",
      tps: "7 - 10",
      energy: "Very High (Gigawatts/Year)",
      cost: "High ($2.00 - $50.00+)",
      finality: "60 min (6 confirmations)"
    },
    advantages: [
      "Highest security guarantee through physical thermodynamics and raw compute power.",
      "Extremely decentralized: open to anyone with hardware, no permission needed.",
      "Battle-tested over 17+ years with zero successful consensus compromises."
    ],
    disadvantages: [
      "Massive environmental footprint due to continuous high electricity usage.",
      "Highly susceptible to mining centralization in regions with cheap electricity.",
      "Poor scalability and throughput, resulting in high network congestion and fees."
    ],
    steps: [
      { num: 1, title: "Transaction Broadcast", desc: "Users sign and broadcast transactions to the decentralized peer-to-peer network." },
      { num: 2, title: "Mempool Accumulation", desc: "Nodes receive transactions, validate basic formats, and store them in their local Memory Pool (mempool)." },
      { num: 3, title: "Block Creation", desc: "Miners pull valid transactions from the mempool and bundle them into a candidate block." },
      { num: 4, title: "Nonce Hashing Puzzle", desc: "Miners run millions of SHA-256 hashes per second, altering a value called the 'nonce' to get a hash with a specific number of leading zeros." },
      { num: 5, title: "Solution Broadcast", desc: "The first miner to find the correct nonce broadcasts their block along with the solution to all peer nodes." },
      { num: 6, title: "P2P Verification", desc: "Nodes verify that the block's hash is valid and check that all transaction signatures inside are legitimate." },
      { num: 7, title: "Permanent Ledger Entry", desc: "Nodes append the block to their local chain databases and start working on the next block, routing the reward to the miner." }
    ],
    security: {
      fiftyOnePercent: "Attacker must command more than 51% of global hashrate. For Bitcoin, this costs billions of dollars in hardware and electricity, rendering attacks economically irrational.",
      sybil: "Sybil attacks are mitigated by tying network voting power to physical hardware hashrate rather than individual IP addresses.",
      doubleSpending: "Prevented by the 'longest chain rule' (cumulative Proof of Work). Transactions are secure once buried under several blocks.",
      byzantine: "Tolerates up to 50% of the hashing power behaving dishonestly or dropping offline."
    },
    realWorldChains: [
      { name: "Bitcoin", consensus: "Proof of Work", reason: "Prioritizes ultimate censorship resistance, decentralization, and security over speed." },
      { name: "Litecoin", consensus: "Proof of Work (Scrypt)", reason: "Uses Scrypt to allow GPU mining and maintain a fast, low-cost decentralized transaction ledger." },
      { name: "Dogecoin", consensus: "Proof of Work (AuxPoW)", reason: "Merged mines with Litecoin to secure its meme-based utility network with high security." }
    ]
  },
  {
    id: "pos",
    name: "Proof of Stake",
    inventedBy: "Sunny King & Scott Nadal",
    year: 2012,
    coreMechanism: "Collateral Staking",
    category: "Stake-weighted Consensus",
    description: "Validators lock up native tokens as collateral (stake). The network selects validators to propose and attest to blocks based on the size of their stake. If validators act maliciously, their stake is permanently destroyed (slashed).",
    example: "Ethereum (ETH)",
    trilemma: { scalability: 70, security: 90, decentralization: 80 },
    performance: {
      blockTime: "12 sec",
      tps: "15 - 45 (Base Layer)",
      energy: "Extremely Low (~99.95% reduction)",
      cost: "Medium ($0.05 - $5.00+)",
      finality: "13 min (2 epochs)"
    },
    advantages: [
      "Extremely energy-efficient; runs on standard computers instead of server farms.",
      "High economic security: validators are financially penalized for cheating via slashing.",
      "Supports native protocol scaling strategies like sharding."
    ],
    disadvantages: [
      "Risk of capital centralization: entities with more tokens earn more, compounding influence.",
      "The 'Nothing at Stake' problem: validators are incentivized to sign blocks on multiple forks unless slashing is strictly implemented.",
      "Complex protocol mechanics (epochs, checkpoints, slashing queues) increase bug risks."
    ],
    steps: [
      { num: 1, title: "Transaction Submission", desc: "Users submit transactions, which are signed with private keys and sent to validator nodes." },
      { num: 2, title: "Mempool Syncing", desc: "Transactions are propagated and held in the mempools of validator nodes." },
      { num: 3, title: "Validator Selection", desc: "A validator is randomly selected to propose a block. The selection chance increases proportionally with their staked capital." },
      { num: 4, title: "Block Proposal", desc: "The selected validator bundles valid transactions, signs the block, and broadcasts it as the new slot proposal." },
      { num: 5, title: "Attestation & Voting", desc: "A committee of other validators is chosen to verify the proposed block and submit cryptographic votes (attestations)." },
      { num: 6, title: "Slashing Check", desc: "Protocol rules check for double-signing or validator downtime; penalties are applied immediately to bad actors." },
      { num: 7, title: "Block Finalization", desc: "Once a supermajority of validators (typically 2/3 of stake) signs off, the block achieves finality and is added to the ledger." }
    ],
    security: {
      fiftyOnePercent: "An attacker must control 51% of all staked tokens. Acquiring this amount would drive token prices exponentially high and devalue the attacker's own assets if they compromise the network.",
      sybil: "Mitigated by locking up real capital. A Sybil node cannot vote without a financial stake deposit.",
      doubleSpending: "Prevented by slashing: signing two blocks at the same height burns the validator's entire stake, instantly removing them from consensus.",
      byzantine: "Maintains consensus and safety under Byzantine failures up to 1/3 of the total staked tokens."
    },
    realWorldChains: [
      { name: "Ethereum", consensus: "Proof of Stake (Gasper)", reason: "Switched from PoW to drastically cut energy use and establish a foundation for rollup scalability." },
      { name: "Cardano", consensus: "Proof of Stake (Ouroboros)", reason: "Uses a mathematically proven secure, peer-reviewed PoS protocol with delegation pools." },
      { name: "Polkadot", consensus: "Nominated Proof of Stake (NPoS)", reason: "Nominators select active validators to secure the relay chain and shared parachains." }
    ]
  },
  {
    id: "dpos",
    name: "Delegated Proof of Stake",
    inventedBy: "Dan Larimer",
    year: 2014,
    coreMechanism: "Representative Voting",
    category: "Delegated Consensus",
    description: "Token holders vote to elect a limited, high-performance committee of delegates (witnesses/validators). These delegates are responsible for verifying transactions, producing blocks, and maintaining security. Voters can dynamically replace underperforming delegates.",
    example: "EOS",
    trilemma: { scalability: 90, security: 75, decentralization: 60 },
    performance: {
      blockTime: "0.5 - 3 sec",
      tps: "1,500 - 5,000+",
      energy: "Very Low",
      cost: "Negligible (<$0.001)",
      finality: "1 - 3 sec"
    },
    advantages: [
      "Incredibly fast block creation and transaction confirmation.",
      "Low latency, high throughput, and cost-efficient execution suitable for consumer apps.",
      "Highly democratic structure allowing anyone to vote delegates out in real time."
    ],
    disadvantages: [
      "More centralized: block production is controlled by a small group of nodes (e.g., 21 delegates).",
      "Vulnerable to voter apathy, where a tiny minority of rich token holders controls delegate slots.",
      "Potential for cartels, bribery, and collusive block-producer behaviors."
    ],
    steps: [
      { num: 1, title: "Delegate Elections", desc: "Token holders cast continuous, weighted votes to select block-producing delegates (e.g., top 21 witnesses)." },
      { num: 2, title: "Tx Broadcasting", desc: "Users submit transactions, which are routed to the current active delegate list." },
      { num: 3, title: "Slot Allocation", desc: "The network assigns block-producing time slots to the elected delegates sequentially." },
      { num: 4, title: "Block Creation", desc: "The designated delegate gathers pending transactions, compiles a block, and signs it within their scheduled slot." },
      { num: 5, title: "Peer Sign-off", desc: "Other elected delegates verify the block. As long as a majority signs off, the block is verified." },
      { num: 6, title: "Missed Slot Penalties", desc: "If a delegate fails to produce a block on time, their slot is skipped and they lose rewards, lowering their voter ranking." },
      { num: 7, title: "Instant Settlement", desc: "The block is added to the ledger, and the cycle continues with the next delegate." }
    ],
    security: {
      fiftyOnePercent: "Attacking the chain requires colluding with or compromising a majority of the active delegates (e.g., 11 out of 21). Easier to coordinate than PoW or PoS.",
      sybil: "Mitigated by voting power being proportional to tokens. Fake accounts have zero vote weighting.",
      doubleSpending: "Avoided by rapid block creation schedules and immediate consensus confirmations among the limited delegate set.",
      byzantine: "Tolerates less than 1/3 of the elected delegates acting dishonestly before performance drops."
    },
    realWorldChains: [
      { name: "EOS", consensus: "Delegated Proof of Stake", reason: "Built to power fast, gasless dApps and high-throughput social/gaming applications." },
      { name: "TRON", consensus: "Delegated Proof of Stake", reason: "Uses 27 Super Representatives to support fast web3 transactions and smart contract processing." },
      { name: "Steem / Hive", consensus: "Delegated Proof of Stake", reason: "Designed for social media platforms requiring sub-second publishing and tipping." }
    ]
  },
  {
    id: "poa",
    name: "Proof of Authority",
    inventedBy: "Gavin Wood",
    year: 2017,
    coreMechanism: "Validator Reputation",
    category: "Identity-based Consensus",
    description: "Blocks are validated by pre-approved, highly vetted nodes known as validators. Instead of staking capital or computing hashes, validators stake their professional reputation and real-world identities to earn validation rights.",
    example: "VechainThor (VET)",
    trilemma: { scalability: 95, security: 65, decentralization: 20 },
    performance: {
      blockTime: "2 - 5 sec",
      tps: "1,000 - 10,000+",
      energy: "Minimal (Single-server levels)",
      cost: "Very Low (<$0.01)",
      finality: "Immediate or <10 sec"
    },
    advantages: [
      "Outstanding performance, throughput, and near-zero energy use.",
      "High reliability: validators are trusted entities (companies, institutions).",
      "Perfect for enterprise applications, supply chains, and private consortiums."
    ],
    disadvantages: [
      "Extremely centralized; control belongs only to a vetted group.",
      "Vulnerable to censorship and government coercion since validator identities are public.",
      "Not suitable for permissionless, public, trustless applications."
    ],
    steps: [
      { num: 1, title: "Identity Verification", desc: "Candidates undergo rigorous KYC (Know Your Customer) and background checks to be approved as validators." },
      { num: 2, title: "Tx Ingestion", desc: "Transactions are initiated by users and received by the authority nodes." },
      { num: 3, title: "Proposer Rotation", desc: "A deterministic algorithm rotates the block-producing responsibility among active validators." },
      { num: 4, title: "Block Signing", desc: "The designated validator aggregates, executes transactions, and signs the block using their cryptographic key." },
      { num: 5, title: "Authority Verification", desc: "Other validators verify the signature against the public registry of approved authority keys." },
      { num: 6, title: "Instant Block Addition", desc: "Since validators are trusted pre-screened entities, blocks are committed to the chain with minimal consensus rounds." },
      { num: 7, title: "Identity Forfeiture", desc: "If a validator signs bad blocks or attempts double-spending, their identity is blacklisted, they are sued, and they lose consensus rights." }
    ],
    security: {
      fiftyOnePercent: "If 51% of the authorized nodes are compromised or collude, they can rewrite history. However, identity exposure makes this legally and reputational suicidal.",
      sybil: "Immune to Sybil attacks. Only nodes whose public keys are hardcoded or registered in the authority smart contract can participate.",
      doubleSpending: "Prevented by authority tracking and deterministic slot schedules. Cheating leads to instant exclusion from the validator set.",
      byzantine: "Depends on standard crash fault tolerance or PBFT-style voting. Can tolerate up to 1/2 or 1/3 Byzantine nodes."
    },
    realWorldChains: [
      { name: "VeChain", consensus: "Proof of Authority (PoA 2.0)", reason: "Uses vetted Authority Masternodes to power high-throughput enterprise supply chain tracking." },
      { name: "BNB Smart Chain", consensus: "Proof of Staked Authority (PoSA)", reason: "Combines PoS and PoA to maintain validator reputation while allowing public staking delegation." },
      { name: "Klaytn", consensus: "Istanbul BFT (PoA-based)", reason: "Vets corporate council members to operate consensus nodes for mainstream enterprise dApps." }
    ]
  },
  {
    id: "pbft",
    name: "Practical Byzantine Fault Tolerance",
    inventedBy: "Miguel Castro & Barbara Liskov",
    year: 1999,
    coreMechanism: "Multi-round State Machine Replication",
    category: "Voting-based Consensus",
    description: "Designed for low-latency networks where nodes coordinate through multiple rounds of voting to reach consensus. A primary node (leader) proposes blocks, and secondary nodes must communicate to agree, tolerating up to 1/3 Byzantine failures.",
    example: "Hyperledger Fabric",
    trilemma: { scalability: 92, security: 88, decentralization: 35 },
    performance: {
      blockTime: "Instant (<1 sec)",
      tps: "10,000+",
      energy: "Extremely Low",
      cost: "Zero / Negligible",
      finality: "Instant (Absolute finality)"
    },
    advantages: [
      "Absolute finality: once a block is agreed, it can never be rolled back or orphaned.",
      "High throughput and zero computational waste.",
      "Does not require cryptocurrency block rewards to function."
    ],
    disadvantages: [
      "O(N²) message complexity: network communication overhead explodes as the node count increases.",
      "Not scalable: limited to around 20-100 consensus nodes before the network bottlenecks.",
      "Highly vulnerable to network partitioning and DDoS attacks on the primary node."
    ],
    steps: [
      { num: 1, title: "Request", desc: "A client sends a transaction request to the primary node (leader)." },
      { num: 2, title: "Pre-Prepare Phase", desc: "The primary node assigns a sequence number, packages the transaction, and broadcasts a Pre-Prepare message to all backups." },
      { num: 3, title: "Prepare Phase", desc: "Backup nodes verify the message and broadcast a Prepare message to all other nodes, indicating they accept the order." },
      { num: 4, title: "Prepare Agreement", desc: "Each node waits until it receives 2f (where f is dishonest nodes) Prepare messages, verifying the sequence is identical." },
      { num: 5, title: "Commit Phase", desc: "Nodes broadcast a Commit message to all other nodes, stating that they have received 2f Prepare messages and are ready to execute." },
      { num: 6, title: "Execution", desc: "Each node executes the transaction locally and records the state change." },
      { num: 7, title: "Reply", desc: "Nodes send their execution result back to the client. Once the client receives f+1 identical replies, the transaction is finalized." }
    ],
    security: {
      fiftyOnePercent: "Does not use hash power or staking. To compromise consensus, an attacker must compromise at least 1/3 of the active validator nodes (33% attack).",
      sybil: "Mitigated by strict cryptographic access control list (ACL). Unauthorized nodes cannot send votes.",
      doubleSpending: "Impossible. The state machine model ensures absolute finality; blocks cannot be reorganized.",
      byzantine: "Guarantees safety and liveness as long as more than 2/3 of nodes are honest (n >= 3f + 1)."
    },
    realWorldChains: [
      { name: "Hyperledger Fabric", consensus: "Raft / PBFT variants", reason: "Built for permissioned corporate networks where node identities are known and absolute finality is required." },
      { name: "Zilliqa", consensus: "PBFT + PoW Sharding", reason: "Uses PoW for identity and PBFT for low-latency consensus inside sharded node clusters." },
      { name: "Tendermint (Cosmos)", consensus: "PBFT-derived PoS", reason: "Adapts PBFT concepts to scale to 100+ public validators using stake weight instead of simple counts." }
    ]
  },
  {
    id: "poh",
    name: "Proof of History",
    inventedBy: "Anatoly Yakovenko",
    year: 2017,
    coreMechanism: "Cryptographic Time Verification",
    category: "Chronological Consensus Helper",
    description: "Not a standalone consensus mechanism, but a logical clock that uses a Verifiable Delay Function (VDF) to cryptographically prove that time has passed. This allows validators to agree on the sequence of events without having to communicate in real time, unlocking massive speeds.",
    example: "Solana (SOL)",
    trilemma: { scalability: 97, security: 82, decentralization: 55 },
    performance: {
      blockTime: "400 ms",
      tps: "50,000 - 65,000+",
      energy: "Low",
      cost: "Microscopic (<$0.0005)",
      finality: "1 - 2 sec"
    },
    advantages: [
      "Enables unmatched transaction throughput and sub-second block times.",
      "Reduces network messaging overhead because nodes don't need to coordinate clocks.",
      "Optimized for high-performance hardware and parallel execution."
    ],
    disadvantages: [
      "Extremely high hardware entry barriers (specialized fast CPUs, massive RAM, high bandwidth).",
      "High rate of empty block spaces and risk of validator centralization in data centers.",
      "Complexity of handling out-of-order execution states."
    ],
    steps: [
      { num: 1, title: "Continuous VDF Hashing", desc: "A leader node runs a SHA-256 loop where each output becomes the next input, acting as a cryptographic clock." },
      { num: 2, title: "Tx Ingestion", desc: "Transactions arrive at the leader node and are tagged with the current VDF hash count, creating a timestamp." },
      { num: 3, title: "Parallel Execution", desc: "The leader orders transactions according to their timestamps and executes them in parallel using multi-core processing." },
      { num: 4, title: "VDF Proof Creation", desc: "The leader packages the transactions along with the VDF proof of time sequence." },
      { num: 5, title: "Streamed Propagation", desc: "Instead of waiting for the full block, the leader streams the data and proofs to validators in real time." },
      { num: 6, title: "Rapid Validation", desc: "Validators verify the VDF sequence in parallel on multiple GPU/CPU cores, which is much faster than producing the proof." },
      { num: 7, title: "Consensus Settlement", desc: "Combined with Proof of Stake (Tower BFT), validators vote on the finalized blocks, cementing them in the ledger." }
    ],
    security: {
      fiftyOnePercent: "Since PoH is paired with PoS (Tower BFT), the security is anchored on staked tokens. Overriding consensus requires controlling 2/3 of the staked weight.",
      sybil: "Protected by the accompanying Proof of Stake layer. Fake nodes cannot influence the timing sequence.",
      doubleSpending: "VDF timestamps create a strict logical history, preventing out-of-order history rewrites.",
      byzantine: "Relies on Tower BFT (PBFT-like PoS) to resolve forks and tolerate Byzantine nodes up to 1/3 of stake."
    },
    realWorldChains: [
      { name: "Solana", consensus: "Proof of History + Proof of Stake", reason: "Uses the VDF clock to stream ledger data continuously, achieving top speed for consumer dApps." }
    ]
  },
  {
    id: "avalanche",
    name: "Avalanche Consensus",
    inventedBy: "Emin Gün Sirer & Team (Team Rocket)",
    year: 2018,
    coreMechanism: "Repeated Sub-sampled Voting",
    category: "Metastable Consensus",
    description: "Nodes reach agreement through a gossip-like protocol. Instead of voting in large, slow committees, nodes repeatedly sample a small, random subset of peer nodes. Over multiple rounds, the network reaches a consensus state like a snowball rolling down a hill.",
    example: "Avalanche (AVAX)",
    trilemma: { scalability: 95, security: 90, decentralization: 75 },
    performance: {
      blockTime: "Under 1 sec",
      tps: "4,500+",
      energy: "Low",
      cost: "Low ($0.01 - $0.50)",
      finality: "Sub-second (<1.5 sec)"
    },
    advantages: [
      "Sub-second transactional finality, creating an instant user experience.",
      "Scales to millions of validators without a drop in performance or high latency.",
      "High security margins (tolerates up to a 60% dishonest network under certain states)."
    ],
    disadvantages: [
      "No absolute mathematical proof of finality; instead, it offers probabilistic finality.",
      "High reliance on network connectivity; packet drops can delay the snowball threshold.",
      "Vulnerability to long-range history manipulation if validator sets are not actively tracking state."
    ],
    steps: [
      { num: 1, title: "Tx Ingestion", desc: "Users submit transactions, which are received by validator nodes." },
      { num: 2, title: "Initial Preference", desc: "Nodes assign an initial color preference (e.g., Accept or Reject) to the transaction." },
      { num: 3, title: "Random Sub-sampling", desc: "Each node randomly queries a small, constant number of peers (e.g., 20 nodes) for their preference." },
      { num: 4, title: "Preference Update", desc: "If a supermajority of the sampled nodes (e.g., 14/20) prefers a color, the querying node changes its own preference to match." },
      { num: 5, title: "Snowball Loop", desc: "This random sub-sampling is repeated continuously for several rounds (e.g., 20 iterations)." },
      { num: 6, title: "Metastable Threshold", desc: "As nodes align, the network rapidly tips toward a single decision (like an avalanche starting)." },
      { num: 7, title: "Instant Finalization", desc: "Once the confidence threshold is met, the transaction is finalized instantly without a global ledger block cycle." }
    ],
    security: {
      fiftyOnePercent: "Avalanche can handle up to 60% Byzantine nodes, making it more secure than traditional BFT consensus mechanisms (which break at 33%).",
      sybil: "Requires staking AVAX to participate in sub-sampling, preventing free Sybil node creation.",
      doubleSpending: "Conflicting transactions are quickly filtered out during the sub-sampling rounds, tipping the network to one option.",
      byzantine: "Maintains consensus and safety under Byzantine failures up to 50%-60% depending on parameter settings."
    },
    realWorldChains: [
      { name: "Avalanche", consensus: "Snowball + Proof of Stake", reason: "Built to support customizable subnet architectures and rapid sub-second asset transfers." }
    ]
  },
  {
    id: "pob",
    name: "Proof of Burn",
    inventedBy: "Iain Stewart",
    year: 2012,
    coreMechanism: "Token Destruction",
    category: "Virtual Resource Mining",
    description: "Instead of burning electricity or staking capital, miners send tokens to an unspendable address (burning them) to purchase 'virtual rigs.' The more tokens a miner burns, the higher their chances of selection to mine the next block.",
    example: "Slimcoin (SLM)",
    trilemma: { scalability: 50, security: 80, decentralization: 70 },
    performance: {
      blockTime: "1 - 5 min",
      tps: "10 - 100",
      energy: "Very Low",
      cost: "Medium",
      finality: "Minutes"
    },
    advantages: [
      "Zero physical hardware waste and near-zero electricity consumption.",
      "Reduces circulating token supply, exerting upward deflationary pressure.",
      "Commitment-based: miners show long-term confidence by sacrificing capital."
    ],
    disadvantages: [
      "Unpopular: users are generally hesitant to permanently destroy their funds.",
      "Risk of consolidation: early adopters who burned tokens when they were cheap dominate mining rights.",
      "Relies on a boot-strapped initial token distribution from another mechanism (like PoW)."
    ],
    steps: [
      { num: 1, title: "Token Selection", desc: "Miners allocate native coins or parent chain tokens to burn." },
      { num: 2, title: "Burn Transaction", desc: "Tokens are sent to a verifiable, unspendable 'eater' address (e.g., an address with no known private key)." },
      { num: 3, title: "Virtual Rig Allocation", desc: "The blockchain records the burn and assigns the miner 'virtual mining power' based on the burned value." },
      { num: 4, title: "Block Competition", desc: "The protocol runs a lottery where the chance of winning the next block proposal is proportional to virtual mining power." },
      { num: 5, title: "Decay Over Time", desc: "Virtual mining power slowly decays over time, forcing miners to burn more tokens to remain competitive." },
      { num: 6, title: "Block Creation", desc: "The winner proposes the block, gathers transactions, and appends it to the ledger." },
      { num: 7, title: "Block Reward", desc: "The miner is rewarded with fresh tokens and transaction fees, making the burn profitable if they win." }
    ],
    security: {
      fiftyOnePercent: "Attacker must burn more tokens than the active mining pool. Early holders have an advantage, but they risk their burned value if they damage the token price.",
      sybil: "Protected because voting power requires a financial sacrifice. Fake nodes with no burned tokens cannot mine.",
      doubleSpending: "Follows longest chain rules, protected by the cumulative economic value burned to secure the chain.",
      byzantine: "Tolerates up to 50% of the active virtual hashrate behaving maliciously."
    },
    realWorldChains: [
      { name: "Slimcoin", consensus: "Proof of Burn + PoW/PoS", reason: "Explores virtual mining to support decentralized block creation without hardware races." },
      { name: "Counterparty", consensus: "PoB (Bootstrapped via BTC)", reason: "Burned Bitcoin to generate XCP tokens, bootstrapping its smart asset network." }
    ]
  },
  {
    id: "poc",
    name: "Proof of Capacity",
    inventedBy: "Stefan Dziembowski & Team",
    year: 2014,
    coreMechanism: "Hard Drive Space Allocation",
    category: "Space-based Consensus",
    description: "Also known as Proof of Space. Miners pre-generate and save lists of cryptographic solutions called 'plots' onto hard drives. When a block is mined, miners read their drives to find the closest solution, using hard drive space instead of processing power.",
    example: "Signum (SIGNA) / Chia (XCH)",
    trilemma: { scalability: 55, security: 85, decentralization: 75 },
    performance: {
      blockTime: "4 min (Signum) / 18s (Chia)",
      tps: "30 - 200",
      energy: "Low (~99% less than PoW)",
      cost: "Low",
      finality: "Minutes"
    },
    advantages: [
      "Extremely energy-efficient compared to GPU/ASIC mining.",
      "Hard drives are cheap, widely available, and reusable for storage if mining stops.",
      "Highly decentralized; anyone with spare hard drive space can participate."
    ],
    disadvantages: [
      "Requires massive hard drive storage space, which can drive up global drive prices.",
      "Vulnerable to 'plotting farms' in large data centers.",
      "Requires a slow pre-computation step ('plotting') before mining can begin."
    ],
    steps: [
      { num: 1, title: "Hard Drive Plotting", desc: "Miners pre-compute hashes using Shabal cryptographic algorithms and write them to storage as 'plots'." },
      { num: 2, title: "Tx Broadcast", desc: "Users submit transactions, which propagate to mining pools." },
      { num: 3, title: "Block Header Broadcast", desc: "The network broadcasts a block challenge hash to all miners." },
      { num: 4, title: "Plot Scanning", desc: "Miners scan their drives for the challenge, calculating a 'deadline' value (seconds to wait)." },
      { num: 5, title: "Deadline Countdown", desc: "The miner with the shortest deadline (closest matching solution) waits for the timer to expire." },
      { num: 6, title: "Block Creation", desc: "Once the deadline expires without anyone else proposing, the miner publishes the block." },
      { num: 7, title: "Verification", desc: "Other nodes check the block header and verify the plot proof. The block is added, and rewards are distributed." }
    ],
    security: {
      fiftyOnePercent: "Requires owning 51% of global plotted storage capacity. Very hard to execute because acquiring millions of hard drives is highly visible.",
      sybil: "Sybil attacks are mitigated because voting weight is proportional to physical byte storage.",
      doubleSpending: "Secured using proof of time (like Chia's proof of time servers) or longest chain rules.",
      byzantine: "Supports standard consensus safety limits (tolerates up to 50% malicious capacity)."
    },
    realWorldChains: [
      { name: "Chia Network", consensus: "Proof of Space and Time", reason: "Uses hard drives combined with Time Lords (VDFs) to create an eco-friendly green Bitcoin alternative." },
      { name: "Signum", consensus: "Proof of Capacity", reason: "First blockchain to use hard drive plots to run smart contracts with minimal energy." },
      { name: "Filecoin", consensus: "Proof of Spacetime (PoSt)", reason: "Uses storage proofs to confirm validators are storing actual file data over time." }
    ]
  },
  {
    id: "poet",
    name: "Proof of Elapsed Time",
    inventedBy: "Intel Corporation",
    year: 2016,
    coreMechanism: "Trusted Execution Environment (TEE)",
    category: "Hardware-based Consensus",
    description: "Designed for permissioned enterprise networks. It uses a trusted hardware chip (like Intel SGX) to run a secure lottery. The chip assigns a random wait time to each node. The node whose wait timer expires first wins the right to propose the next block.",
    example: "Hyperledger Sawtooth",
    trilemma: { scalability: 85, security: 80, decentralization: 30 },
    performance: {
      blockTime: "Adjustable (e.g., 10s)",
      tps: "1,000+",
      energy: "Minimal (Idling nodes)",
      cost: "Zero / Business Network",
      finality: "10 - 30 sec"
    },
    advantages: [
      "Outstanding energy efficiency: nodes sleep/idle while waiting for their timers.",
      "Scales to thousands of enterprise nodes easily.",
      "Fair and deterministic distribution of block proposals."
    ],
    disadvantages: [
      "Vendor lock-in: completely dependent on Intel CPU hardware (SGX enclave).",
      "Vulnerable to CPU-level hardware exploits (like Meltdown, Spectre, or SGX leaks).",
      "Requires trusting a centralized hardware manufacturer."
    ],
    steps: [
      { num: 1, title: "Enclave Boot", desc: "Each validator node boots up inside an Intel SGX Trusted Execution Environment (TEE)." },
      { num: 2, title: "Time Request", desc: "Validators request a random wait duration from the secure enclave code." },
      { num: 3, title: "Enclave Lottery", desc: "The enclave generates a random wait time and creates a signed cryptographic proof of the time value." },
      { num: 4, title: "Sleeping State", desc: "The validator node enters a sleep/idle state, waiting for the assigned duration to elapse." },
      { num: 5, title: "Timer Expiry", desc: "The first node whose timer reaches zero wakes up and requests a signed execution proof from the enclave." },
      { num: 6, title: "Block Creation", desc: "The winning node creates the new block containing transactions and broadcasts it with the enclave proofs." },
      { num: 7, title: "Proof Validation", desc: "Other nodes read the signature on the enclave proof to confirm the node slept for the correct duration. The block is committed." }
    ],
    security: {
      fiftyOnePercent: "Attacking requires hacking the CPU hardware enclaves on 51% of the nodes, which is incredibly difficult but possible if an enclave exploit is discovered.",
      sybil: "Prevented because validators must register their TEE certificates, limiting one active enclave key per physical server.",
      doubleSpending: "Enclave attestation verification guarantees that slot winners are valid, preventing double proposals.",
      byzantine: "Can handle up to 1/2 of the nodes acting maliciously if enclaves remain secure."
    },
    realWorldChains: [
      { name: "Hyperledger Sawtooth", consensus: "Proof of Elapsed Time", reason: "Built for modular corporate ledgers to achieve high throughput without high energy usage." }
    ]
  },
  {
    id: "fba",
    name: "Federated Byzantine Agreement",
    inventedBy: "David Mazières",
    year: 2015,
    coreMechanism: "Quorum Slices",
    category: "Federated Consensus",
    description: "Instead of relying on a global list of validators, each node chooses a list of trusted peer nodes (a 'quorum slice'). Individual slices overlap to form a global consensus. This allows fast, decentralized agreement without a central registry.",
    example: "Stellar (XLM)",
    trilemma: { scalability: 95, security: 85, decentralization: 65 },
    performance: {
      blockTime: "3 - 5 sec",
      tps: "1,000 - 3,000+",
      energy: "Extremely Low",
      cost: "Micro-pennies ($0.00001)",
      finality: "3 - 5 sec (Immediate finality)"
    },
    advantages: [
      "Exceptional speed, low transaction latency, and low fees.",
      "High decentralization: anyone can join and choose their own trusted circles.",
      "No mining or staking required to secure the network."
    ],
    disadvantages: [
      "Risk of network forks if quorum slices do not overlap (network partitioning).",
      "Requires careful node configuration: choosing bad peer nodes can freeze transactions.",
      "Vulnerable to centralized cartels if most nodes trust the same large anchors (e.g., SDF or Ripple)."
    ],
    steps: [
      { num: 1, title: "Tx Submission", desc: "Users submit transactions, which are received by Stellar core validator nodes." },
      { num: 2, title: "Nomination Phase", desc: "Nodes propose candidate transaction sets for the next ledger round." },
      { num: 3, title: "Quorum Slice Gossip", desc: "Nodes share their proposals with their custom-defined 'quorum slices' (trusted peers)." },
      { num: 4, title: "Ballot Phase", desc: "Nodes vote on which transaction set to apply using a multi-phase commit ballot protocol." },
      { num: 5, title: "Overlap Propagation", desc: "As quorum slices overlap, the votes cascade across the entire global network (quorum intersection)." },
      { num: 6, title: "Consensus Agreement", desc: "Once overlapping quorums reach agreement, nodes finalize the transition." },
      { num: 7, title: "Ledger Update", desc: "The ledger is closed, transaction balances are updated, and the next round begins immediately." }
    ],
    security: {
      fiftyOnePercent: "Security depends on quorum intersection. If overlapping nodes representing 1/3 or more of a quorum slice are malicious or offline, consensus can stall.",
      sybil: "Mitigated because nodes only listen to peers they manually configure in their trust settings. Fake nodes are ignored.",
      doubleSpending: "Blocked by absolute agreement; ledger transactions cannot be rolled back or reorganized once closed.",
      byzantine: "Tolerates up to (N-1)/3 Byzantine nodes within each specific quorum configuration."
    },
    realWorldChains: [
      { name: "Stellar", consensus: "Stellar Consensus Protocol (SCP)", reason: "Optimized for fast global cross-border remittances and micro-payments." },
      { name: "Ripple (XRP Ledger)", consensus: "Ripple Protocol Consensus (RPCA)", reason: "Uses Unique Node Lists (UNL) to process bank settlements in seconds." }
    ]
  },
  {
    id: "poi",
    name: "Proof of Importance",
    inventedBy: "NEM Foundation",
    year: 2015,
    coreMechanism: "Account Activity Scoring",
    category: "Activity-weighted Consensus",
    description: "An upgrade to Proof of Stake. Instead of evaluating nodes solely by token balances, Proof of Importance assigns an 'Importance Score' based on: token holdings, transaction volume, and who they transact with. Active users are rewarded over hoarders.",
    example: "NEM (XEM)",
    trilemma: { scalability: 65, security: 85, decentralization: 75 },
    performance: {
      blockTime: "1 min",
      tps: "100 - 500",
      energy: "Very Low",
      cost: "Low",
      finality: "Minutes"
    },
    advantages: [
      "Discourages hoarding: validators must actively use the currency to maintain scores.",
      "Low energy footprint; runs efficiently on basic VPS servers.",
      "Fair reward distribution that supports real economic activity."
    ],
    disadvantages: [
      "Complex algorithm: calculation of graph theory metrics on-chain requires CPU overhead.",
      "Vulnerable to circular wash trading, where users send tokens back and forth to artificially boost scores.",
      "Staking requirements still exist: users must vest a minimum token amount to be scored."
    ],
    steps: [
      { num: 1, title: "Token Vesting", desc: "Tokens held in an account are slowly 'vested' (locked) over time to prove long-term holding." },
      { num: 2, title: "Transaction Tracking", desc: "The protocol tracks all transaction flows, analyzing active transfers over the last 30 days." },
      { num: 3, title: "Importance Calculation", desc: "The system runs a PageRank-style algorithm to score accounts based on vested balances and transacting networks." },
      { num: 4, title: "Harvesting Allocation", desc: "Miners ('harvesters') are assigned block-creation rights based on their Importance Scores." },
      { num: 5, title: "Block Creation", desc: "The selected harvester bundles valid transactions and signs the block." },
      { num: 6, title: "Network Validation", desc: "Peers verify the signatures and transactional rules, updating the ledger state." },
      { num: 7, title: "Fee Harvesting", desc: "The harvester receives transaction fees. Unlike PoW, new coins are not minted; rewards come from network usage fees." }
    ],
    security: {
      fiftyOnePercent: "Attacker must purchase and actively move a massive share of the token supply, which is highly expensive and easily detectable by node metrics.",
      sybil: "Sybil nodes are blocked because score calculations require real vested token balances.",
      doubleSpending: "Prevented by fork-resolution rules based on cumulative block Importance scores.",
      byzantine: "Can tolerate up to 1/3 of the active validator importance score behaving maliciously."
    },
    realWorldChains: [
      { name: "NEM", consensus: "Proof of Importance", reason: "Built to incentivize real commerce and transactional velocity over simple token hoarding." }
    ]
  },
  {
    id: "dag",
    name: "DAG (Tangle)",
    inventedBy: "Serguei Popov (IOTA)",
    year: 2015,
    coreMechanism: "Directed Acyclic Graph Validation",
    category: "Non-blockchain Distributed Ledger",
    description: "A Directed Acyclic Graph (DAG) removes the concept of linear blocks. Instead, every new transaction acts as a 'block.' To submit a transaction, a user must verify two previous transactions, linking them in a web of transactions (a 'Tangle').",
    example: "IOTA (MIOTA)",
    trilemma: { scalability: 99, security: 72, decentralization: 80 },
    performance: {
      blockTime: "Continuous / Blockless",
      tps: "5,000 - 10,000+",
      energy: "Microscopic (Mobile device levels)",
      cost: "Zero (Feeless)",
      finality: "Seconds (1 - 10 sec)"
    },
    advantages: [
      "Completely feeless: no miners means users do not pay anyone to process transactions.",
      "Scales infinitely: as transaction volume increases, validation speed increases.",
      "Extremely low energy use; transactions can be created by simple IoT devices."
    ],
    disadvantages: [
      "Vulnerable to 34% attacks when network volume is low, requiring helper nodes (like IOTA's Coordinator).",
      "Complex network pathfinding: resolving conflicting double-spent tips is difficult.",
      "Requires continuous transaction volume to maintain stability and security."
    ],
    steps: [
      { num: 1, title: "Tx Creation", desc: "A user creates a transaction payload locally on their device." },
      { num: 2, title: "Tip Selection", desc: "The user's device runs a selection algorithm (e.g., Random Walk) to pick two unconfirmed transactions ('tips')." },
      { num: 3, title: "Double-Spend Check", desc: "The user's device verifies that the two selected transactions do not conflict and are valid." },
      { num: 4, title: "Small PoW Solve", desc: "The device solves a microscopic cryptographic puzzle to prevent spam, requiring minimal energy." },
      { num: 5, title: "Attachment", desc: "The device attaches the new transaction to the DAG, referencing the two older transactions." },
      { num: 6, title: "Gossip Broadcast", desc: "The transaction is broadcast to neighbor nodes and added to the global Tangle graph." },
      { num: 7, title: "Cumulative Weight Confirmation", desc: "As subsequent transactions attach to the user's transaction, its cumulative weight grows until it is confirmed." }
    ],
    security: {
      fiftyOnePercent: "In a DAG, the limit is a 34% attack. If an attacker controls 34% of active transaction issuance, they can orphan valid transactions. Early stages of IOTA used a central Coordinator to prevent this.",
      sybil: "Spam is controlled by the small PoW required to attach each transaction, making large-scale Sybil attacks computationally expensive.",
      doubleSpending: "Resolved by conflict-resolution algorithms that evaluate the cumulative weight of transaction paths.",
      byzantine: "Relies on the consensus of the graph structure. Vulnerable if dishonest nodes command over 34% of network propagation capacity."
    },
    realWorldChains: [
      { name: "IOTA", consensus: "Tangle DAG", reason: "Built to support fee-free, micro-transactions between Internet of Things (IoT) devices." },
      { name: "Fantom", consensus: "Lachesis DAG (aBFT)", reason: "Uses a DAG-structured event graph to process high-speed smart contracts in a DeFi ecosystem." },
      { name: "Hedera", consensus: "Hashgraph (DAG-based)", reason: "Uses virtual voting on a directed graph to achieve enterprise-grade speeds and absolute finality." }
    ]
  }
];

export const cryptoMapping = [
  { crypto: "BTC", blockchain: "Bitcoin", consensus: "PoW (Proof of Work)" },
  { crypto: "ETH", blockchain: "Ethereum", consensus: "PoS (Proof of Stake)" },
  { crypto: "ADA", blockchain: "Cardano", consensus: "PoS (Ouroboros)" },
  { crypto: "SOL", blockchain: "Solana", consensus: "PoH + PoS (Tower BFT)" },
  { crypto: "DOT", blockchain: "Polkadot", consensus: "NPoS (Nominated PoS)" },
  { crypto: "AVAX", blockchain: "Avalanche", consensus: "Avalanche Snowball" },
  { crypto: "XLM", blockchain: "Stellar", consensus: "FBA (Stellar Consensus Protocol)" },
  { crypto: "IOTA", blockchain: "IOTA", consensus: "DAG Tangle" },
  { crypto: "TRX", blockchain: "TRON", consensus: "DPoS (Delegated PoS)" },
  { crypto: "XRP", blockchain: "Ripple", consensus: "RPCA (Ripple Consensus)" },
  { crypto: "HBAR", blockchain: "Hedera", consensus: "Hashgraph" }
];

export const smartContractLanguages = [
  {
    blockchain: "Ethereum",
    language: "Solidity",
    desc: "A statically-typed, contract-oriented language designed specifically for the EVM. It compiles bytecode to run on decentralized nodes. Solidity fits Ethereum's global state-machine model, providing robust tools to manage state transitions across thousands of validating nodes.",
    benefits: "Large developer ecosystem, standard ERC templates, built-in state variables."
  },
  {
    blockchain: "Solana",
    language: "Rust",
    desc: "A low-level system language providing memory safety without a garbage collector. This enables parallel transaction processing (Sealevel runtime). Rust is key to Solana's Proof of History, which relies on high-speed hardware optimization and safety under heavy multithreaded loads.",
    benefits: "High performance, excellent concurrency, compiles to BPF bytecode."
  },
  {
    blockchain: "Cardano",
    language: "Plutus",
    desc: "Based on Haskell, a purely functional programming language. Plutus operates on the eUTXO model, which aligns with Cardano's Ouroboros PoS design. Functional code allows formal verification, proving smart contract math correctness before deployment.",
    benefits: "Formal verification, deterministic execution fees, UTXO security."
  },
  {
    blockchain: "Avalanche",
    language: "Solidity",
    desc: "Avalanche supports the EVM via its C-Chain, allowing developers to deploy Solidity contracts. This bridges Ethereum tools (Hardhat, Metamask) to the Avalanche Snowball consensus, providing the best of Ethereum's ecosystem with sub-second finality.",
    benefits: "Instant EVM compatibility, sub-second finality, easy code migration."
  },
  {
    blockchain: "Polkadot",
    language: "Rust / Ink!",
    desc: "Ink! is a Rust-based eDSL to write Wasm smart contracts for Substrate chains. Substrate utilizes Rust to compile blockchain runtimes. This matches the Nominated Proof of Stake model by allowing hot-swappable consensus logic without hard forks.",
    benefits: "Wasm compilation, Substrate integration, typed environment."
  },
  {
    blockchain: "Hyperledger Fabric",
    language: "Go / Java / Node.js",
    desc: "Enterprise chains allow general-purpose languages like Go for writing smart contracts ('chaincode'). This aligns with PBFT/Raft models since validators are run by enterprises with existing DevOps expertise, avoiding the need for specialized crypto-VM bytecode.",
    benefits: "No specialized language learning curve, enterprise integration, high performance."
  },
  {
    blockchain: "Algorand",
    language: "TEAL / Python",
    desc: "Transaction Execution Approval Language (TEAL) compiles down to assembly-like code for the Algorand Virtual Machine (AVM). It is designed to run in microsecond loops, matching Algorand's Pure Proof of Stake (PPoS) block validation speed.",
    benefits: "Microsecond execution, low fees, mathematically secure state checks."
  },
  {
    blockchain: "Aptos / Sui",
    language: "Move",
    desc: "A language featuring resources (assets) as first-class citizens that cannot be copied or implicitly discarded. Move prevents re-entrancy bugs and state manipulation, making it highly secure for high-speed parallel consensus architectures.",
    benefits: "Asset resource safety, parallel execution safety, compiler verification."
  }
];

export const layersData = [
  {
    layer: "Layer 1 (L1)",
    description: "The base blockchain responsible for native consensus, block validation, security, and data availability. It is the root of trust.",
    chains: [
      { name: "Bitcoin", consensus: "Proof of Work", purpose: "Decentralized money storage and settlement." },
      { name: "Ethereum", consensus: "Proof of Stake", purpose: "DeFi, NFT, smart contract global VM." },
      { name: "Solana", consensus: "Proof of History + PoS", purpose: "Ultra-fast execution, cheap consumer apps." },
      { name: "Cardano", consensus: "Proof of Stake", purpose: "Formal security verification and eUTXO." },
      { name: "Avalanche", consensus: "Avalanche Snowball", purpose: "Customizable subnets and instant execution." }
    ]
  },
  {
    layer: "Layer 2 (L2)",
    description: "Secondary frameworks built on top of Layer 1 to scale transactions. L2s process transactions off-chain and batch/settle proofs back to L1, inheriting L1's underlying security.",
    chains: [
      { name: "Arbitrum One", l1: "Ethereum", mechanism: "Optimistic Rollups", details: "Batches transactions off-chain, assumes validity, and submits them to L1 with a 7-day challenge window." },
      { name: "Optimism (OP Mainnet)", l1: "Ethereum", mechanism: "Optimistic Rollups", details: "Uses the OP Stack to run fast off-chain transactions, settling proofs periodically to Ethereum." },
      { name: "zkSync Era", l1: "Ethereum", mechanism: "ZK-Rollups (Zero-Knowledge)", details: "Uses cryptographic zero-knowledge proofs (SNARKs) to prove transaction validity instantly to L1." },
      { name: "Polygon PoS", l1: "Ethereum", mechanism: "Sidechain (Hybrid)", details: "A semi-independent sidechain secured by its own PoS validators that periodically checkpoints state to Ethereum." },
      { name: "Lightning Network", l1: "Bitcoin", mechanism: "State Channels", details: "Creates bilateral payment channels off-chain. Only the opening and closing channel states are recorded on Bitcoin." }
    ]
  }
];

export const comparisonTableData = [
  { algo: "PoW", name: "Proof of Work", mechanism: "Mining Puzzle", tps: "7 - 15", blockTime: "10 min", energy: "Very High", security: "Excellent", decentralization: "Excellent", networks: "Bitcoin, Litecoin" },
  { algo: "PoS", name: "Proof of Stake", mechanism: "Staking Collateral", tps: "15 - 1,000+", blockTime: "12 sec", energy: "Extremely Low", security: "Excellent", decentralization: "High", networks: "Ethereum, Cardano, Polkadot" },
  { algo: "DPoS", name: "Delegated PoS", mechanism: "Elected Representatives", tps: "2,000 - 5,000+", blockTime: "0.5 - 3 sec", energy: "Very Low", security: "High", decentralization: "Medium", networks: "EOS, TRON, Steem" },
  { algo: "PoA", name: "Proof of Authority", mechanism: "Vetted Identities", tps: "1,000 - 10,000+", blockTime: "2 - 5 sec", energy: "Minimal", security: "Medium", decentralization: "Low", networks: "VeChain, BNB Chain (PoSA)" },
  { algo: "PBFT", name: "Practical Byzantine Fault Tolerance", mechanism: "Multi-round voting", tps: "10,000+", blockTime: "Instant (<1s)", energy: "Extremely Low", security: "High", decentralization: "Low", networks: "Hyperledger Fabric, Zilliqa" },
  { algo: "PoH + PoS", name: "Proof of History", mechanism: "Logical VDF Clock + PoS", tps: "50,000+", blockTime: "400 ms", energy: "Low", security: "High", decentralization: "Medium", networks: "Solana" },
  { algo: "Avalanche", name: "Avalanche Snowball", mechanism: "Random Sub-sampling", tps: "4,500+", blockTime: "<1 sec", energy: "Low", security: "Very High", decentralization: "High", networks: "Avalanche" },
  { algo: "FBA", name: "Federated Byzantine Agreement", mechanism: "Overlapping Quorum Slices", tps: "1,000 - 3,000+", blockTime: "3 - 5 sec", energy: "Extremely Low", security: "High", decentralization: "Medium", networks: "Stellar, Ripple" },
  { algo: "DAG", name: "DAG (Tangle)", mechanism: "Validating 2 past transactions", tps: "5,000+", blockTime: "Continuous", energy: "Microscopic", security: "Medium", decentralization: "High", networks: "IOTA, Fantom" },
  { algo: "PoB", name: "Proof of Burn", mechanism: "Destroying coins for virtual rigs", tps: "10 - 100", blockTime: "1 - 5 min", energy: "Very Low", security: "High", decentralization: "High", networks: "Slimcoin, Counterparty" },
  { algo: "PoC", name: "Proof of Capacity", mechanism: "Hard drive plot matching", tps: "30 - 200", blockTime: "18s - 4 min", energy: "Low", security: "High", decentralization: "High", networks: "Chia, Signum, Filecoin" },
  { algo: "PoET", name: "Proof of Elapsed Time", mechanism: "TEE Hardware Sleep Lotteries", tps: "1,000+", blockTime: "Adjustable", energy: "Minimal", security: "High", decentralization: "Low", networks: "Hyperledger Sawtooth" },
  { algo: "PoI", name: "Proof of Importance", mechanism: "Balance + Tx Velocity PageRank", tps: "100 - 500", blockTime: "1 min", energy: "Very Low", security: "High", decentralization: "High", networks: "NEM" }
];

export const compatibilityMatrix = {
  blockchains: ["Bitcoin", "Ethereum", "Cardano", "Solana", "Avalanche", "Hyperledger", "Stellar", "IOTA"],
  matrix: {
    "Bitcoin": {
      "Bitcoin": { status: "🟢", desc: "Same consensus family (Proof of Work)." },
      "Ethereum": { status: "🔴", desc: "Different consensus. Bitcoin uses PoW mining; Ethereum uses PoS staking." },
      "Cardano": { status: "🔴", desc: "Different consensus. Bitcoin uses PoW mining; Cardano uses PoS." },
      "Solana": { status: "🔴", desc: "Different consensus mechanisms (PoW vs PoH + PoS)." },
      "Avalanche": { status: "🔴", desc: "Different consensus families (PoW vs Avalanche Snowball)." },
      "Hyperledger": { status: "🔴", desc: "Different. Bitcoin is permissionless PoW; Hyperledger is permissioned PBFT/Raft." },
      "Stellar": { status: "🔴", desc: "Different. Bitcoin uses PoW; Stellar uses FBA quorum slices." },
      "IOTA": { status: "🔴", desc: "Different. Bitcoin uses linear PoW blockchain; IOTA uses blockless DAG Tangle." }
    },
    "Ethereum": {
      "Bitcoin": { status: "🔴", desc: "Different consensus (PoS vs PoW)." },
      "Ethereum": { status: "🟢", desc: "Same consensus mechanism (Proof of Stake)." },
      "Cardano": { status: "🟢", desc: "Compatible. Both use Proof of Stake models (Gasper vs Ouroboros)." },
      "Solana": { status: "🟡", desc: "Partially Compatible. Solana uses PoS combined with a PoH logical clock." },
      "Avalanche": { status: "🔴", desc: "Different consensus engines (Staked Gasper vs Snowball)." },
      "Hyperledger": { status: "🔴", desc: "Different networks (Public PoS vs Enterprise Private PBFT)." },
      "Stellar": { status: "🔴", desc: "Different mechanisms (PoS vs FBA)." },
      "IOTA": { status: "🔴", desc: "Different architectures (PoS blockchain vs feeless DAG Tangle)." }
    },
    "Cardano": {
      "Bitcoin": { status: "🔴", desc: "Different consensus (PoS vs PoW)." },
      "Ethereum": { status: "🟢", desc: "Compatible. Both use Proof of Stake models." },
      "Cardano": { status: "🟢", desc: "Same consensus mechanism (Proof of Stake)." },
      "Solana": { status: "🟡", desc: "Partially Compatible. Both utilize PoS; Solana adds a PoH ordering system." },
      "Avalanche": { status: "🔴", desc: "Different consensus engines (Ouroboros PoS vs Snowball)." },
      "Hyperledger": { status: "🔴", desc: "Different environments (Public PoS vs Enterprise PBFT)." },
      "Stellar": { status: "🔴", desc: "Different mechanisms (PoS vs FBA)." },
      "IOTA": { status: "🔴", desc: "Different structures (PoS blockchain vs Tangle DAG)." }
    },
    "Solana": {
      "Bitcoin": { status: "🔴", desc: "Different mechanisms (PoH + PoS vs PoW)." },
      "Ethereum": { status: "🟡", desc: "Partially Compatible. Solana uses PoS as its security layer, similar to Ethereum." },
      "Cardano": { status: "🟡", desc: "Partially Compatible. Both use PoS for validation weight, but Solana uses PoH for timing." },
      "Solana": { status: "🟢", desc: "Same consensus mechanism (PoH + PoS)." },
      "Avalanche": { status: "🔴", desc: "Different consensus engines (Tower BFT vs Snowball)." },
      "Hyperledger": { status: "🔴", desc: "Different environments (Public vs Private Enterprise)." },
      "Stellar": { status: "🔴", desc: "Different (PoH + PoS vs FBA)." },
      "IOTA": { status: "🔴", desc: "Different (PoH blockchain vs feeless blockless DAG)." }
    },
    "Avalanche": {
      "Bitcoin": { status: "🔴", desc: "Different consensus (Snowball vs PoW)." },
      "Ethereum": { status: "🔴", desc: "Different consensus (Snowball vs PoS Gasper)." },
      "Cardano": { status: "🔴", desc: "Different consensus (Snowball vs Ouroboros PoS)." },
      "Solana": { status: "🔴", desc: "Different consensus (Snowball vs PoH + PoS)." },
      "Avalanche": { status: "🟢", desc: "Same consensus mechanism (Avalanche Snowball)." },
      "Hyperledger": { status: "🔴", desc: "Different. Avalanche is a metastable public engine; Hyperledger is a permissioned BFT network." },
      "Stellar": { status: "🔴", desc: "Different consensus families (Metastable Snowball vs Federated BFT)." },
      "IOTA": { status: "🔴", desc: "Different structures (Snowball DAG-like subnets vs Tangle DAG)." }
    },
    "Hyperledger": {
      "Bitcoin": { status: "🔴", desc: "Different (Enterprise BFT vs Public PoW)." },
      "Ethereum": { status: "🔴", desc: "Different (Enterprise BFT vs Public PoS)." },
      "Cardano": { status: "🔴", desc: "Different (Enterprise BFT vs Public PoS)." },
      "Solana": { status: "🔴", desc: "Different (Enterprise BFT vs Public PoH + PoS)." },
      "Avalanche": { status: "🔴", desc: "Different (Enterprise BFT vs Public Snowball)." },
      "Hyperledger": { status: "🟢", desc: "Same consensus category (Permissioned BFT/Raft)." },
      "Stellar": { status: "🔴", desc: "Different. Hyperledger is private BFT; Stellar is public Federated BFT." },
      "IOTA": { status: "🔴", desc: "Different (Private BFT vs Public feeless DAG)." }
    },
    "Stellar": {
      "Bitcoin": { status: "🔴", desc: "Different (FBA vs PoW)." },
      "Ethereum": { status: "🔴", desc: "Different (FBA vs PoS)." },
      "Cardano": { status: "🔴", desc: "Different (FBA vs PoS)." },
      "Solana": { status: "🔴", desc: "Different (FBA vs PoH + PoS)." },
      "Avalanche": { status: "🔴", desc: "Different (FBA vs Snowball)." },
      "Hyperledger": { status: "🔴", desc: "Different. Stellar is public FBA; Hyperledger is private BFT." },
      "Stellar": { status: "🟢", desc: "Same consensus mechanism (Federated Byzantine Agreement)." },
      "IOTA": { status: "🔴", desc: "Different (FBA vs feeless blockless DAG)." }
    },
    "IOTA": {
      "Bitcoin": { status: "🔴", desc: "Different. Bitcoin is linear block PoW; IOTA is blockless DAG Tangle." },
      "Ethereum": { status: "🔴", desc: "Different (feeless DAG vs fee-based PoS)." },
      "Cardano": { status: "🔴", desc: "Different (feeless DAG vs fee-based PoS)." },
      "Solana": { status: "🔴", desc: "Different (feeless DAG vs high-speed PoH + PoS)." },
      "Avalanche": { status: "🔴", desc: "Different (Tangle DAG vs sub-sampled Snowball)." },
      "Hyperledger": { status: "🔴", desc: "Different (Public feeless DAG vs private BFT)." },
      "Stellar": { status: "🔴", desc: "Different (feeless DAG vs public FBA)." },
      "IOTA": { status: "🟢", desc: "Same consensus architecture (Directed Acyclic Graph Tangle)." }
    }
  }
};
