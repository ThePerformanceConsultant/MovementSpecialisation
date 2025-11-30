
# Anthropometric Analysis

A personalised exercise recommendation tool based on your body proportions and anthropometric measurements.

## Overview

This application helps you understand your unique anatomy and provides customised exercise recommendations based on your skeletal proportions. By analysing measurements like limb lengths and ratios, it identifies which movement patterns you're naturally suited for and which areas may need extra attention.

## Features

- **Body Proportion Analysis**: Calculate key ratios like tibia:femur, leg:height, and ulna:humerus
- **Classification System**: Automatically classifies your proportions as short, average, or long
- **Personalised Recommendations**: Get exercise suggestions tailored to your body type
- **Mobility Considerations**: Understand which muscles are likely tight/overactive vs weak/underactive
- **Olympic Lifting Insights**: Sport-specific guidance for weightlifters
- **Persistent Storage**: Your measurements are saved locally for convenience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/anthropometric-analysis.git

# Navigate to the project directory
cd anthropometric-analysis

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy!

## How to Use

1. Enter your measurements in centimetres:
   - **Height**: Standing height
   - **Total Leg**: Ankle to ASIS (front of hip bone)
   - **Lower Leg**: Ankle to knee
   - **Wingspan**: Fingertip to fingertip with arms extended
   - **Lower Arm**: Wrist to elbow
   - **Upper Arm**: Collar bone to elbow

2. Click "Calculate & Analyse"

3. Review your results:
   - Calculated ratios and classifications
   - Lower and upper body training strategies
   - Muscle activation hierarchy
   - Olympic lifting implications

4. Explore personalised recommendations:
   - Exercise variations suited to your proportions
   - Mobility work to address potential imbalances
   - Prehab exercises for injury prevention

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS (no framework)

## License

MIT License

## Acknowledgements

Based on biomechanical research and anthropometric principles.
