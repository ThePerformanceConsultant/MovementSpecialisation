
import './ResultsSection.css';
import { CalculatedResults, Classifications } from '../../types';
import { getActivationHierarchy, getOlympicLiftingInsights } from '../../utils/recommendations';

interface Props {
  results: CalculatedResults;
  classifications: Classifications;
}

/* ============================================
   OLYMPIC LIFTING / INSIGHT VIDEO LINKS
   
   To add a new video link for an insight/technique:
   1. Add a new entry below with a unique keyword that appears in the insight text
   2. The keyword should be specific enough to match only the intended insight
   3. Provide the YouTube video URL as the value
   
   Example:
   'Stripper': 'https://www.youtube.com/watch?v=VIDEO_ID',
   ============================================ */
const INSIGHT_VIDEO_LINKS: Record<string, string> = {
  'Stripper': 'https://www.youtube.com/watch?v=M2j1lp6a9lk',
  // Add more insight videos here following the same pattern:
  // 'Keyword in insight text': 'https://www.youtube.com/watch?v=VIDEO_ID',
};

function getYouTubeEmbedUrl(url: string): string {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (videoIdMatch && videoIdMatch[1]) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  return url;
}

function ResultsSection({ results, classifications }: Props) {
  const activationHierarchy = getActivationHierarchy(classifications);
  const olympicInsights = getOlympicLiftingInsights(classifications);

  const getClassificationBadge = (classification: string) => {
    const colors: Record<string, string> = {
      short: '#ef4444',
      average: '#f59e0b',
      long: '#22c55e',
    };
    return (
      <span className="classification-badge" style={{ background: colors[classification] || '#666' }}>
        {classification.charAt(0).toUpperCase() + classification.slice(1)}
      </span>
    );
  };

  const formatInsight = (insight: string) => {
    const boldPatterns = [
      /^(The Pull \([^)]+\)):/,
      /^(The Catch):/,
      /^(The Recovery):/,
      /^(Bar Path):/,
      /^(The Turnover):/,
      /^(The Jerk):/,
    ];

    // Check if this insight has a video link
    let videoUrl: string | null = null;
    let videoKeyword: string | null = null;
    for (const [keyword, url] of Object.entries(INSIGHT_VIDEO_LINKS)) {
      if (insight.includes(keyword)) {
        videoUrl = url;
        videoKeyword = keyword;
        break;
      }
    }

    for (const pattern of boldPatterns) {
      const match = insight.match(pattern);
      if (match) {
        const boldPart = match[1];
        const rest = insight.slice(match[0].length);
        
        // If this insight has a video, wrap the bold part in a video link
        if (videoUrl && videoKeyword && boldPart.includes(videoKeyword)) {
          const embedUrl = getYouTubeEmbedUrl(videoUrl);
          return (
            <>
              <span className="insight-video-link">
                <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                  <strong>{boldPart}</strong>
                </a>
                <div className="video-popup">
                  <iframe
                    src={embedUrl}
                    title={`${boldPart} demonstration`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="video-popup-title">Click to watch full video</div>
                </div>
              </span>
              :{rest}
            </>
          );
        }
        
        return (
          <>
            <strong>{boldPart}:</strong>{rest}
          </>
        );
      }
    }
    return insight;
  };

  return (
    <section className="results-section">
      <div className="section-header">
        <h2>Your Analysis Results</h2>
        <p className="section-description">Based on your measurements, here are your calculated ratios and classifications.</p>
      </div>

      <div className="results-grid">
        <div className="result-card">
          <div className="result-header">
            <span className="result-icon">🦵</span>
            <h3>Femur Length</h3>
          </div>
          <div className="result-value">{results.femurLength.toFixed(1)} cm</div>
          <p className="result-description">Total Leg minus Lower Leg</p>
        </div>

        <div className="result-card">
          <div className="result-header">
            <span className="result-icon">📐</span>
            <h3>Tibia:Femur Ratio</h3>
          </div>
          <div className="result-value">{results.tibiaFemurRatio.toFixed(1)}%</div>
          <div className="result-classification">
            {getClassificationBadge(classifications.tibia)} Tibia
          </div>
          <p className="result-description">
            {classifications.tibia === 'short' && '75-78% of femur'}
            {classifications.tibia === 'average' && '79-84% of femur'}
            {classifications.tibia === 'long' && '85%+ of femur'}
          </p>
        </div>

        <div className="result-card">
          <div className="result-header">
            <span className="result-icon">📏</span>
            <h3>Leg:Height Ratio</h3>
          </div>
          <div className="result-value">{results.legHeightRatio.toFixed(1)}%</div>
          <div className="result-classification">
            {getClassificationBadge(classifications.legs)} Legs
          </div>
          <p className="result-description">
            {classifications.legs === 'short' && '40-43% of height'}
            {classifications.legs === 'average' && '44-47% of height'}
            {classifications.legs === 'long' && '47-51% of height'}
          </p>
        </div>

        <div className="result-card">
          <div className="result-header">
            <span className="result-icon">↔️</span>
            <h3>Wingspan - Height</h3>
          </div>
          <div className="result-value">{results.wingspanMinusHeight > 0 ? '+' : ''}{results.wingspanMinusHeight.toFixed(1)} cm</div>
          <div className="result-classification">
            {getClassificationBadge(classifications.arms)} Arms
          </div>
          <p className="result-description">
            {classifications.arms === 'short' && 'Wingspan <1 cm longer than height'}
            {classifications.arms === 'average' && 'Wingspan 1-5 cm longer than height'}
            {classifications.arms === 'long' && 'Wingspan >5 cm longer than height'}
          </p>
        </div>

        <div className="result-card">
          <div className="result-header">
            <span className="result-icon">💪</span>
            <h3>Ulna:Humerus Ratio</h3>
          </div>
          <div className="result-value">{results.ulnaHumerusRatio.toFixed(1)}%</div>
          <div className="result-classification">
            {getClassificationBadge(classifications.ulna)} Ulna
          </div>
          <p className="result-description">
            {classifications.ulna === 'short' && '75-78% of humerus'}
            {classifications.ulna === 'average' && '79-84% of humerus'}
            {classifications.ulna === 'long' && '85%+ of humerus'}
          </p>
        </div>
      </div>

      <div className="strategy-cards">
        <div className="strategy-card legs">
          <h3>
            <span className="strategy-icon">🏋️</span>
            Lower Body Strategy
          </h3>
          <div className="strategy-type">
            {classifications.legStrategy === 'long' ? (
              <><strong>Long Limbs</strong> (Femur Dominant)</>
            ) : (
              <><strong>Short Limbs</strong> (Torso Dominant)</>
            )}
          </div>
          <div className="strategy-summary">
            {classifications.legStrategy === 'long' ? (
              <>
                <p><strong>Advantage:</strong> Posterior chain exercises (e.g., needs less assistance on deadlifts)</p>
                <p><strong>Disadvantage:</strong> Anterior chain exercises (e.g., needs more assistance on squats)</p>
              </>
            ) : (
              <>
                <p><strong>Advantage:</strong> Anterior chain exercises (e.g., needs less assistance on squats)</p>
                <p><strong>Disadvantage:</strong> Posterior chain exercises (e.g., needs more assistance on deadlifts)</p>
              </>
            )}
          </div>
        </div>

        <div className="strategy-card arms">
          <h3>
            <span className="strategy-icon">🎯</span>
            Upper Body Strategy
          </h3>
          <div className="strategy-type">
            {classifications.armStrategy === 'long' ? (
              <><strong>Long Arms</strong>, Short Torso</>
            ) : (
              <><strong>Short Arms</strong>, Long Torso</>
            )}
          </div>
          <div className="strategy-summary">
            {classifications.armStrategy === 'long' ? (
              <>
                <p><strong>Advantage:</strong> Pulling movements (e.g., needs less assistance on rows)</p>
                <p><strong>Disadvantage:</strong> Pressing movements (e.g., needs more assistance on bench press)</p>
              </>
            ) : (
              <>
                <p><strong>Advantage:</strong> Pressing movements (e.g., needs less assistance on bench press)</p>
                <p><strong>Disadvantage:</strong> Pulling movements (e.g., needs more assistance on rows)</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="activation-section">
        <h3>Activation Hierarchy</h3>
        <p className="activation-description">Understanding which muscles activate easily vs. with difficulty helps guide exercise selection and volume allocation.</p>
        
        <div className="activation-grid">
          <div className="activation-card">
            <h4>🦵 Lower Body</h4>
            <div className="activation-list">
              <div className="activation-group easy">
                <span className="activation-label">Easy to Activate</span>
                <div className="activation-muscles">{activationHierarchy.legs.easy.join(', ')}</div>
              </div>
              <div className="activation-group neutral">
                <span className="activation-label">Neutral</span>
                <div className="activation-muscles">{activationHierarchy.legs.neutral.join(', ')}</div>
              </div>
              <div className="activation-group difficult">
                <span className="activation-label">Difficult to Activate</span>
                <div className="activation-muscles">{activationHierarchy.legs.difficult.join(', ')}</div>
              </div>
            </div>
          </div>

          <div className="activation-card">
            <h4>💪 Upper Body</h4>
            <div className="activation-list">
              <div className="activation-group easy">
                <span className="activation-label">Easy to Activate</span>
                <div className="activation-muscles">{activationHierarchy.arms.easy.join(', ')}</div>
              </div>
              <div className="activation-group neutral">
                <span className="activation-label">Neutral</span>
                <div className="activation-muscles">{activationHierarchy.arms.neutral.join(', ')}</div>
              </div>
              <div className="activation-group difficult">
                <span className="activation-label">Difficult to Activate</span>
                <div className="activation-muscles">{activationHierarchy.arms.difficult.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="olympic-section">
        <h3>🏅 Olympic Lifting Implications</h3>
        <div className="olympic-grid">
          <div className="olympic-card">
            <h4>Lower Body Mechanics</h4>
            <ul>
              {olympicInsights.legs.map((insight, index) => (
                <li key={index}>{formatInsight(insight)}</li>
              ))}
            </ul>
          </div>
          <div className="olympic-card">
            <h4>Upper Body Mechanics</h4>
            <ul>
              {olympicInsights.arms.map((insight, index) => (
                <li key={index}>{formatInsight(insight)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsSection;
