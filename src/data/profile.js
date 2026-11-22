import majdiPhoto from '../assets/majdi.webp';

export const profile = {
  name: 'Majdi Melliti',
  title: 'Data & Business Intelligence Analyst',
  tagline: 'SQL · Power BI · ETL · Agile — turning business needs into decision-support solutions',
  bio: 'Computer engineer specialised in Data Analytics and Business Intelligence. Skilled at translating business needs into decision-support solutions: KPIs, interactive dashboards, ETL pipelines. Proficient in Power BI, Tableau, Talend and Python for automation. Agile/Scrum methodology, backlog management and delivery.',
  website: 'https://mellitimajdi.me',
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
  { label: 'Experiences', value: 6, icon: 'Building2', suffix: '' },
];

export const skills = [
  // Data & BI
  { name: 'Power BI', level: 95, category: 'Data & BI', icon: 'powerbi' },
  { name: 'Tableau', level: 85, category: 'Data & BI', icon: 'tableau' },
  { name: 'Talend', level: 90, category: 'Data & BI', icon: 'talend' },
  { name: 'Grafana', level: 70, category: 'Data & BI', icon: 'grafana' },
  { name: 'SSIS/SSAS/SSRS', level: 75, category: 'Data & BI', icon: 'ssis' },
  { name: 'Knowage', level: 70, category: 'Data & BI', icon: 'knowage' },
  { name: 'SAP BW', level: 65, category: 'Data & BI', icon: 'sap' },
  // Programming
  { name: 'Python', level: 92, category: 'Programming', icon: 'python' },
  { name: 'SQL', level: 93, category: 'Programming', icon: 'sql' },
  { name: 'Java', level: 75, category: 'Programming', icon: 'java' },
  { name: 'C/C++', level: 70, category: 'Programming', icon: 'c' },
  { name: 'Shell', level: 72, category: 'Programming', icon: 'linux' },
  { name: 'Pandas / NumPy', level: 90, category: 'Programming', icon: 'python' },
  { name: 'ABAP', level: 60, category: 'Programming', icon: 'abap' },
  // Web
  { name: 'REST API', level: 88, category: 'Web', icon: 'rest' },
  { name: 'FastAPI', level: 78, category: 'Web', icon: 'fastapi' },
  { name: 'Flask', level: 78, category: 'Web', icon: 'flask' },
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
  { name: 'MariaDB', level: 80, category: 'Databases', icon: 'mariadb' },
  // ML & AI
  { name: 'Scikit-learn', level: 78, category: 'ML & AI', icon: 'scikitlearn' },
  { name: 'TensorFlow', level: 68, category: 'ML & AI', icon: 'tensorflow' },
  { name: 'Keras', level: 65, category: 'ML & AI', icon: 'keras' },
  { name: 'MLOps / MLflow', level: 65, category: 'ML & AI', icon: 'mlflow' },
  // DevOps
  { name: 'Docker', level: 75, category: 'DevOps', icon: 'docker' },
  { name: 'Azure', level: 72, category: 'DevOps', icon: 'azure' },
  { name: 'Git', level: 88, category: 'DevOps', icon: 'git' },
  { name: 'Jenkins', level: 65, category: 'DevOps', icon: 'jenkins' },
  { name: 'Kubernetes', level: 60, category: 'DevOps', icon: 'kubernetes' },
  { name: 'CI/CD', level: 75, category: 'DevOps', icon: 'git' },
  { name: 'Jira', level: 85, category: 'DevOps', icon: 'jira' },
];

