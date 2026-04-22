export interface Criterion {
  id: string;
  category: 'Financial' | 'Technical' | 'Compliance';
  description: string;
  requirement: string;
  isMandatory: boolean;
  status: 'Pass' | 'Fail' | 'Needs Review';
  extractedValue?: string;
  sourceSnippet?: string;
  confidenceScore?: number;
}

export interface Bidder {
  id: string;
  name: string;
  criteria: Record<string, Criterion>;
  overallStatus: 'Pass' | 'Fail' | 'Needs Review';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

export const MOCK_CRITERIA_EXTRACTION = [
  {
    id: 'crit_1',
    category: 'Financial',
    description: 'Minimum Annual Turnover',
    requirement: '₹5 Crore in last 3 financial years',
    isMandatory: true,
  },
  {
    id: 'crit_2',
    category: 'Technical',
    description: 'Similar Projects',
    requirement: 'At least 3 similar projects completed in last 5 years',
    isMandatory: true,
  },
  {
    id: 'crit_3',
    category: 'Compliance',
    description: 'GST Registration',
    requirement: 'Valid GST registration certificate',
    isMandatory: true,
  },
  {
    id: 'crit_4',
    category: 'Compliance',
    description: 'ISO Certification',
    requirement: 'ISO 9001:2015 certification',
    isMandatory: true,
  },
];

export const MOCK_BIDDERS: Bidder[] = [
  {
    id: 'bid_1',
    name: 'Apex Infrastructure Pvt Ltd',
    overallStatus: 'Pass',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹6.2 Crore', confidenceScore: 0.98 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '4 Projects', confidenceScore: 0.95 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_2',
    name: 'Bharat Steel Works',
    overallStatus: 'Needs Review',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Needs Review', extractedValue: 'Not Clearly Legible', confidenceScore: 0.42 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '3 Projects', confidenceScore: 0.88 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_3',
    name: 'City Buildcon',
    overallStatus: 'Fail',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Fail', extractedValue: '₹3.8 Crore', confidenceScore: 0.96 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '5 Projects', confidenceScore: 0.92 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_4',
    name: 'Dynamic Engineering',
    overallStatus: 'Pass',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹12.4 Crore', confidenceScore: 0.99 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '6 Projects', confidenceScore: 0.97 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.98 },
    },
  },
  {
    id: 'bid_5',
    name: 'East-West Infra',
    overallStatus: 'Pass',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹5.1 Crore', confidenceScore: 0.89 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '3 Projects', confidenceScore: 0.91 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_6',
    name: 'Falcon Constructions',
    overallStatus: 'Needs Review',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹7.8 Crore', confidenceScore: 0.95 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Needs Review', extractedValue: 'Ambiguous completion dates', confidenceScore: 0.55 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_7',
    name: 'Global Builders',
    overallStatus: 'Pass',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹9.2 Crore', confidenceScore: 0.98 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '4 Projects', confidenceScore: 0.94 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_8',
    name: 'Heritage Foundations',
    overallStatus: 'Fail',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹6.5 Crore', confidenceScore: 0.97 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Fail', extractedValue: '2 Projects', confidenceScore: 0.99 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_9',
    name: 'Indus Valley Infra',
    overallStatus: 'Pass',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹5.9 Crore', confidenceScore: 0.96 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '3 Projects', confidenceScore: 0.93 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
  {
    id: 'bid_10',
    name: 'Jupiter Structures',
    overallStatus: 'Pass',
    criteria: {
      crit_1: { id: 'crit_1', category: 'Financial', description: 'Turnover', requirement: '₹5Cr', isMandatory: true, status: 'Pass', extractedValue: '₹15.0 Crore', confidenceScore: 0.99 },
      crit_2: { id: 'crit_2', category: 'Technical', description: 'Projects', requirement: '3 Projects', isMandatory: true, status: 'Pass', extractedValue: '8 Projects', confidenceScore: 0.98 },
      crit_3: { id: 'crit_3', category: 'Compliance', description: 'GST', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.99 },
      crit_4: { id: 'crit_4', category: 'Compliance', description: 'ISO', requirement: 'Valid', isMandatory: true, status: 'Pass', extractedValue: 'Verified', confidenceScore: 0.97 },
    },
  },
];


export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: '1', timestamp: '2026-04-19 10:15:00', action: 'System Verification', user: 'Gemini-1.5-Pro', details: 'Automatically verified Bidder 1 GST Registration.' },
  { id: '2', timestamp: '2026-04-19 10:20:00', action: 'System Flag', user: 'Gemini-1.5-Pro', details: 'Flagged Bidder 2 Turnover criteria for Manual Review (Low confidence).' },
  { id: '3', timestamp: '2026-04-19 11:05:00', action: 'Manual Override', user: 'Officer Smith', details: 'Manually approved Turnover for Bidder 7. Reason: Document verified against physical copy.' },
  { id: '4', timestamp: '2026-04-19 11:30:00', action: 'Export', user: 'Officer Smith', details: 'Exported preliminary evaluation report to PDF.' },
];
