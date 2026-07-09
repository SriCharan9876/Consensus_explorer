# Consensus Explorer — Blockchain Consensus Algorithm Engine

Consensus Explorer is a premium, interactive pedagogical web application designed to help developers, students, and blockchain enthusiasts explore, simulate, and compare distributed ledger consensus protocols. 

The platform provides interactive 3D visualizers, simulation environments, head-to-head comparison matrices, and multi-dimensional analysis pipelines for **13 distinct consensus algorithms**, smart contract environments, and Layer 2 scaling architectures.

---

## 🌟 Key Features

### 1. Interactive 3D Trilemma Simulator
Vitalik Buterin's **Blockchain Trilemma** dictates that a decentralized database can generally only achieve two of three properties: **Decentralization**, **Security**, and **Scalability**.
* **Barycentric Mapping**: Maps the selection coordinates on a 2D canvas dynamically projected into a 3D coordinate frame.
* **Auto-Balancing Budget System**: When adjusting parameters in Custom Designer mode, the engine dynamically balances a 200% capacity budget across the three vectors (raising one lowers the others to reflect real-world constraints).
* **Bypass Mode**: Allows turning off the 200% budget constraints to simulate the "Holy Grail Ledger" (Impossible Network) violating physical limits.
* **Dynamic Ledger Classifier**: Classifies custom parameter sets into categories like *Traditional Sovereign L1*, *Enterprise/Federated*, *Optimized L2 Rollup*, *DAG Network*, or *Central Database*.
* **Interactive 3D Rendering**: Built using pure CSS 3D transforms, offering drag-to-rotate perspective camera controls and auto-rotation.

### 2. Consensus Protocol Explorer
A deep dive into 13 distributed consensus mechanisms:
* **Interactive Block Validation Timeline**: A step-by-step consensus timeline player with manual controls (Next/Prev) and Autoplay.
* **Radar Charts**: Uses `recharts` to map trilemma trade-offs on a 3-axis radar chart.
* **Operational Performance Benchmarks**: Details throughput (TPS), average block times, energy footprints, typical transaction costs, and time-to-finality.
* **Security Vector Analysis**: Outlines resistance parameters against 51%/34% Attacks, Sybil Attacks, Double Spending, and Byzantine Fault Tolerance thresholds.
* **Real-world Deployments**: Lists active blockchains utilizing each algorithm with their architectural deployment rationales.

### 3. Head-to-Head Comparison Mode
* Allows choosing any two consensus algorithms for a side-by-side comparison.
* Visualizes side-by-side progress bars mapping Trilemma scores.
* Compares performance benchmarks and vulnerability tolerances side-by-side.
* Breaks down architectural pros and cons next to each other.

### 4. Smart Contract Languages & Layer 2 Scaling
* **Smart Contract Language Mapping**: Maps Solidity, Rust, Plutus, Move, and Go to their target virtual machines (EVM, SVM, WASM, MoveVM) and consensus configurations.
* **L2 Settlement Tree**: Breaks down Layer 1 base/settlement chains versus Layer 2 scaling engines (Arbitrum, Optimism, zkSync, Starknet, Base), detailing Rollup mechanisms and how state proofs settle back to parent networks.

### 5. Analytics Suite
* **Cross-Chain Compatibility Matrix**: An interactive compatibility heatmap showing interoperability channels (Fully Compatible, Partially Compatible, Incompatible) between chains based on consensus types.
* **Consensus Matrix Benchmark Table**: A sortable spreadsheet-style list mapping all 13 algorithms against their key characteristics.

---

## 🛠️ Supported Consensus Algorithms

