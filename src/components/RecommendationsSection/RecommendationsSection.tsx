
import { useState } from 'react';
import './RecommendationsSection.css';
import { Classifications } from '../../types';
import { getLegRecommendations, getPushRecommendations, getPullRecommendations } from '../../utils/recommendations';

interface Props {
  classifications: Classifications;
}

type TabType = 'lower-push' | 'lower-pull' | 'upper-push' | 'upper-pull';

/* ============================================
   EXERCISE VIDEO LINKS CONFIGURATION
   
   To add a new video link for an exercise:
   1. Add a new entry below with the exact exercise name as the key
   2. Provide the YouTube video URL as the value
   3. The exercise will automatically display with a video icon
      and show a popup preview on hover
   
   Example:
   'Exercise Name': 'https://www.youtube.com/watch?v=VIDEO_ID',
   ============================================ */
const EXERCISE_VIDEO_LINKS: Record<string, string> = {
  'Meadows Row': 'https://www.youtube.com/watch?v=sRRQgK8Fm44',
  // Add more exercise videos here following the same pattern:
  // 'Exercise Name': 'https://www.youtube.com/watch?v=VIDEO_ID',
};

function getYouTubeEmbedUrl(url: string): string {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (videoIdMatch && videoIdMatch[1]) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  return url;
}

function ExerciseTag({ exercise }: { exercise: string }) {
  const videoUrl = EXERCISE_VIDEO_LINKS[exercise];
  
  if (videoUrl) {
    const embedUrl = getYouTubeEmbedUrl(videoUrl);
    return (
      <span className="exercise-tag-link">
        <a 
          href={videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="exercise-tag"
          onClick={(e) => e.stopPropagation()}
        >
          {exercise}
        </a>
        <div className="video-popup">
          <iframe
            src={embedUrl}
            title={`${exercise} demonstration`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="video-popup-title">Click to watch full video</div>
        </div>
      </span>
    );
  }
  
  return <span className="exercise-tag">{exercise}</span>;
}

function RecommendationsSection({ classifications }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('lower-push');

  const legRecs = getLegRecommendations(classifications);
  const pushRecs = getPushRecommendations(classifications);
  const pullRecs = getPullRecommendations(classifications);

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'lower-push', label: 'Lower Body (Squat)', icon: '🏋️' },
    { id: 'lower-pull', label: 'Lower Body (Hinge)', icon: '🦵' },
    { id: 'upper-push', label: 'Upper Body Push', icon: '💪' },
    { id: 'upper-pull', label: 'Upper Body Pull', icon: '🎯' },
  ];

  const formatDescription = (description: string) => {
    const dashIndex = description.indexOf('—');
    if (dashIndex !== -1) {
      const boldPart = description.substring(0, dashIndex);
      const rest = description.substring(dashIndex);
      return (
        <>
          <strong>{boldPart}</strong>{rest}
        </>
      );
    }
    return description;
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'lower-push':
        return {
          recommendations: legRecs,
          categories: legRecs.categories.filter(c => 
            c.title.includes('Squat') || c.title.includes('Single Leg') || c.title.includes('Assistance')
          ),
        };
      case 'lower-pull':
        return {
          recommendations: legRecs,
          categories: legRecs.categories.filter(c => 
            c.title.includes('Hinge') || c.title.includes('Hip Thrust') || c.title.includes('Glute')
          ),
        };
      case 'upper-push':
        return {
          recommendations: pushRecs,
          categories: pushRecs.categories,
        };
      case 'upper-pull':
        return {
          recommendations: pullRecs,
          categories: pullRecs.categories,
        };
      default:
        return { recommendations: legRecs, categories: [] };
    }
  };

  const activeContent = getActiveContent();

  return (
    <section className="recommendations-section">
      <div className="section-header">
        <h2>Personalised Exercise Recommendations</h2>
        <p className="section-description">
          Based on your body proportions, here are customised exercise recommendations to optimise your training.
        </p>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="tab-content">
        <div className="content-header">
          <h3>{activeContent.recommendations.title}</h3>
          <p className="content-description">{formatDescription(activeContent.recommendations.description)}</p>
        </div>

        <div className="exercise-categories">
          {activeContent.categories.map((category, index) => (
            <div key={index} className="exercise-category">
              <h4>{category.title}</h4>
              {category.notes && (
                <div className="category-notes">
                  <span className="notes-icon">💡</span>
                  {category.notes}
                </div>
              )}
              <div className="strategy-box">
                <span className="strategy-label">Strategy</span>
                <p>{category.strategy}</p>
              </div>
              <div className="exercises-list">
                <span className="exercises-label">Recommended Exercises</span>
                <div className="exercise-tags">
                  {category.examples.map((exercise, i) => (
                    <ExerciseTag key={i} exercise={exercise} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeContent.recommendations.mobilityConsiderations && (
          <div className="mobility-section">
            <h4>
              <span className="mobility-icon">🧘</span>
              Mobility Considerations
            </h4>
            <div className="mobility-grid">
              <div className="mobility-card tight">
                <h5>Tight/Overactive</h5>
                <p className="mobility-instruction">Stretch and mobilise these areas.</p>
                <ul>
                  {activeContent.recommendations.mobilityConsiderations.tightOveractive.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mobility-card weak">
                <h5>Weak/Underactive</h5>
                <p className="mobility-instruction">Strengthen these areas.</p>
                <ul>
                  {activeContent.recommendations.mobilityConsiderations.weakUnderactive.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mobility-card symptoms">
                <h5>Common Symptoms</h5>
                <ul>
                  {activeContent.recommendations.mobilityConsiderations.symptoms.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mobility-card prehab">
                <h5>Best Prehab Exercises</h5>
                <ul>
                  {activeContent.recommendations.mobilityConsiderations.prehab.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecommendationsSection;
