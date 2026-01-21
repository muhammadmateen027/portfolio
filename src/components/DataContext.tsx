// DataContext.tsx
import { createContext, useContext } from 'react';

import profileData from '../data/profile.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import educationData from '../data/education.json';
import licensesData from '../data/licenses.json';
import recommendationsData from '../data/recommendations.json';
import publicationsData from '../data/publications.json';
import languagesData from '../data/languages.json';

export interface ExperienceItem {
    role: string;
    company: string;
    duration: string;
    description: string;
    highlights: string[];
}

export interface RecommendationItem {
    name: string;
    text: string;
    position?: string;
    company?: string;
}

export interface ProjectItem {
    title: string;
    description: string;
    links: string[];
}

export interface PortfolioData {
    name: string;
    about: string;
    featuredProjects: string[];
    experience: ExperienceItem[];
    education: string[];
    licenses: string[];
    projects: ProjectItem[];
    skills: string[];
    recommendations: RecommendationItem[];
    publications: string[];
    languages: string[];
    links: {
        linkedin: string;
        github: string;
        email: string;
        address: string;
    };
    profilePicture: string;
    phrases: string[];
    sectionOrder: string[];
}

const defaultData: PortfolioData = {
    ...profileData,
    experience: experienceData,
    projects: projectsData,
    skills: skillsData,
    education: educationData,
    licenses: licensesData,
    recommendations: recommendationsData,
    publications: publicationsData,
    languages: languagesData,
};

export const DataContext = createContext<PortfolioData>(defaultData);
export const usePortfolioData = () => useContext(DataContext);
