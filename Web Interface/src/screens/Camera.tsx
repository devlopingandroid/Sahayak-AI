import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SahayakButton } from '@/components/sahayak/Button';
import { Icon } from '@/components/sahayak/Icon';
import { mockLogs } from '@/data/mockData';

const NeuralHUD: React.FC = () => {
  const navigate = useNavigate();

  const [logs, setLogs] = useState<string[]>([]);
  const [telemetry, setTelemetry] = useState({ cpu: 45, ram: 3.2, fps: 30 });
  const logsRef = useRef<HTMLPreElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => document.documentElement.classList.remove('dark');
  }, []);

  // Logs simulation
  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[logIndex]]);
        logIndex++;
      } else {
        const activities = [
          '> [VISION] Camera feed active',
          '> [AUDIO] Listening...',
          '> [SYSTEM] Memory sync complete',
          '> [SYSTEM] All systems nominal',
        ];
        setLogs(prev => [...prev.slice(-20), activities[Math.floor(Math.random() * activities.length)]]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Auto scroll logs
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  // Telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        cpu: 40 + Math.random() * 20,
        ram: 3 + Math.random() * 1,
        fps: 28 + Math.random() * 4,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Camera start
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsVideoActive(true);
        }
      } catch {
        console.log('Camera not available');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Icon name="back" size="lg" />
            </motion.button>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-sm text-success">NEURAL HUD</span>
            </div>
          </div>

          <span className="text-xs font-mono text-muted-foreground">DEMO MODE</span>
        </div>
      </header>

      {/* Main */}
      <main className="pt-14 flex flex-col lg:flex-row h-screen">

        {/* Camera Feed */}
        <div className="flex-1 relative bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn('w-full h-full object-cover', !isVideoActive && 'hidden')}
          />

          {!isVideoActive && (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
              <div className="text-center">
                <Icon name="eye" size="xl" className="text-success mx-auto mb-4" />
                <p className="text-muted-foreground font-mono">Camera feed simulation</p>
              </div>
            </div>
          )}

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-success/50 to-transparent pointer-events-none"
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-card/50 backdrop-blur-sm border-l border-border flex flex-col">

          {/* Logs */}
          <div className="flex-1 p-4 overflow-hidden">
            <h3 className="text-xs font-mono text-muted-foreground uppercase mb-3">
              System Log
            </h3>

            <pre ref={logsRef} className="terminal-text h-48 lg:h-96 overflow-y-auto text-xs">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {log}
                </motion.div>
              ))}
            </pre>
          </div>

          {/* Telemetry */}
          <div className="border-t border-border p-4 space-y-3">
            <h3 className="text-xs font-mono text-muted-foreground uppercase">Telemetry</h3>

            {[
              { label: 'CPU Temp', value: telemetry.cpu, unit: '°C', max: 100, color: 'bg-accent' },
              { label: 'RAM Usage', value: telemetry.ram, unit: 'GB', max: 8, color: 'bg-success' },
              { label: 'Frame Rate', value: telemetry.fps, unit: 'FPS', max: 60, color: 'bg-primary' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span>{item.value.toFixed(1)}{item.unit}</span>
                </div>
                <div className="gauge">
                  <motion.div
                    className={`gauge-fill ${item.color}`}
                    animate={{ width: `${(item.value / item.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Exit */}
          <div className="p-4 border-t border-border">
            <SahayakButton
              variant="outline"
              fullWidth
              onClick={() => navigate('/')}
              icon={<Icon name="home" size="md" />}
            >
              Exit Demo
            </SahayakButton>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NeuralHUD;
