// Mock data for Sahayak demo

export interface Memory {
  id: string;
  name: string;
  location: string;
  time: string;
  timestamp: Date;
  thumbnail?: string;
  nearbyPerson?: string;
  confidence: number;
  type: 'object' | 'person' | 'event' | 'location';
}

export interface Person {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
  lastSeen: string;
  context?: string;
}

export const mockMemories: Memory[] = [
  {
    id: '1',
    name: 'House Keys',
    location: 'Dining Table',
    time: '10:15 AM',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    nearbyPerson: 'Mishu',
    confidence: 98,
    type: 'object',
  },
  {
    id: '2',
    name: 'Reading Glasses',
    location: 'Bedroom Nightstand',
    time: '9:30 AM',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    confidence: 95,
    type: 'object',
  },
  {
    id: '3',
    name: 'Wallet',
    location: 'Living Room Sofa',
    time: '8:45 AM',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    nearbyPerson: 'Rahul',
    confidence: 92,
    type: 'object',
  },
  {
    id: '4',
    name: 'Medicine Box',
    location: 'Kitchen Counter',
    time: '7:00 AM',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    confidence: 99,
    type: 'object',
  },
  {
    id: '5',
    name: 'Mobile Phone',
    location: 'Study Desk',
    time: 'Yesterday 6:00 PM',
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    nearbyPerson: 'Priya',
    confidence: 88,
    type: 'object',
  },
  {
    id: '6',
    name: 'Water Bottle',
    location: 'Kitchen',
    time: '11:00 AM',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    confidence: 97,
    type: 'object',
  },
];

export const mockPeople: Person[] = [
  {
    id: '1',
    name: 'RAHUL',
    relationship: 'Son',
    lastSeen: '2h ago',
    context: 'Rahul is your son. He lives in Mumbai and visits every weekend. He loves cricket and works as a software engineer.',
  },
  {
    id: '2',
    name: 'PRIYA',
    relationship: 'Daughter',
    lastSeen: '1d ago',
    context: 'Priya is your daughter. She is a doctor and lives nearby. She calls every evening to check on you.',
  },
  {
    id: '3',
    name: 'MISHU',
    relationship: 'Caretaker',
    lastSeen: '30m ago',
    context: 'Mishu is your daily caretaker. She helps with meals and medicines. She has been with the family for 5 years.',
  },
  {
    id: '4',
    name: 'DR. SHARMA',
    relationship: 'Doctor',
    lastSeen: '1w ago',
    context: 'Dr. Sharma is your neurologist. Monthly checkup on the first Saturday. Clinic is at City Hospital, 3rd floor.',
  },
  {
    id: '5',
    name: 'ANITA',
    relationship: 'Wife',
    lastSeen: 'Now',
    context: 'Anita is your wife of 45 years. You met in college. She loves gardening and cooking your favorite dishes.',
  },
  {
    id: '6',
    name: 'ROHAN',
    relationship: 'Grandson',
    lastSeen: '3d ago',
    context: 'Rohan is your grandson, Rahul\'s son. He is 8 years old and loves playing chess with you.',
  },
];

export const currentStatus = {
  personName: 'Dad',
  location: 'Living Room',
  activity: 'Sitting on sofa',
  lastUpdate: '2 minutes ago',
  battery: 82,
  isOnline: true,
};

// Neural HUD mock detections
export const mockDetections = [
  { id: '1', label: 'BOTTLE', confidence: 99, x: 120, y: 300, width: 80, height: 120 },
  { id: '2', label: 'REMOTE', confidence: 95, x: 400, y: 280, width: 60, height: 40 },
  { id: '3', label: 'GLASSES', confidence: 92, x: 550, y: 150, width: 100, height: 50 },
  { id: '4', label: 'PHONE', confidence: 88, x: 300, y: 400, width: 70, height: 130 },
];

export const mockLogs = [
  '> [VISION] Initializing neural inference engine...',
  '> [SYSTEM] Connected to home network: SahayakNet',
  '> [AUDIO] Voice recognition module loaded',
  '> [VISION] Object detected: Bottle at (120, 300)',
  '> [VISION] Object detected: Remote at (400, 280)',
  '> [AUDIO] Voice command received: "Where is water?"',
  '> [VISION] Highlighting BOTTLE with 99% confidence',
  '> [SYSTEM] Memory checkpoint saved',
  '> [VISION] Object detected: Glasses at (550, 150)',
  '> [AUDIO] Speaking: "Water bottle is on the table"',
];
