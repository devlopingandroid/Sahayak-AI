import React, { useState, useEffect } from "react";
import {
  Search,
  Brain,
  Bell,
  MapPin,
  Volume2,
  Key,
  Phone,
  Pill,
  Battery,
  Wifi,
  Menu,
  X,
  Clock,
  Activity,
  Heart,
  Zap,
  TrendingUp,
  Camera,
  Home,
  User,
  Cpu,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const currentStatus = {
    personName: "Grandma",
    location: "Living Room",
    activity: "Reading newspaper",
    lastUpdate: "2 min ago",
    isOnline: true,
    battery: 85,
    heartRate: 72,
    steps: 1247,
  };

  const quickActions = [
    { icon: Search, label: "Find Object", route: "/find", bg: "bg-[#fff7db]" },
    { icon: Camera, label: "Detection", route: "/camera", bg: "bg-[#ffe9ef]" },
    { icon: Brain, label: "Add Memory", route: "/memory", bg: "bg-[#eafff5]" },
    { icon: Bell, label: "Emergency", route: "/emergency", bg: "bg-[#fff1e3]" },
  ];

  const recentActivity = [
    { time: "10 min ago", event: "Medicine reminder completed", icon: Pill },
    { time: "1 hour ago", event: "Keys found at Dining Table", icon: Key },
    { time: "2 hours ago", event: "Rahul called", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-[#fbf7f2] text-[#4a3f35]">

      {/* Top Bar */}
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
              <h1 className="font-bold text-lg">Sahayak</h1>
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

      <main className="pt-20 max-w-5xl mx-auto px-4 pb-32">

        {/* Hero Card */}
        <div className="rounded-3xl p-6 bg-gradient-to-r from-[#fff1c1] to-[#ffe4ec] border border-[#f3e1b5] shadow-sm">
          <h2 className="text-xl font-bold mb-1">
            {currentStatus.personName} is in the {currentStatus.location}
          </h2>
          <p className="text-sm text-[#7a6a58] mb-3">
            {currentStatus.activity} • {currentStatus.lastUpdate}
          </p>
          <div className="inline-flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full text-sm">
            <MapPin size={14} />
            Home • Ground Floor
          </div>
        </div>

        {/* Health Cards */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl p-4 bg-[#fff0f0] border">
            <Heart className="text-red-400 mb-1" />
            <p className="text-xl font-bold">{currentStatus.heartRate}</p>
            <p className="text-xs">Heart Rate</p>
          </div>

          <div className="rounded-2xl p-4 bg-[#eef6ff] border">
            <TrendingUp className="text-blue-400 mb-1" />
            <p className="text-xl font-bold">{currentStatus.steps}</p>
            <p className="text-xs">Steps Today</p>
          </div>

          <div className="rounded-2xl p-4 bg-[#ecfff6] border">
            <Activity className="text-green-400 mb-1" />
            <p className="text-xl font-bold">2.5</p>
            <p className="text-xs">Active Time</p>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="mt-8 mb-3 font-semibold flex items-center gap-2">
          <Zap size={16} /> Quick Actions
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.route)}
              className={`rounded-2xl p-5 border shadow-sm hover:shadow transition ${action.bg}`}
            >
              <action.icon className="mb-3" />
              <p className="font-medium">{action.label}</p>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <h3 className="mt-8 mb-3 font-semibold flex items-center gap-2">
          <Clock size={16} /> Recent Activity
        </h3>

        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white rounded-xl p-3 border"
            >
              <div className="w-10 h-10 rounded-full bg-[#f5efe6] flex items-center justify-center">
                <item.icon size={18} />
              </div>
              <div>
                <p className="font-medium">{item.event}</p>
                <p className="text-xs text-[#8a7d6b]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Bottom Navigation */}
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

          <button onClick={() => navigate("/timeline")} className="flex flex-col items-center text-[#6b5e4e]">
            <Settings size={20} />
            <span className="text-xs">More</span>
          </button>

        </div>
      </div>

      {/* Floating Mic Button */}
      <button className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-[#ffb7b7] flex items-center justify-center shadow-lg">
        <Volume2 />
      </button>

    </div>
  );
};

export default Dashboard;