export const experiences = [
  {
    id: 0,
    role: 'Workflow Automation & Integration Developer',
    company: 'Diyar United Company',
    location: 'Tunisia',
    period: 'May 2026 – Present',
    description: 'Development and maintenance of workflow automation solutions for internal operations. Enterprise systems integration and support for data and process synchronisation. Workflow monitoring and resolution of technical incidents and integration issues. Involvement in deployment, testing and production support activities. Collaboration with technical teams to optimise operational processes and system performance.',
    tech: ['Python', 'REST API', 'SQL', 'ETL', 'CI/CD', 'Git', 'Workflow Automation'],
    type: 'full-time',
    highlights: ['Workflow automation', 'Systems integration', 'Production support'],
  },
  {
    id: 1,
    role: 'IT Engineer — Data Analytics & Automation',
    company: 'Ulmus Technologie',
    location: 'Tunisia',
    period: 'Apr 2025 – Apr 2026',
    description: 'Business requirements analysis translated into 15+ KPIs across 3 departments. ETL on datasets of 200,000+ rows — MySQL / PostgreSQL analytical databases. Python automation scripts — manual processing reduced by 60%. 8 interactive dashboards (Power BI, Tableau) supporting decision-making. Data quality validation — anomalies reduced by 35%. User stories and functional specifications in Agile Scrum.',
    tech: ['Python', 'SQL', 'Power BI', 'Tableau', 'PostgreSQL', 'MySQL', 'REST API', 'Git'],
    type: 'full-time',
    highlights: ['15+ KPIs', '200K+ rows', '60% automation', '8 dashboards', '-35% anomalies'],
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
    degree: 'Computer Engineering Degree',
    school: 'ESPRIT, Tunisia — BI major',
    period: '2020 – 2025',
  },
  {
    degree: 'High School Diploma (Baccalaureate) — Mathematics',
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
  'Translating business needs into KPIs',
  'Analytical thinking & problem solving',
  'Stakeholder communication',
  'Agile/Scrum & backlog management',
  'Rigour & data quality',
];

export const activities = [
  'ACMD Club — Sponsoring Lead',
  'IEEE Sb ESPRIT — Active Member',
  'Karate — Black Belt 🥋',
];

export const certificationsPdf = '/Majdi_Melliti_CERTIFS.pdf';

export const certifications = [
  {
    category: 'Artificial Intelligence & ML',
    items: [
      { title: 'Building Transformer-Based NLP Applications', issuer: 'NVIDIA', date: 'Nov 2024', page: 2, image: '/certs/nvidia-transformer-nlp.webp', url: 'https://learn.nvidia.com/certificates?id=pyd8NLt7TBCJIZA2OBpDBQ' },
      { title: 'Applications of AI for Anomaly Detection', issuer: 'NVIDIA', date: 'Oct 2024', page: 3, image: '/certs/nvidia-anomaly-detection.webp', url: 'https://learn.nvidia.com/certificates?id=4HPPtWOXRKG0RZBVLdh7Iw' },
    ],
  },
  {
    category: 'Programming & Data Science',
    items: [
      { title: 'Python Essentials 1', issuer: 'Cisco / Python Institute', date: 'Sep 2024', page: 1, image: '/certs/cisco-python-essentials-1.webp' },
      { title: 'Introduction to Data Science', issuer: 'Cisco Networking Academy', date: 'Sep 2024', page: 12, image: '/certs/cisco-intro-data-science.webp' },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      { title: 'Microsoft Azure Management Tools & Security Solutions', issuer: 'Microsoft / Coursera', date: 'Nov 2024', url: 'https://coursera.org/verify/RHEQ331OJI14', page: 4, image: '/certs/coursera-azure-management-security.webp' },
      { title: 'Introduction to Microsoft Azure Cloud Services', issuer: 'Microsoft / Coursera', date: 'Nov 2024', url: 'https://coursera.org/verify/OPOFXIKIA3GZ', page: 6, image: '/certs/coursera-azure-cloud-services.webp' },
    ],
  },
  {
    category: 'Cybersecurity',
    items: [
      { title: 'Ethical Hacker', issuer: 'Cisco Networking Academy', date: 'Oct 2024', page: 10, image: '/certs/cisco-ethical-hacker.webp' },
      { title: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: 'Aug 2024', page: 11, image: '/certs/cisco-intro-cybersecurity.webp' },
    ],
  },
  {
    category: 'ERP & CRM',
    items: [
      { title: 'Implementing an SAP Solution', issuer: 'SAP / Coursera', date: 'Nov 2024', url: 'https://coursera.org/verify/SIFBHOJ72GKG', page: 5, image: '/certs/coursera-sap-solution.webp' },
      { title: 'Introduction to CRM with HubSpot', issuer: 'Coursera Project Network', date: 'May 2024', url: 'https://coursera.org/verify/LP9NK4CUXHDL', page: 7, image: '/certs/coursera-hubspot-crm.webp' },
      { title: 'HubSpot: Working with a Ticketing System', issuer: 'Coursera Project Network', date: 'May 2024', url: 'https://coursera.org/verify/N5M4R354BF6F', page: 8, image: '/certs/coursera-hubspot-ticketing.webp' },
      { title: 'Introducción a CRM con HubSpot', issuer: 'Coursera Project Network', date: 'May 2024', url: 'https://coursera.org/verify/RDVM9LPNLT4S', page: 9, image: '/certs/coursera-hubspot-crm-es.webp' },
    ],
  },
];
