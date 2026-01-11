import { useState, useEffect } from "react";
import {
  Search, Camera, Clock, MapPin, Box, Shirt, Key, Smartphone,
  Menu, X, Battery, Wifi, Home, User, Cpu, Settings, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Keys", icon: Key },
  { name: "Phone", icon: Smartphone },
  { name: "Clothes", icon: Shirt },
  { name: "Boxes", icon: Box },
];

const recentObjects = [
  { name: "House Keys", location: "Sofa - Living Room", time: "5 min ago" },
  { name: "Mobile Phone", location: "Bedroom Table", time: "20 min ago" },
  { name: "Spectacles", location: "Kitchen Shelf", time: "1 hour ago" },
];

export default function FindObject() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#4a3f35] pb-32">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#fff6e8] border-b border-[#eadfce] z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#ffe9b3] rounded-xl flex justify-center items-center">
              <ArrowLeft size={18} />
            </button>

            <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 bg-[#ffe9b3] rounded-xl flex justify-center items-center">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div>
              <h1 className="font-bold text-lg">Find Object</h1>
              <p className="text-xs text-[#8a7d6b]">{currentTime.toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="flex gap-2 text-sm">
            <span className="flex items-center gap-1 bg-[#e9fbf2] px-3 py-1 rounded-full">
              <Wifi size={14} /> Online
            </span>
            <span className="flex items-center gap-1 bg-[#f1ede6] px-3 py-1 rounded-full">
              <Battery size={14} /> 85%
            </span>
          </div>

        </div>
      </div>

      <main className="pt-20 max-w-4xl mx-auto px-4 space-y-8">

        <div className="bg-white p-4 rounded-2xl border flex gap-3 items-center">
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none"
            placeholder="Search object..."
          />
        </div>

        <div className="bg-gradient-to-r from-[#fff1c1] to-[#ffe4ec] border rounded-2xl p-6 flex justify-between">
          <div>
            <h2 className="font-bold">Scan using Camera</h2>
            <p className="text-sm">AI detection</p>
          </div>
          <button onClick={() => navigate("/camera")} className="bg-white p-3 rounded-xl border">
            <Camera />
          </button>
        </div>

        <div>
          <h2 className="font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map((c) => (
              <div key={c.name} className="bg-white p-4 rounded-2xl border text-center">
                <c.icon className="mx-auto mb-2" />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <Clock size={18} /> Recent Found Objects
          </h2>

          {recentObjects.map((o, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border mb-2 flex justify-between">
              <div>
                <p className="font-semibold">{o.name}</p>
                <p className="text-sm text-[#8a7d6b] flex items-center gap-1">
                  <MapPin size={14} /> {o.location}
                </p>
              </div>
              <span className="text-xs">{o.time}</span>
            </div>
          ))}
        </div>

      </main>

      <BottomNav navigate={navigate} />

    </div>
  );
}

function BottomNav({ navigate }: any) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#fff6e8] border-t border-[#eadfce]">
      <div className="max-w-5xl mx-auto px-6 py-2 flex justify-between">
        <Nav icon={Home} label="Home" onClick={() => navigate("/")} />
        <Nav icon={User} label="Faces" onClick={() => navigate("/faces")} />
        <Nav icon={Cpu} label="Neural" onClick={() => navigate("/hud")} />
        <Nav icon={Settings} label="More" onClick={() => navigate("/timeline")} />
      </div>
    </div>
  );
}

function Nav({ icon: IconComp, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center text-[#6b5e4e]">
      <IconComp size={20} />
      <span className="text-xs">{label}</span>
    </button>
  );
}
