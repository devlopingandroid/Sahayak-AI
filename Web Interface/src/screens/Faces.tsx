import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Battery,
  Wifi,
  Home,
  User,
  Cpu,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SahayakCard } from "@/components/sahayak/Card";
import { SahayakButton } from "@/components/sahayak/Button";
import { FAB } from "@/components/sahayak/FAB";
import { Modal } from "@/components/sahayak/Modal";
import { Icon } from "@/components/sahayak/Icon";
import { useToast, Toast } from "@/components/sahayak/Toast";
import { useSpeech } from "@/hooks/useSpeech";
import { mockPeople, Person } from "@/data/mockData";

const Faces: React.FC = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [newPerson, setNewPerson] = useState({
    name: "",
    relationship: "Family",
    context: "",
  });
  const [isTraining, setIsTraining] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { showToast, toast, hideToast } = useToast();
  const { sayText } = useSpeech();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentStatus = {
    battery: 85,
    isOnline: true,
  };

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    if (person.context) sayText(person.context);
  };

  const handleAddPerson = () => {
    setIsModalOpen(true);
    setIsCameraActive(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCameraActive(false);
    setNewPerson({ name: "", relationship: "Family", context: "" });
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const handleTrainFace = async () => {
    if (!newPerson.name.trim()) {
      showToast("Please enter a name", "warning");
      return;
    }

    setIsTraining(true);
    sayText("Training face model. Please wait.");

    await new Promise((r) => setTimeout(r, 2500));

    setIsTraining(false);
    showToast(`${newPerson.name} added successfully!`, "success");
    sayText(`Training complete. ${newPerson.name} added.`);
    handleCloseModal();
  };

  useEffect(() => {
    const startCamera = async () => {
      if (isCameraActive && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
          });
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
        } catch {
          showToast("Camera access denied", "error");
        }
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isCameraActive, showToast]);

  const relationships = [
    "Family",
    "Son",
    "Daughter",
    "Spouse",
    "Friend",
    "Caretaker",
    "Doctor",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#4a3f35] pb-32">

      {/* ===== Header ===== */}
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
              <h1 className="font-bold text-lg">Faces</h1>
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
        <div className="py-4">
          <h2 className="text-lg font-semibold mb-1">People You Know</h2>
          <p className="text-[#8a7d6b] text-sm">Tap a person to hear about them</p>
        </div>

        <div className="columns-2 gap-4 space-y-4">
          {mockPeople.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <SahayakCard
                variant="soft"
                padding="md"
                interactive
                onClick={() => handlePersonClick(person)}
                className={`bg-white border border-[#eadfce] ${
                  selectedPerson?.id === person.id
                    ? "ring-2 ring-[#f2cfa5]"
                    : ""
                }`}
              >
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-[#f5efe6] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#a26b3f]">
                    {person.name.charAt(0)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-center">
                  {person.name}
                </h3>

                <div className="flex justify-center mt-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-[#fff1e3] border border-[#eadfce]">
                    {person.relationship}
                  </span>
                </div>

                <p className="text-[#8a7d6b] text-sm text-center mt-3">
                  Last seen: {person.lastSeen}
                </p>
              </SahayakCard>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedPerson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-28 left-4 right-4 mx-auto max-w-lg"
            >
              <SahayakCard
                variant="soft"
                padding="md"
                className="bg-white border border-[#eadfce]"
              >
                <div className="flex items-start gap-3">
                  <Icon name="brain" size="lg" className="text-[#a26b3f]" />
                  <div>
                    <h4 className="font-semibold">
                      About {selectedPerson.name}
                    </h4>
                    <p className="text-[#8a7d6b] text-sm mt-1">
                      {selectedPerson.context}
                    </p>
                  </div>
                  <button onClick={() => setSelectedPerson(null)}>
                    <Icon name="close" size="sm" />
                  </button>
                </div>
              </SahayakCard>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FAB */}
      <FAB
        icon="plus"
        variant="accent"
        onClick={handleAddPerson}
        label="Add new person"
      />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Person" size="lg">
        <div className="space-y-6">
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden bg-[#f5efe6]">
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
          </div>

          <input
            placeholder="Name"
            value={newPerson.name}
            onChange={(e) => setNewPerson((p) => ({ ...p, name: e.target.value }))}
            className="w-full p-3 rounded-xl border border-[#eadfce]"
          />

          <select
            value={newPerson.relationship}
            onChange={(e) =>
              setNewPerson((p) => ({ ...p, relationship: e.target.value }))
            }
            className="w-full p-3 rounded-xl border border-[#eadfce]"
          >
            {relationships.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <textarea
            rows={3}
            placeholder="About this person..."
            value={newPerson.context}
            onChange={(e) =>
              setNewPerson((p) => ({ ...p, context: e.target.value }))
            }
            className="w-full p-3 rounded-xl border border-[#eadfce]"
          />

          <SahayakButton
            variant="accent"
            fullWidth
            onClick={handleTrainFace}
            isLoading={isTraining}
          >
            {isTraining ? "Training..." : "Train Face Model"}
          </SahayakButton>
        </div>
      </Modal>

      {/* ===== Bottom Navbar ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fff6e8] border-t border-[#eadfce]">
        <div className="max-w-5xl mx-auto px-6 py-2 flex justify-between">
          <button onClick={() => navigate("/")} className="flex flex-col items-center text-[#6b5e4e]">
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>

          <button className="flex flex-col items-center text-[#3b3126] font-semibold">
            <User size={20} />
            <span className="text-xs">Faces</span>
          </button>

          <button onClick={() => navigate("/hud")} className="flex flex-col items-center text-[#6b5e4e]">
            <Cpu size={20} />
            <span className="text-xs">Neural</span>
          </button>

          <button onClick={() => navigate("/timeline")} className="flex flex-col items-center text-[#6b5e4e]">
            <Settings size={20} />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onDismiss={hideToast}
      />
    </div>
  );
};

export default Faces;
