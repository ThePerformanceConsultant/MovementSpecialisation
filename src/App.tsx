
import { useState, useEffect } from 'react';
import './App.css';
import IntroductionSection from './components/IntroductionSection/IntroductionSection';
import MeasurementInput from './components/MeasurementInput/MeasurementInput';
import ResultsSection from './components/ResultsSection/ResultsSection';
import RecommendationsSection from './components/RecommendationsSection/RecommendationsSection';
import { Measurements, CalculatedResults, Classifications } from './types';
import { calculateResults, classifyAthlete } from './utils/calculations';
import { persistence } from './utils/persistence';

function App() {
  const [measurements, setMeasurements] = useState<Measurements>({
    height: '',
    totalLeg: '',
    lowerLeg: '',
    wingspan: '',
    lowerArm: '',
    upperArm: '',
  });

  const [results, setResults] = useState<CalculatedResults | null>(null);
  const [classifications, setClassifications] = useState<Classifications | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedMeasurements = await persistence.getItem('measurements');
        if (savedMeasurements) {
          setMeasurements(JSON.parse(savedMeasurements));
        }
      } catch (error) {
        console.error('Error loading saved measurements:', error);
      }
    };
    loadSavedData();
  }, []);

  const handleMeasurementChange = (field: keyof Measurements, value: string) => {
    const newMeasurements = { ...measurements, [field]: value };
    setMeasurements(newMeasurements);
    setIsCalculated(false);
  };

  const handleCalculate = async () => {
    const allFilled = Object.values(measurements).every(v => v !== '' && !isNaN(parseFloat(v)));
    if (!allFilled) {
      alert('Please fill in all measurements with valid numbers.');
      return;
    }

    const calculatedResults = calculateResults(measurements);
    const athleteClassifications = classifyAthlete(calculatedResults);

    setResults(calculatedResults);
    setClassifications(athleteClassifications);
    setIsCalculated(true);

    try {
      await persistence.setItem('measurements', JSON.stringify(measurements));
    } catch (error) {
      console.error('Error saving measurements:', error);
    }
  };

  const handleReset = async () => {
    setMeasurements({
      height: '',
      totalLeg: '',
      lowerLeg: '',
      wingspan: '',
      lowerArm: '',
      upperArm: '',
    });
    setResults(null);
    setClassifications(null);
    setIsCalculated(false);
    try {
      await persistence.removeItem('measurements');
    } catch (error) {
      console.error('Error clearing measurements:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Anthropometric Analysis</h1>
        <p className="subtitle">Personalised Exercise Recommendations Based on Your Body Proportions</p>
      </header>

      <main className="app-main">
        <IntroductionSection />
        
        <MeasurementInput
          measurements={measurements}
          onChange={handleMeasurementChange}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        {isCalculated && results && classifications && (
          <>
            <ResultsSection results={results} classifications={classifications} />
            <RecommendationsSection classifications={classifications} />
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Based on biomechanical research and anthropometric principles</p>
      </footer>
    </div>
  );
}

export default App;
