export type ProjectCategory = 'all' | 'deep-learning' | 'systems-dsa' | 'computer-vision';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  tags: string[];
  description: string;
  longDescription: string;
  metrics: ProjectMetric[];
  architectureDetails: string[];
  techStack: string[];
  codeSnippet: string;
  image: string;
  repoName: string;
  starsCount: number;
  featured: boolean;
}

export interface Course {
  code: string;
  title: string;
  semester: string;
  year: number;
  status: 'completed' | 'in-progress' | 'upcoming';
  score?: string;
  description: string;
  topics: string[];
  textbook: string;
}

export interface SkillItem {
  name: string;
  depth: 'Foundational' | 'Proficient' | 'Active Research';
  detail: string;
}

export interface SkillDomain {
  category: string;
  headline: string;
  items: SkillItem[];
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  type: 'Hackathon' | 'Academic' | 'Open Source' | 'Competition';
}
