import majdiPhoto from '../assets/majdi.png';

export const profile = {
  name: 'Majdi Melliti',
  title: 'Data Analytics & BI Engineer',
  tagline: 'Translating business needs into decision-making solutions',
  bio: 'IT Engineer specializing in Data Analytics and Business Intelligence with 1+ year of experience. Expert in translating business needs into decision-making solutions (KPIs, dashboards, ETL). Proficient in Agile/Scrum, backlog management and delivery. Reduced reporting time by 40% and automated 100% of data collection at Ooredoo.',
  email: 'Majdi.Melliti@esprit.tn',
  phone: '+216 92 52 44 35',
  location: 'La Soukra, Ariana — Tunisia',
  linkedin: 'https://linkedin.com/in/majdi-melliti',
  github: 'https://github.com/Majdi-ML',
  photo: majdiPhoto,
};

export const kpis = [
  { label: 'BI Projects', value: 12, icon: 'BarChart3', suffix: '+' },
  { label: 'Dashboards Built', value: 20, icon: 'LayoutDashboard', suffix: '+' },
  { label: 'Technologies', value: 30, icon: 'Cpu', suffix: '+' },
  { label: 'Experiences', value: 5, icon: 'Building2', suffix: '' },
];

export const skills = [
  // Data & BI
  { name: 'Power BI', level: 95, category: 'Data & BI', icon: 'powerbi' },
  { name: 'Tableau', level: 85, category: 'Data & BI', icon: 'tableau' },
  { name: 'Talend', level: 90, category: 'Data & BI', icon: 'talend' },
  { name: 'Grafana', level: 70, category: 'Data & BI', icon: 'grafana' },
  { name: 'SSIS/SSAS/SSRS', level: 75, category: 'Data & BI', icon: 'ssis' },
  { name: 'SAP BW', level: 65, category: 'Data & BI', icon: 'sap' },
  // Programming
  { name: 'Python', level: 92, category: 'Programming', icon: 'python' },
  { name: 'SQL', level: 93, category: 'Programming', icon: 'sql' },
  { name: 'Java', level: 75, category: 'Programming', icon: 'java' },
  { name: 'C/C++', level: 70, category: 'Programming', icon: 'c' },
  { name: 'ABAP', level: 60, category: 'Programming', icon: 'abap' },
  // Web
  { name: 'Laravel', level: 85, category: 'Web', icon: 'laravel' },
  { name: 'Vue.js', level: 80, category: 'Web', icon: 'vuejs' },
  { name: 'Angular', level: 78, category: 'Web', icon: 'angular' },
  { name: 'Symfony', level: 82, category: 'Web', icon: 'symfony' },
  { name: 'Spring Boot', level: 68, category: 'Web', icon: 'spring' },
  { name: '.NET', level: 65, category: 'Web', icon: 'dotnet' },
  { name: 'PHP', level: 80, category: 'Web', icon: 'php' },
  // Databases
  { name: 'MySQL', level: 90, category: 'Databases', icon: 'mysql' },
  { name: 'PostgreSQL', level: 88, category: 'Databases', icon: 'postgresql' },
  { name: 'SQL Server', level: 85, category: 'Databases', icon: 'sqlserver' },
  { name: 'Oracle', level: 72, category: 'Databases', icon: 'oracle' },
  { name: 'MongoDB', level: 70, category: 'Databases', icon: 'mongodb' },
  // ML & AI
  { name: 'Scikit-learn', level: 78, category: 'ML & AI', icon: 'scikitlearn' },
  { name: 'TensorFlow', level: 68, category: 'ML & AI', icon: 'tensorflow' },
  { name: 'Keras', level: 65, category: 'ML & AI', icon: 'keras' },
  // DevOps
  { name: 'Docker', level: 75, category: 'DevOps', icon: 'docker' },
  { name: 'Azure', level: 72, category: 'DevOps', icon: 'azure' },
  { name: 'Git', level: 88, category: 'DevOps', icon: 'git' },
  { name: 'Jenkins', level: 65, category: 'DevOps', icon: 'jenkins' },
];

