
import React from 'react';
import './MeasurementInput.css';
import { Measurements } from '../../types';

interface Props {
  measurements: Measurements;
  onChange: (field: keyof Measurements, value: string) => void;
  onCalculate: () => void;
  onReset: () => void;
}

const measurementFields: { key: keyof Measurements; label: string; description: string }[] = [
  { key: 'height', label: 'Height', description: 'Standing height' },
  { key: 'totalLeg', label: 'Total Leg', description: 'Ankle to ASIS' },
  { key: 'lowerLeg', label: 'Lower Leg', description: 'Ankle to Knee' },
  { key: 'wingspan', label: 'Wingspan', description: 'Fingertip to Fingertip' },
  { key: 'lowerArm', label: 'Lower Arm', description: 'Wrist to Elbow' },
  { key: 'upperArm', label: 'Upper Arm', description: 'Collar Bone to Elbow' },
];

function MeasurementInput({ measurements, onChange, onCalculate, onReset }: Props) {
  return (
    <section className="measurement-section">
      <div className="section-header">
        <h2>Body Proportions</h2>
        <p className="section-description">
          Enter your measurements in centimetres. For guidance on how to take accurate measurements, 
          watch <a href="https://youtu.be/nOBxjsIsn80" target="_blank" rel="noopener noreferrer" className="video-link">this instructional video</a>.
        </p>
      </div>

      <div className="measurement-grid">
        {measurementFields.map(({ key, label, description }) => (
          <div key={key} className="measurement-field">
            <label htmlFor={key}>
              <span className="label-text">{label}</span>
              <span className="label-description">{description}</span>
            </label>
            <div className="input-wrapper">
              <input
                type="number"
                id={key}
                value={measurements[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder="0"
                min="0"
                step="0.1"
              />
              <span className="unit">cm</span>
            </div>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={onCalculate}>
          <span className="btn-icon">📊</span>
          Calculate & Analyse
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          <span className="btn-icon">🔄</span>
          Reset
        </button>
      </div>
    </section>
  );
}

export default MeasurementInput;
