// Maps skill icon keys to devicon CSS class names
const iconClassMap = {
  powerbi: 'devicon-powerbi-plain colored',
  tableau: 'devicon-graphql-plain colored',
  talend: 'devicon-apachekafka-original',
  grafana: 'devicon-grafana-original colored',
  ssis: 'devicon-microsoftsqlserver-plain colored',
  sap: 'devicon-salesforce-plain colored',
  python: 'devicon-python-plain colored',
  sql: 'devicon-azuresqldatabase-plain colored',
  java: 'devicon-java-plain colored',
  c: 'devicon-cplusplus-plain colored',
  abap: 'devicon-sap-plain',
  laravel: 'devicon-laravel-original colored',
  vuejs: 'devicon-vuejs-plain colored',
  angular: 'devicon-angularjs-plain colored',
  symfony: 'devicon-symfony-original',
  spring: 'devicon-spring-plain colored',
  dotnet: 'devicon-dot-net-plain colored',
  php: 'devicon-php-plain colored',
  mysql: 'devicon-mysql-plain colored',
  postgresql: 'devicon-postgresql-plain colored',
  sqlserver: 'devicon-microsoftsqlserver-plain colored',
  oracle: 'devicon-oracle-original colored',
  mongodb: 'devicon-mongodb-plain colored',
  scikitlearn: 'devicon-scikitlearn-plain colored',
  tensorflow: 'devicon-tensorflow-original colored',
  keras: 'devicon-keras-plain colored',
  docker: 'devicon-docker-plain colored',
  azure: 'devicon-azure-plain colored',
  git: 'devicon-git-plain colored',
  jenkins: 'devicon-jenkins-line colored',
  mariadb: 'devicon-mariadb-original colored',
  linux: 'devicon-linux-plain',
  react: 'devicon-react-original colored',
  javascript: 'devicon-javascript-plain colored',
};

export default function TechIcon({ iconKey, size = 18, className = '' }) {
  const devClass = iconClassMap[iconKey];
  if (devClass) {
    return <i className={`${devClass} ${className}`} style={{ fontSize: size }} />;
  }
  // Fallback: colored circle with first letter
  return (
    <span
      className={`inline-flex items-center justify-center rounded bg-white/10 text-[10px] font-bold text-blue-300 ${className}`}
      style={{ width: size, height: size }}
    >
      {(iconKey || '?')[0].toUpperCase()}
    </span>
  );
}

// Tech badge with icon for use in project/experience cards
export function TechBadge({ name, iconKey }) {
  const devClass = iconClassMap[iconKey];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5
                     border border-white/8 text-xs text-white/60 hover:bg-white/10
                     hover:border-blue-500/20 transition-all duration-200">
      {devClass ? (
        <i className={devClass} style={{ fontSize: 13 }} />
      ) : null}
      {name}
    </span>
  );
}

// Map tech name strings to iconKey
export const techNameToIcon = {
  'Power BI': 'powerbi',
  'Tableau': 'tableau',
  'Talend': 'talend',
  'Grafana': 'grafana',
  'Python': 'python',
  'SQL': 'sql',
  'Java': 'java',
  'Laravel': 'laravel',
  'Laravel 11': 'laravel',
  'Vue.js': 'vuejs',
  'Angular': 'angular',
  'Symfony': 'symfony',
  'Symfony 5': 'symfony',
  'Spring Boot': 'spring',
  '.NET': 'dotnet',
  'PHP': 'php',
  'MySQL': 'mysql',
  'PostgreSQL': 'postgresql',
  'SQL Server': 'sqlserver',
  'Oracle': 'oracle',
  'MongoDB': 'mongodb',
  'MariaDB': 'mariadb',
  'Docker': 'docker',
  'Azure': 'azure',
  'Git': 'git',
  'Jenkins': 'jenkins',
  'Linux': 'linux',
  'Scikit-learn': 'scikitlearn',
  'TensorFlow': 'tensorflow',
  'Keras': 'keras',
  'React': 'react',
  'JavaScript': 'javascript',
  'REST API': 'spring',
  'WebSocket': 'javascript',
  'LDAP': null,
  'Knowage': null,
  'Zammad': null,
  'Codename One': 'java',
  'JavaFX': 'java',
  'XAMPP': 'php',
  'Pandas': 'python',
  'DAX': 'powerbi',
  'Data Warehouse': 'sql',
  'Star Schema': 'sql',
};
