// DataContext.tsx
import { createContext, useContext } from 'react';

export interface ExperienceItem {
    role: string;
    company: string;
    duration: string;
    description: string;
    highlights: string[];
}

export interface PortfolioData {
    about: string;
    featuredProjects: string[];
    experience: ExperienceItem[];
    education: string[];
    licenses: string[];
    projects: string[];
    skills: string[];
    recommendations: string[];
    publications: string[];
    languages: string[];
    links: {
        linkedin: string;
        github: string;
        email: string;
    };
    profilePicture: string; // Added field for profile picture
}

const defaultData: PortfolioData = {
    about: 'Hi, I am Jane Doe, a passionate software engineer with 8+ years of experience in building scalable web applications. I love working with modern technologies and solving real-world problems.\n\nIn my free time, I enjoy hiking, photography, and contributing to open-source projects.',
    featuredProjects: [
        'AI Chatbot Platform',
        'Portfolio Website',
        'E-commerce Dashboard',
        'Mobile Fitness App',
    ],
    experience: [
        {
            role: 'Senior Software Engineer',
            company: 'TechCorp',
            duration: '2022-Present',
            description: 'Led a team of 8 engineers to deliver a real-time analytics platform for enterprise clients.',
            highlights: [
                'Architected scalable microservices using Node.js and Kubernetes.',
                'Implemented CI/CD pipelines for faster deployments.',
                'Mentored junior engineers and conducted code reviews.',
            ],
        },
        {
            role: 'Frontend Developer',
            company: 'Webify',
            duration: '2018-2022',
            description: 'Built reusable UI components and improved performance by 30%.',
            highlights: [
                'Developed a design system in React and TypeScript.',
                'Optimized web apps for accessibility and SEO.',
                'Collaborated with designers and product managers.',
            ],
        },
        {
            role: 'Intern',
            company: 'CodeBase',
            duration: '2017-2018',
            description: 'Worked on internal tools and automation scripts.',
            highlights: [
                'Automated reporting workflows using Python.',
                'Created dashboards for business analytics.',
            ],
        },
        {
            role: 'Software Engineer',
            company: 'InnovateX',
            duration: '2015-2017',
            description: 'Developed scalable microservices for financial applications.',
            highlights: [
                'Built REST APIs for payment processing.',
                'Ensured high availability and security.',
            ],
        },
        {
            role: 'Junior Developer',
            company: 'Appify',
            duration: '2013-2015',
            description: 'Assisted in building mobile apps for local businesses.',
            highlights: [
                'Developed cross-platform apps using React Native.',
                'Supported client onboarding and training.',
            ],
        },
        {
            role: 'Freelance Web Developer',
            company: 'Self-Employed',
            duration: '2011-2013',
            description: 'Created custom websites for small startups and NGOs.',
            highlights: [
                'Designed and launched 20+ websites.',
                'Provided ongoing support and maintenance.',
            ],
        },
        {
            role: 'Teaching Assistant',
            company: 'MIT',
            duration: '2011-2012',
            description: 'Helped students with programming assignments and labs.',
            highlights: [
                'Tutored students in algorithms and data structures.',
                'Graded assignments and provided feedback.',
            ],
        },
        {
            role: 'Open Source Contributor',
            company: 'Various',
            duration: '2010-Present',
            description: 'Contributed to projects including React, Node.js, and Python libraries.',
            highlights: [
                'Submitted PRs to major open-source projects.',
                'Spoke at community meetups and conferences.',
            ],
        },
    ],
    education: [
        'MSc Computer Science, Stanford University (2015-2017)',
        'BSc Software Engineering, MIT (2011-2015)',
    ],
    licenses: [
        'AWS Certified Solutions Architect',
        'Google Cloud Professional Developer',
    ],
    projects: [
        'Open Source UI Library',
        'Personal Blog Platform',
        'Weather Forecast App',
        'Travel Photo Gallery',
    ],
    skills: [
        'React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'Python', 'Figma', 'CI/CD', 'Agile',
    ],
    recommendations: [
        '"Jane is a highly skilled engineer and a great team player." - John Smith, CTO at TechCorp',
        '"Her attention to detail and leadership are outstanding." - Emily Brown, Product Manager',
    ],
    publications: [
        '"Scaling React Apps for Millions" - JSConf 2023',
        '"Modern DevOps Practices" - Tech Journal',
    ],
    languages: [
        'English (Native)', 'Spanish (Professional)', 'French (Conversational)',
    ],
    links: {
        linkedin: 'https://linkedin.com/in/janedoe',
        github: 'https://github.com/janedoe',
        email: 'jane.doe@email.com',
    },
    profilePicture: 'https://randomuser.me/api/portraits/men/44.jpg', // Added default profile picture
};

export const DataContext = createContext<PortfolioData>(defaultData);
export const usePortfolioData = () => useContext(DataContext);
