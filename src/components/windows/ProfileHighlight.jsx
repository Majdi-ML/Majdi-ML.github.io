import React from 'react';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { profile, experiences } from '../../data/profile';
import './ProfileHighlight.css';

const ProfileHighlightComponent = () => {
  const currentJob = experiences[0];

  return (
    <div className="pc-card-wrapper">
      <div className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            {/* Main Content */}
            <div className="pc-content pc-profile-content">
              {/* Photo Section */}
              <div className="pc-photo-section">
                <div className="pc-avatar-wrapper">
                  <img
                    className="pc-avatar"
                    src={profile.photo}
                    alt={profile.name}
                    loading="lazy"
                  />
                  <div className="pc-status-indicator" />
                </div>
                
                <h1 className="pc-name">{profile.name}</h1>
                <p className="pc-title">{profile.title}</p>
              </div>

              {/* Current Job */}
              <div className="pc-job-section">
                <div className="pc-job-label">Poste Actuel</div>
                
                <div className="pc-job-card">
                  <h3 className="pc-job-role">{currentJob.role}</h3>
                  
                  <div className="pc-job-details">
                    <div className="pc-job-detail">
                      <Building2 className="pc-icon" size={18} />
                      <span>{currentJob.company}</span>
                    </div>
                    <div className="pc-job-detail">
                      <MapPin className="pc-icon" size={18} />
                      <span>{currentJob.location}</span>
                    </div>
                    <div className="pc-job-detail">
                      <Calendar className="pc-icon" size={18} />
                      <span>{currentJob.period}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pc-highlights">
                    {currentJob.highlights.map((highlight, idx) => (
                      <span key={idx} className="pc-badge">
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="pc-tech-stack">
                    {currentJob.tech.slice(0, 8).map((tech, idx) => (
                      <span key={idx} className="pc-tech">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProfileHighlight = React.memo(ProfileHighlightComponent);
export default ProfileHighlight;