import { useState, useEffect } from "react";
import {
  Mic,
  Save,
  Tag,
  Calendar,
  User,
  FileText,
  Brain,
  Menu,
  X,
  Battery,
  Wifi,
  Home,
  Cpu,
  Settings,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = ["Personal", "Medical", "Family", "Important", "Daily"];

export default function AddMemory() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Personal");
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleSave = () => {
    if (!title || !description) {
      alert("Please enter title and description");
      return;
    }
    alert("Memory saved successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#4a3f35] pb-32">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#fff6e8] border-b border-[#eadfce]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-[#ffe9b3] flex items-center justify-center"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl bg-[#ffe9b3] flex items-center justify-center"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div>
              <h1 className="font-bold text-lg flex items-center gap-2">
                <Brain size={18} /> Add Memory
              </h1>
              <p className="text-xs text-[#8a7d6b]">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#e9fbf2] text-[#2f7d5b]">
              <Wifi size={14} /> Online
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f1ede6]">
              <Battery size={14} /> 85%
            </span>
          </div>

        </div>
      </div>

      {/* Main */}
      <main className="pt-20 max-w-4xl mx-auto px-4 py-6 space-y-6">

        <div className="bg-white p-4 rounded-2xl border">
          <label className="flex items-center gap-2 text-sm font-medium">
            <FileText size={16} /> Memory Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full border rounded-xl p-3"
          />
        </div>

        <div className="bg-white p-4 rounded-2xl border">
          <label className="text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full border rounded-xl p-3 min-h-[100px]"
          />
        </div>

        <div className="bg-gradient-to-r from-[#fff1c1] to-[#ffe4ec] border rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="font-semibold">Voice Input</p>
            <p className="text-sm text-[#7a6a58]">Record memory using voice</p>
          </div>
          <button className="bg-white p-3 rounded-xl border">
            <Mic />
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl border">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Tag size={16} /> Category
          </label>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`p-2 rounded-xl border text-sm ${
                  category === cat ? "bg-[#f2cfa5]" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border">
          <label className="text-sm font-medium">Tags</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 w-full border rounded-xl p-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border">
            <label className="flex items-center gap-2 text-sm font-medium">
              <User size={16} /> Person
            </label>
            <input
              value={person}
              onChange={(e) => setPerson(e.target.value)}
              className="mt-2 w-full border rounded-xl p-3"
            />
          </div>

          <div className="bg-white p-4 rounded-2xl border">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Calendar size={16} /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full border rounded-xl p-3"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#f2cfa5] py-4 rounded-2xl border flex items-center justify-center gap-2"
        >
          <Save size={18} /> Save Memory
        </button>

      </main>

      {/* Bottom Navbar */}
      <BottomNav navigate={navigate} active="none" />

    </div>
  );
}

/* Navbar component */
function BottomNav({ navigate, active }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#fff6e8] border-t border-[#eadfce]">
      <div className="max-w-5xl mx-auto px-6 py-2 flex justify-between">

        <NavItem icon={Home} label="Home" onClick={() => navigate("/")} />
        <NavItem icon={User} label="Faces" onClick={() => navigate("/faces")} />
        <NavItem icon={Cpu} label="Neural" onClick={() => navigate("/hud")} />
        <NavItem icon={Settings} label="More" onClick={() => navigate("/timeline")} />

      </div>
    </div>
  );
}

function NavItem({ icon: IconComp, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center text-[#6b5e4e]">
      <IconComp size={20} />
      <span className="text-xs">{label}</span>
    </button>
  );
}
