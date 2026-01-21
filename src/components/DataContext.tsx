// DataContext.tsx
import { createContext, useContext } from 'react';

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
}

export interface PortfolioData {
    name: string;
    about: string;
    featuredProjects: string[];
    experience: ExperienceItem[];
    education: string[];
    licenses: string[];
    projects: string[];
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
}

const defaultData: PortfolioData = {
    name: 'Muhammad Mateen',
    about: 'Software engineer with specialty in product development looking to join an organization where strong project management and analytical skills will be useful in the delivery of products which meet user needs.\n\n8+ years of professional experience in Mobile Apps Development, specializing in Hybrid Mobile Applications using Flutter with Dart. Experienced in CI/CD processes (Codemagic, Bitrise, Fastlane) and end-to-end implementation of Android, Joget Workflow, and NodeJS.',
    featuredProjects: [
        'Aware App',
        'Jaxon - eSports News',
        'Teleportal',
        'Expensense Pro',
    ],
    experience: [
        {
            role: 'Senior Mobile Engineer',
            company: 'Aware GmbH',
            duration: 'August 2023 - Present',
            description: 'Building new features and upgrading the app’s architecture layer as a senior developer.',
            highlights: [
                'Proposing and demonstrating ideas for product improvement through demos.',
                'Playing an integral part in app development and release management.',
                'Collaborating with the team to enhance the mobile user experience.',
            ],
        },
        {
            role: 'Software Engineer',
            company: 'Upday (Axel-Springer)',
            duration: 'January 2022 - January 2023',
            description: 'Handled pre-released applications and implemented advanced image processing features.',
            highlights: [
                'Implemented image processing using generic and reusable code.',
                'Actively involved in design and architectural discussions from day one.',
                'Optimized app performance and stability for a large user base.',
            ],
        },
        {
            role: 'Senior Mobile App Developer',
            company: 'Airasia (TELEPORT)',
            duration: 'July 2019 - December 2021',
            description: 'Developed real-time business model solutions and reshaped functional requirements.',
            highlights: [
                'Implemented real-time GPS tracking for First Miles, A2A, and Last Miles logistics.',
                'Reshaped business models into high-performance mobile application components.',
                'Managed technical documentation and execution of test plans.',
            ],
        },
        {
            role: 'Software Engineer',
            company: 'Open Dynamics SDN BHD',
            duration: 'January 2018 - July 2019',
            description: 'Responsible for end-to-end Android development and back-end API integration.',
            highlights: [
                'Designed and developed Android applications and custom plugins.',
                'Built and maintained RESTful back-end APIs.',
                'Conducted extensive debugging and performance testing.',
            ],
        },
        {
            role: 'Android Developer',
            company: 'On2Sol (PVT) LTD.',
            duration: 'May 2016 - December 2017',
            description: 'Worked on Android and IoT development, integrating medical devices with real-time databases.',
            highlights: [
                'Configured medical devices to send vitals and sensor data to Firebase and IBM Bluemix.',
                'Integrated IBM Watson IoT platform for advanced data processing.',
                'Converted and optimized code snippets from Objective-C to Android Java.',
            ],
        },
        {
            role: 'Android Developer (Internee)',
            company: 'Veiliux (Pvt) LTD.',
            duration: 'March 2016 - May 2016',
            description: 'Assisted in API implementations and front-end designing for Android apps.',
            highlights: [
                'Contributed to UI/UX design and front-end development.',
                'Learned and implemented core Android API integrations.',
            ],
        },
    ],
    education: [
        'BS Software Engineering, University of Management and Technology Lahore (2012-2016)',
        'Higher Secondary Education, Govt Degree college Layyah (2010-2012)',
        'SSC, Muslim Science Public High School Kot Sultan (2007-2009)',
    ],
    licenses: [
        'ReactJS Fundamental Course - Udemy',
        'Joget Workflow v6 Certification - Joget.Inc',
        'Developing a Competition Strategy - Kashf Foundation',
        'Assessing Market Opportunities - Kashf Foundation',
    ],
    projects: [
        'Aware (Flutter/iOS/Android) - aware.app',
        'Peachee (Flutter/iOS/Android) - peachee.com',
        'Teleportal logistics platform',
        'e-Pelabuhan (Port Management System)',
        'Expensense Pro (Personal Finance Manager)',
        'Remote Health Monitoring System (Vitals Tracking)',
        'Pass (Social Search & Dating App)',
        'SAS (Smart Attendance System via Geofencing)',
    ],
    skills: [
        'Flutter', 'Dart', 'Android', 'Kotlin', 'Java', 'Node.js', 'JavaScript', 'ES6', 'PHP', 'C++',
        'Redux', 'BLoC', 'GetX', 'VIPER', 'NodeJS', 'Express.js', 'Laravel', 'Firebase', 'PostgreSQL', 'MongoDB',
        'CI/CD', 'Codemagic', 'Bitrise', 'Fastlane', 'Cloud Messaging', 'GPS Tracking', 'Rest Services',
    ],
    recommendations: [
        {
            name: "Team Lead at Aware",
            text: "Muhammad is an exceptional mobile engineer. His deep knowledge of Flutter and proactive approach to problem-solving made him an invaluable asset to our team. He consistently delivered high-quality features while improving our overall architecture."
        },
        {
            name: "Senior Architect at Upday",
            text: "Working with Mateen was a pleasure. He has a keen eye for performance and a solid understanding of mobile application design. His implementation of the image processing modules was both clean and highly efficient."
        },
        {
            name: "Product Manager at Airasia",
            text: "Mateen is a dedicated developer who truly understands business needs. He ofter goes above and beyond to ensure that technical implementations align perfectly with functional requirements, especially in complex areas like real-time GPS tracking."
        }
    ],
    publications: [
        'Specialized in real-time tracking systems and logistics apps.',
        'Expertise in IoT integration with mobile platforms.',
    ],
    languages: [
        'English', 'Urdu', 'German (Basic)',
    ],
    links: {
        linkedin: 'https://www.linkedin.com/in/muhammadmateen027/',
        github: 'https://github.com/muhammadmateen027',
        email: 'muhammadmateen027@gmail.com',
        address: 'Berlin, Germany',
    },
    profilePicture: 'https://media.licdn.com/dms/image/D4E03AQE-W_G9_9_9-A/profile-displayphoto-shrink_800_800/0/1691585433120?e=1710374400&v=beta&t=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
};

export const DataContext = createContext<PortfolioData>(defaultData);
export const usePortfolioData = () => useContext(DataContext);
