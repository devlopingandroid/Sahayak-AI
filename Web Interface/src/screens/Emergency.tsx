import { useState } from "react";
import {
  ArrowLeft,
  PhoneCall,
  MapPin,
  AlertTriangle,
  Users,
  XCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Emergency() {
  const navigate = useNavigate();
  const [alertSent, setAlertSent] = useState(false);

  const sendEmergencyAlert = () => {
    setAlertSent(true);
    console.log("🚨 Emergency alert sent to family & caregivers");
  };

  const cancelAlert = () => {
    setAlertSent(false);
    console.log("❌ Emergency alert cancelled");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">

      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur border-b z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-red-100 hover:bg-red-200"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-xl font-bold text-red-700 flex items-center gap-2">
            <AlertTriangle size={22} />
            Emergency Assistance
          </h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Alert Status */}
        <div
          className={`p-5 rounded-2xl shadow text-center ${
            alertSent
              ? "bg-red-600 text-white"
              : "bg-white text-slate-700"
          }`}
        >
          {alertSent ? (
            <>
              <h2 className="text-lg font-bold">🚨 Emergency Alert Sent</h2>
              <p className="text-sm mt-2">
                Family members & caregivers have been notified.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold">No active emergency</h2>
              <p className="text-sm mt-2">
                Press the button below if immediate help is required.
              </p>
            </>
          )}
        </div>

        {/* Location */}
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
          <MapPin className="text-red-600" />
          <div>
            <p className="font-semibold">Current Location</p>
            <p className="text-sm text-slate-500">Living Room, Ground Floor</p>
          </div>
        </div>

        {/* Emergency Button */}
        {!alertSent ? (
          <button
            onClick={sendEmergencyAlert}
            className="w-full bg-gradient-to-br from-red-600 to-red-700 text-white py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition flex items-center justify-center gap-3 text-lg font-semibold"
          >
            <AlertTriangle size={26} />
            Send Emergency Alert
          </button>
        ) : (
          <button
            onClick={cancelAlert}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl shadow-lg hover:bg-slate-900 transition flex items-center justify-center gap-3"
          >
            <XCircle size={22} />
            Cancel Alert
          </button>
        )}

        {/* Quick Contacts */}
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Users size={18} /> Emergency Contacts
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-white p-4 rounded-2xl shadow hover:shadow-lg flex items-center gap-3">
              <PhoneCall className="text-green-600" />
              <div className="text-left">
                <p className="font-semibold">Rahul (Son)</p>
                <p className="text-sm text-slate-500">Call Family</p>
              </div>
            </button>

            <button className="bg-white p-4 rounded-2xl shadow hover:shadow-lg flex items-center gap-3">
              <PhoneCall className="text-blue-600" />
              <div className="text-left">
                <p className="font-semibold">Dr. Sharma</p>
                <p className="text-sm text-slate-500">Call Doctor</p>
              </div>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-sm text-slate-500 mt-6">
          Emergency alerts will share location & health status automatically.
        </div>

      </main>
    </div>
  );
}
