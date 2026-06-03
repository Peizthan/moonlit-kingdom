export interface WeddingCouple {
  partner1: string;
  partner2: string;
  weddingDate: string;
  location: string;
  version: string;
  lastUpdated: string;
}

export interface VenueDetails {
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  indoorOutdoor: string;
  description: string;
  coordinator: string;
  coordinatorEmail: string;
  coordinatorPhone: string;
  website?: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  responsible?: string;
  category: 'ceremony' | 'reception' | 'preparation' | 'logistics' | 'entertainment';
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: 'primary' | 'accent' | 'neutral';
  description: string;
}

export interface FloralCategory {
  area: string;
  description: string;
  flowers: string[];
  foliage: string[];
  notes?: string;
}

export interface MenuCourse {
  course: string;
  options: MenuOption[];
  dietaryNotes?: string;
}

export interface MenuOption {
  name: string;
  description: string;
  dietary?: string[];
}

export interface BudgetCategory {
  id: string;
  category: string;
  subcategory?: string;
  estimated: number;
  actual?: number;
  deposit?: number;
  depositPaid?: boolean;
  vendor?: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'enquiry' | 'paid';
}

export interface Vendor {
  id: string;
  role: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  website?: string;
  status: 'confirmed' | 'booked' | 'enquiry' | 'declined';
  contractSigned: boolean;
  depositPaid: boolean;
  notes?: string;
}

export interface ActionItem {
  id: string;
  title: string;
  description?: string;
  owner: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'complete' | 'in-progress' | 'not-started' | 'blocked';
  category: string;
}

export interface MeetingNote {
  id: string;
  date: string;
  title: string;
  attendees: string[];
  summary: string;
  decisions: string[];
  actionItems: string[];
}

export interface Decision {
  id: string;
  date: string;
  category: string;
  decision: string;
  rationale?: string;
  decidedBy: string;
  status: 'final' | 'provisional' | 'under-review';
}

export interface RiskItem {
  id: string;
  risk: string;
  category: string;
  likelihood: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  mitigation: string;
  owner: string;
  status: 'open' | 'mitigated' | 'closed';
}

export interface SeatingTable {
  id: string;
  tableName: string;
  tableNumber: number;
  capacity: number;
  guests: string[];
  notes?: string;
}

export interface LightingScene {
  id: string;
  area: string;
  scene: string;
  description: string;
  colorTemp?: string;
  intensity?: string;
  equipment?: string[];
  timing?: string;
}

export interface TechnicalItem {
  id: string;
  category: string;
  item: string;
  quantity: number;
  supplier?: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'tbc';
}

export interface WeddingData {
  couple: WeddingCouple;
  story: {
    howWeMet: string;
    proposal: string;
    vision: string;
    moodKeywords: string[];
  };
  venue: VenueDetails;
  colorPalette: ColorSwatch[];
  florals: FloralCategory[];
  timeline: TimelineEvent[];
  menu: MenuCourse[];
  budget: BudgetCategory[];
  vendors: Vendor[];
  actionItems: ActionItem[];
  meetingNotes: MeetingNote[];
  decisions: Decision[];
  risks: RiskItem[];
  seating: SeatingTable[];
  lighting: LightingScene[];
  technical: TechnicalItem[];
}