export const experiences = [
  {
    id: 1,
    role: 'IT Engineer — Data Analytics',
    company: 'Ulmus Technologie',
    location: 'Tunisia (On-site)',
    period: 'Nov 2025 – Present',
    description: 'Analyzed business requirements and translated them into 15+ KPIs for 3 operational departments. Collected, cleaned and transformed data (ETL) on datasets of 200,000+ rows. Designed and maintained decision-support databases. Developed Python automation scripts reducing manual processing by 60%. Created 8 interactive dashboards (Power BI, Tableau) for decision-making support. Validated data quality and ran BI functional tests — anomalies reduced by 35%.',
    tech: ['Python', 'SQL', 'Power BI', 'Tableau', 'PostgreSQL', 'MySQL', 'REST API', 'Git'],
    type: 'full-time',
    highlights: ['15+ KPIs', '200K+ rows', '60% automation', '8 dashboards'],
  },
  {
    id: 2,
    role: 'Business Analyst & Data Engineer',
    company: 'Ooredoo Tunisia',
    location: 'Tunisia',
    period: 'Jan – Jul 2025',
    description: 'Graduation Project — Collaborated with 4 business teams to define network supervision requirements. Designed an application automating 100% of data collection, reducing reporting by 40%. Automated rule processing via Talend (ETL) — 500+ rules migrated. Integrated a chatbot connected to the database for natural language queries. Built a reporting module with dynamic Power BI dashboards.',
    tech: ['Python', 'Talend', 'Power BI', 'Laravel 11', 'Vue.js', 'MySQL', 'WebSocket'],
    type: 'graduation project',
    highlights: ['100% automation', '40% time reduction', '500+ rules'],
  },
  {
    id: 3,
    role: 'Intern — Data Specialist',
    company: 'Ooredoo Tunisia',
    location: 'Tunisia',
    period: 'Jul – Sep 2024',
    description: 'Analyzed authentication incidents and migrated 50+ users to Active Directory. Performed functional qualification of automated Talend jobs on Linux. Deployed the site, database and Talend jobs to production server.',
    tech: ['Symfony 5', 'LDAP', 'MariaDB', 'Talend', 'Linux'],
    type: 'internship',
    highlights: ['50+ users migrated', 'Production deployment'],
  },
  {
    id: 4,
    role: 'Intern — BI Analyst / Data Analytics',
    company: 'Smartup',
    location: 'Tunisia',
    period: 'Jun – Jul 2024',
    description: 'Designed a Data Warehouse by analyzing data flows (100k+ rows). Cleaned and transformed the Zammad database using Talend. Created 3 interactive dashboards by role (manager, validator, consultant).',
    tech: ['Talend', 'PostgreSQL', 'Knowage', 'Zammad'],
    type: 'internship',
    highlights: ['100K+ rows', '3 dashboards'],
  },
  {
    id: 5,
    role: 'Intern — Data & Automation',
    company: 'Ooredoo Tunisia',
    location: 'Tunisia',
    period: 'Jul – Aug 2023',
    description: 'Digitalized manual Excel processes into a centralized web application. Centralized and imported files into a database — 1,000+ files processed. Generated dynamic dashboards by department and monitoring type.',
    tech: ['Symfony', 'PHP', 'MySQL', 'Power BI'],
    type: 'internship',
    highlights: ['1,000+ files processed'],
  },
];

export const education = [
  {
    degree: 'Master 1 — MDSI',
    school: 'ESPRIT Business School',
    period: '2025 – 2026',
  },
  {
    degree: 'Engineering Degree in IT',
    school: 'ESPRIT, Tunisia — Major: BI',
    period: '2020 – 2025',
  },
  {
    degree: 'Baccalaureate in Mathematics',
    school: 'Tunisia',
    period: 'June 2020',
  },
];

export const projects = [
  {
    id: 1,
    title: 'Network Supervision Platform',
    description: 'Full-scale application at Ooredoo automating 100% of data collection, with ETL via Talend (500+ rules), chatbot integration, and dynamic Power BI reporting module. Reduced reporting time by 40%.',
    tech: ['Python', 'Talend', 'Power BI', 'Laravel 11', 'Vue.js', 'MySQL'],
    category: 'Data Engineering',
    image: null,
  },
  {
    id: 2,
    title: 'HR Platform — Predictive Management',
    description: 'Translated HR challenges into KPIs and predictive turnover models. Developed ML models in Python (Scikit-learn) with 87% accuracy. Built a complete ETL pipeline with Talend and Angular UI with embedded Power BI dashboards.',
    tech: ['Python', 'Scikit-learn', 'SQL Server', 'Talend', 'Power BI', 'Angular'],
    category: 'Data Science',
    image: null,
  },
  {
    id: 3,
    title: 'Telecom KPI Dashboards',
    description: '8 interactive Power BI and Tableau dashboards at Ulmus Technologie tracking KPIs for 3 operational departments. ETL on 200,000+ rows with Python automation reducing manual processing by 60%.',
    tech: ['Power BI', 'Tableau', 'Python', 'PostgreSQL', 'SQL'],
    category: 'BI',
    image: null,
  },
  {
    id: 4,
    title: 'Smartup Data Warehouse',
    description: 'Designed a Data Warehouse analyzing data flows of 100k+ rows from Zammad. ETL with Talend and 3 role-based interactive dashboards (manager, validator, consultant) using Knowage.',
    tech: ['Talend', 'PostgreSQL', 'Knowage', 'Zammad'],
    category: 'Data Engineering',
    image: null,
  },
  {
    id: 5,
    title: 'Multi-platform E-commerce App',
    description: 'Developed a multi-platform application (Web, Mobile, Desktop) with full data synchronization. Led the project from design to compliance testing on each environment.',
    tech: ['Symfony 5', 'Codename One', 'JavaFX', 'XAMPP'],
    category: 'Web App',
    image: null,
  },
  {
    id: 6,
    title: 'Ooredoo Excel Digitalization',
    description: 'Digitalized manual Excel processes into a centralized web application. Centralized 1,000+ files into a database with dynamic dashboards by department and monitoring type.',
    tech: ['Symfony', 'PHP', 'MySQL', 'Power BI'],
    category: 'Web App',
    image: null,
  },
];

export const languages = [
  { name: 'French', level: 'Professional (B2)' },
  { name: 'English', level: 'Professional (B2)' },
  { name: 'Arabic', level: 'Native' },
];

export const softSkills = [
  'Leadership & Communication',
  'Problem Solving',
  'Analytical & Synthesis Mindset',
  'Rigor & Software Quality',
  'Multicultural Teamwork',
];

export const activities = [
  'Tunivisions ESPRIT — Sponsoring',
  'ACMD Club — Head of Sponsoring',
  'IEEE Sb ESPRIT — Active Member',
  'Karate — Black Belt 🥋',
];
