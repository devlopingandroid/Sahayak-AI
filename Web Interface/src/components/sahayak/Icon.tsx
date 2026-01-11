import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Brain, 
  Users, 
  Bell, 
  Mic, 
  MicOff,
  Volume2,
  VolumeX,
  MapPin,
  Clock,
  Battery,
  Wifi,
  WifiOff,
  Home,
  Camera,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
  Eye,
  AlertTriangle,
  CheckCircle,
  Heart,
  User,
  Key,
  Glasses,
  Pill,
  Smartphone,
  MonitorSpeaker,
  type LucideIcon,
} from 'lucide-react';

export type IconName = 
  | 'search' 
  | 'brain' 
  | 'users' 
  | 'bell' 
  | 'mic' 
  | 'mic-off'
  | 'volume' 
  | 'volume-off'
  | 'location' 
  | 'clock' 
  | 'battery'
  | 'wifi'
  | 'wifi-off'
  | 'home'
  | 'camera'
  | 'plus'
  | 'close'
  | 'back'
  | 'forward'
  | 'settings'
  | 'eye'
  | 'alert'
  | 'check'
  | 'heart'
  | 'user'
  | 'keys'
  | 'glasses'
  | 'pill'
  | 'phone'
  | 'speaker';

const iconMap: Record<IconName, LucideIcon> = {
  search: Search,
  brain: Brain,
  users: Users,
  bell: Bell,
  mic: Mic,
  'mic-off': MicOff,
  volume: Volume2,
  'volume-off': VolumeX,
  location: MapPin,
  clock: Clock,
  battery: Battery,
  wifi: Wifi,
  'wifi-off': WifiOff,
  home: Home,
  camera: Camera,
  plus: Plus,
  close: X,
  back: ChevronLeft,
  forward: ChevronRight,
  settings: Settings,
  eye: Eye,
  alert: AlertTriangle,
  check: CheckCircle,
  heart: Heart,
  user: User,
  keys: Key,
  glasses: Glasses,
  pill: Pill,
  phone: Smartphone,
  speaker: MonitorSpeaker,
};

interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizes = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-10 h-10',
};

export const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  className,
  label 
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      className={cn(sizes[size], 'flex-shrink-0', className)} 
      aria-label={label}
      aria-hidden={!label}
      fill="currentColor"
      strokeWidth={0}
    />
  );
};

// Outlined version for specific cases
export const IconOutline: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  className,
  label 
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent 
      className={cn(sizes[size], 'flex-shrink-0', className)} 
      aria-label={label}
      aria-hidden={!label}
      strokeWidth={2}
    />
  );
};

export default Icon;
