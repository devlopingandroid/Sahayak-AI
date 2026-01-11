import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SahayakButton } from '@/components/sahayak/Button';
import { Icon } from '@/components/sahayak/Icon';
import { mockDetections, mockLogs } from '@/data/mockData';

const NeuralHUD: React.FC = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<string[]>([]);
  const [detections, setDetections] = useState(mockDetections.slice(0, 2));
  const [telemetry, setTelemetry] = useState({ cpu: 45, ram: 3.2, fps: 30 });
  const logsRef = useRef<HTMLPreElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  // Enable dark mode on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  // Simulate log streaming
  useEffect(() => {
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < mockLogs.length) {
        setLogs(prev => [...prev, mockLogs[logIndex]]);
        logIndex++;
      } else {
        // Add random activity logs
        const activities = [
          '> [VISION] Scanning environment...',
          '> [AUDIO] Listening for voice commands...',
          '> [SYSTEM] Memory sync in progress...',
          '> [VISION] No new objects detected',
          '> [SYSTEM] All systems nominal',
        ];
        setLogs(prev => [...prev.slice(-20), activities[Math.floor(Math.random() * activities.length)]]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate detections appearing
  useEffect(() => {
    const interval = setInterval(() => {
      setDetections(prev => {
        if (prev.length < mockDetections.length) {
          return [...prev, mockDetections[prev.length]];
        }
        // Shuffle positions slightly for realism
        return prev.map(d => ({
          ...d,
          x: d.x + (Math.random() - 0.5) * 10,
          y: d.y + (Math.random() - 0.5) * 10,
        }));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simulate telemetry updates
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

  // Try to start camera
  useEffect(() => {
    const startCamera = async () => {
      if (videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
          });
          videoRef.current.srcObject = stream;
          setIsVideoActive(true);
        } catch {
          console.log('Camera not available, using placeholder');
        }
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border safe-top">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center text-foreground"
              aria-label="Go back"
            >
              <Icon name="back" size="lg" />
            </motion.button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="font-mono text-sm text-success">NEURAL HUD</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>DEMO MODE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 flex flex-col lg:flex-row h-screen">
        {/* Video Feed */}
        <div className="flex-1 relative bg-black">
          {/* Video or Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={cn(
                'w-full h-full object-cover',
                !isVideoActive && 'hidden'
              )}
            />
            {!isVideoActive && (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="eye" size="xl" className="text-success mx-auto mb-4" />
                  <p className="text-muted-foreground font-mono">Camera feed simulation</p>
                </div>
              </div>
            )}
          </div>

          {/* Scan Line Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-success/50 to-transparent"
              animate={{ y: ['0%', '100vh'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Detection Overlays */}
          {detections.map((detection, index) => (
            <motion.div
              key={detection.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute neural-overlay"
              style={{
                left: `${(detection.x / 700) * 100}%`,
                top: `${(detection.y / 500) * 100}%`,
                width: detection.width,
                height: detection.height,
              }}
            >
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-8 left-0 neural-label whitespace-nowrap"
              >
                [{detection.label}: {detection.confidence}%]
              </motion.div>

              {/* Corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-success" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-success" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-success" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-success" />
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
            {detections.slice(0, -1).map((detection, index) => {
              const next = detections[index + 1];
              if (!next) return null;
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={`${(detection.x / 700) * 100}%`}
                  y1={`${(detection.y / 500) * 100}%`}
                  x2={`${(next.x / 700) * 100}%`}
                  y2={`${(next.y / 500) * 100}%`}
                  stroke="hsl(var(--success))"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-card/50 backdrop-blur-sm border-l border-border flex flex-col">
          {/* Terminal */}
          <div className="flex-1 p-4 overflow-hidden">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              System Log
            </h3>
            <pre
              ref={logsRef}
              className="terminal-text h-48 lg:h-96 overflow-y-auto text-xs leading-relaxed"
            >
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
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Telemetry
            </h3>
            
            {/* CPU */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">CPU Temp</span>
                <span className="text-accent">{telemetry.cpu.toFixed(1)}°C</span>
              </div>
              <div className="gauge">
                <motion.div
                  className="gauge-fill bg-accent"
                  animate={{ width: `${(telemetry.cpu / 100) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* RAM */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">RAM Usage</span>
                <span className="text-success">{telemetry.ram.toFixed(1)}GB</span>
              </div>
              <div className="gauge">
                <motion.div
                  className="gauge-fill bg-success"
                  animate={{ width: `${(telemetry.ram / 8) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* FPS */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-muted-foreground">Frame Rate</span>
                <span className="text-primary">{telemetry.fps.toFixed(0)} FPS</span>
              </div>
              <div className="gauge">
                <motion.div
                  className="gauge-fill bg-primary"
                  animate={{ width: `${(telemetry.fps / 60) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Exit Button */}
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
