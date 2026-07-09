import { useState } from "react";
import NodeBackground from "./components/NodeBackground";
import TrilemmaSimulator from "./components/TrilemmaSimulator";
import ConsensusExplorer from "./components/ConsensusExplorer";
import ComparisonMode from "./components/ComparisonMode";
import MappingAndLayers from "./components/MappingAndLayers";
import CompatibilityHeatmap from "./components/CompatibilityHeatmap";
import ComparisonTable from "./components/ComparisonTable";
import AboutSection from "./components/AboutSection";
import HomeSection from "./components/HomeSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection setActiveTab={setActiveTab} />;
      case "trilemma":
        return <TrilemmaSimulator />;
      case "explorer":
        return <ConsensusExplorer />;
      case "compare":
        return <ComparisonMode />;
      case "languages":
        return <MappingAndLayers />;
      case "analytics":
        return (
          <div className="space-y-8">
            <CompatibilityHeatmap />
            <ComparisonTable />
          </div>
        );
      case "about":
        return <AboutSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative px-4 md:px-8 max-w-7xl mx-auto py-4">
      {/* Interactive Background */}
      <NodeBackground />

      {/* Header / Nav */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-16">{renderTabContent()}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