The platform provides in-depth data and visualizers for:
1. **Proof of Work (PoW)** — *Competitive Mining* (e.g., Bitcoin)
2. **Proof of Stake (PoS)** — *Collateral Staking* (e.g., Ethereum, Cardano)
3. **Delegated Proof of Stake (DPoS)** — *Representative Voting* (e.g., TRON, EOS)
4. **Proof of Authority (PoA)** — *Validator Reputation* (e.g., VeChain)
5. **Practical Byzantine Fault Tolerance (PBFT)** — *Multi-round State Replica* (e.g., Hyperledger Fabric)
6. **Proof of History (PoH)** — *Cryptographic Time Verification* (e.g., Solana)
7. **Avalanche Consensus** — *Repeated Sub-sampled Voting* (e.g., Avalanche)
8. **Proof of Burn (PoB)** — *Token Destruction* (e.g., Slimcoin)
9. **Proof of Capacity (PoC)** — *Hard Drive Space Allocation* (e.g., Chia)
10. **Proof of Elapsed Time (PoET)** — *Hardware TEE Lottery* (e.g., Hyperledger Sawtooth)
11. **Federated Byzantine Agreement (FBA)** — *Overlapping Quorum Slices* (e.g., Stellar, Ripple)
12. **Proof of Importance (Poi)** — *Account Activity Scoring* (e.g., NEM)
13. **DAG (Tangle)** — *Directed Acyclic Graph Validation* (e.g., IOTA)

---

## 📁 Directory Structure

```
blockchain-consensus-explorer/
├── public/                 # Static assets and icons
├── src/
│   ├── assets/             # Images and local styles
│   ├── components/         # Modular React Components
│   │   ├── AboutSection.jsx          # Educational background and about details
│   │   ├── CompatibilityHeatmap.jsx  # Interactive cross-chain matrix grid
│   │   ├── ComparisonMode.jsx        # Head-to-head selection comparison
│   │   ├── ComparisonTable.jsx       # Sortable matrix benchmark spreadsheet
│   │   ├── ConsensusExplorer.jsx     # Database explorer with timeline player
│   │   ├── Footer.jsx                # Modular footer with resources links
│   │   ├── Header.jsx                # Responsive header logo & tab navigation
│   │   ├── HomeSection.jsx           # Landing hero page and blockchain pillars
│   │   ├── MappingAndLayers.jsx      # Language configs and L1-L2 settlement trees
│   │   ├── NodeBackground.jsx        # HTML5 Canvas animated particle backgrounds
│   │   └── TrilemmaSimulator.jsx     # Interactive 3D trilemma & custom sculptor
│   ├── data/
│   │   └── consensusData.js          # Central data repository for all 13 algorithms
│   ├── App.css             # Main styling system
│   ├── App.jsx             # Shell routing and main layout controller
│   ├── index.css           # Global layout typography and CSS utility tokens
│   └── main.jsx            # Application root entry mount
├── index.html              # Core HTML structure, metadata, & SEO configurations
├── package.json            # Application dependencies and build scripts
└── vite.config.js          # Vite build config
```

---

## 💻 Tech Stack

* **Core Framework**: React 19 (Functional Components, Hooks, State Management)
* **Build System**: Vite 8 & Rolldown
* **Styling**: Tailwind CSS 4 (Vibrant dark theme, HSL balanced color palette, customized scrollbars)
* **Animations**: Framer Motion (Smooth layout transitions, fade-in lists)
* **Charts**: Recharts (Customized 3-axis interactive Radar charts)
* **Icons**: React Icons (Font Awesome)
* **Interactions**: HTML5 Canvas (Particle physics node backgrounds)

---

## 🚀 Development & Setup

### Prerequisites
Make sure you have Node.js (v18+) installed on your machine.

### Installation
Clone the repository and install all dependencies:
```bash
npm install
```

### Run Locally
Start the Vite local development server:
```bash
npm run dev
```
The application will boot up at `http://localhost:5173`.

### Build for Production
To compile and bundle the project for distribution:
```bash
npm run build
```
This builds static assets into the `dist/` directory.

### Preview Production Build
To preview the compiled assets locally:
```bash
npm run preview
```
