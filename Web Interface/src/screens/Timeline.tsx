import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SahayakCard } from "@/components/sahayak/Card";
import { SearchBar } from "@/components/sahayak/SearchBar";
import { Icon } from "@/components/sahayak/Icon";
import { useSpeech } from "@/hooks/useSpeech";
import { mockMemories, Memory } from "@/data/mockData";
import {
  Home,
  User,
  Cpu,
  Settings,
  Menu,
  X,
  Battery,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------- FIXED ICON TYPE ---------- */
type MemoryIcon =
  | "keys"
  | "glasses"
  | "pill"
  | "phone"
  | "heart"
  | "search";

const Timeline: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { sayText } = useSpeech();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const currentStatus = {
    battery: 85,
    isOnline: true,
  };

  const filteredMemories = useMemo(() => {
    if (!searchQuery.trim()) return mockMemories;

    const query = searchQuery.toLowerCase();
    return mockMemories.filter(
      (memory) =>
        memory.name.toLowerCase().includes(query) ||
        memory.location.toLowerCase().includes(query) ||
        memory.nearbyPerson?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && filteredMemories.length > 0) {
      const firstResult = filteredMemories[0];
      sayText(`Found ${firstResult.name} at ${firstResult.location}`);
    } else if (query && filteredMemories.length === 0) {
      sayText("No memories found for your search");
    }
  };

  const handleCardClick = (memory: Memory) => {
    sayText(
      `${memory.name} was last seen at ${memory.location} at ${memory.time}. ${
        memory.nearbyPerson ? `${memory.nearbyPerson} was nearby.` : ""
      }`
    );
  };

  const getIconForType = (memory: Memory): MemoryIcon => {
    switch (memory.name.toLowerCase()) {
      case "house keys":
        return "keys";
      case "reading glasses":
        return "glasses";
      case "medicine box":
        return "pill";
      case "mobile phone":
        return "phone";
      case "water bottle":
        return "heart";
      default:
        return "search";
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#4a3f35] pb-32">

      {/* ===== Dashboard Style Header ===== */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#fff6e8] border-b border-[#eadfce]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-[#ffe9b3] flex items-center justify-center"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div>
              <h1 className="font-bold text-lg">Timeline</h1>
              <p className="text-xs text-[#8a7d6b]">
                {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e9fbf2] text-[#2f7d5b]">
              <Wifi size={14} /> Online
            </div>

            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1ede6]">
              <Battery size={14} /> {currentStatus.battery}%
            </div>
          </div>

        </div>
      </div>

      {/* ===== Main ===== */}
      <main className="pt-20 px-4 max-w-2xl mx-auto">

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-20 z-30 py-4 bg-[#fbf7f2]"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            autoFocus
          />
        </motion.div>

        <div className="relative">

          {/* Timeline Rail */}
          <div className="timeline-rail" aria-hidden="true">
            {filteredMemories.map((_, index) => (
              <motion.div
                key={index}
                className="timeline-node"
                style={{ top: `${(index / filteredMemories.length) * 100}%` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              />
            ))}
          </div>

          {/* Cards */}
          <div className="ml-8 space-y-4 pb-4">
            <AnimatePresence mode="popLayout">
              {filteredMemories.length > 0 ? (
                filteredMemories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <SahayakCard
                      variant="soft"
                      padding="md"
                      interactive
                      onClick={() => handleCardClick(memory)}
                      className="relative bg-white border border-[#eadfce]"
                    >
                      <div className="confidence-badge bg-[#fff1e3] border border-[#eadfce] text-[#7a5a3a]">
                        {memory.confidence}%
                      </div>

                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-lg bg-[#f5efe6] flex items-center justify-center">
                          <Icon
                            name={getIconForType(memory)}
                            size="xl"
                            className="text-[#a26b3f]"
                          />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">{memory.name}</h3>
                          <div className="text-[#8a7d6b] text-sm mt-2 space-y-1">
                            <div className="flex items-center gap-1">
                              <Icon name="location" size="sm" /> {memory.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="clock" size="sm" /> {memory.time}
                            </div>
                            {memory.nearbyPerson && (
                              <div className="flex items-center gap-1">
                                <Icon name="user" size="sm" /> {memory.nearbyPerson}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SahayakCard>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16 text-[#8a7d6b]">
                  No memories found
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* ===== Bottom Navbar ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fff6e8] border-t border-[#eadfce]">
        <div className="max-w-5xl mx-auto px-6 py-2 flex justify-between">

          <button onClick={() => navigate("/")} className="flex flex-col items-center text-[#6b5e4e]">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button onClick={() => navigate("/faces")} className="flex flex-col items-center text-[#6b5e4e]">
            <User size={20} />
            <span className="text-xs">Faces</span>
          </button>

          <button onClick={() => navigate("/hud")} className="flex flex-col items-center text-[#6b5e4e]">
            <Cpu size={20} />
            <span className="text-xs">Neural</span>
          </button>

          <button className="flex flex-col items-center text-[#3b3126] font-semibold">
            <Settings size={20} />
            <span className="text-xs">More</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Timeline;
