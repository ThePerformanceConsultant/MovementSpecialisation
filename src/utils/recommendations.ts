
import { Classifications, RecommendationCategory } from '../types';

export function getLegRecommendations(classifications: Classifications): RecommendationCategory {
  const isLongLimbed = classifications.legStrategy === 'long';

  if (isLongLimbed) {
    return {
      title: 'Lower Body Recommendations',
      description: 'Long Limbs (Femur Dominant) — Your longer femurs create leverage challenges for anterior chain exercises but advantages for posterior chain movements.',
      categories: [
        {
          title: 'Squat Pattern',
          strategy: 'Utilise variations that artificially force an upright torso to bias the quads and minimise shear force on the lower back.',
          examples: ['Front Squat', 'Heels-Elevated Front Squat (Cyclist Squat)', 'High Bar Back Squat', 'Heels-Elevated Safety Bar Squat (Narrow Stance)'],
          notes: 'Naturally tends toward a "hingy" squat (leaning forward) due to femur length. The posterior chain often takes over, leaving quads under-stimulated.'
        },
        {
          title: 'Hinge Pattern',
          strategy: 'Focus on conscious quad engagement ("push the floor away") to prevent the hips from shooting up too fast, particularly in the first pull of O-Lifts.',
          examples: ['Conventional Deadlift', 'Trap Bar Deadlift (Low Handle)', 'Snatch-Grip Deadlift'],
          notes: 'Mechanically well-suited for pulling from the floor. No issues emphasising the posterior chain, but may lack "leg drive."'
        },
        {
          title: 'Hip Thrust / Glute Accessory',
          strategy: 'Conventional loading works best; no need for complex variations unless specifically maxing out glute strength.',
          examples: ['Barbell Hip Thrust', 'Single-Leg Hip Thrust', 'Kas Glute Bridge'],
          notes: 'Glutes engage easily due to the long lever.'
        },
        {
          title: 'Single Leg Work',
          strategy: 'Shorten the step length to mechanically force the knee over the toe, shifting focus back to the quads.',
          examples: ['Walking Lunges (Short Steps/Quad dominant)', 'Bulgarian Split Squat (Short Stance)', 'Backwards Walking Lunges', 'Backward Sled Drag'],
          notes: 'Natural tendency to (over)rely on the glutes.'
        },
        {
          title: 'Best Assistance Exercises',
          strategy: 'Focus on quad isolation to compensate for natural posterior chain dominance.',
          examples: ['Hack Squat', 'Narrow Stance Leg Press', 'Leg Extensions']
        }
      ],
      mobilityConsiderations: {
        tightOveractive: ['Hamstrings (often protective tension)', 'Calves (Soleus)'],
        weakUnderactive: ['VMO (Inner Quad)', 'Anterior Core (Abdominals)'],
        symptoms: ['Ankle Mobility Bottleneck: Long femurs require massive ankle dorsiflexion to keep the torso upright', 'Lower Back Pumps: The lower back takes the brunt of the stabilisation'],
        prehab: ['Poliquin Step-Ups (Heel Elevated)', 'Cossack Squats', 'Weighted Ankle Dorsiflexion', 'Pallof Press']
      }
    };
  } else {
    return {
      title: 'Lower Body Recommendations',
      description: 'Short Limbs (Torso Dominant) — Your body mechanics favour anterior chain exercises. Focus on maximising these advantages whilst addressing posterior chain development.',
      categories: [
        {
          title: 'Squat Pattern',
          strategy: 'Focus on maximum loading and "the basics." Since mechanics are optimal, simple progressive overload on the heaviest compounds yields the best results.',
          examples: ['Low Bar Back Squat', 'High Bar Back Squat', 'Front Squat', 'Pause Squats'],
          notes: 'Naturally built for squatting. The upright torso comes easily, meaning almost all variations will effectively stimulate the quads.'
        },
        {
          title: 'Hinge Pattern',
          strategy: 'Use variations or technical adjustments that force the hips to stay higher or increase the stretch on the hamstrings.',
          examples: ['RDL with Forefoot Elevated', 'Stiff-Legged Deadlift', 'Good Mornings', 'Zercher Good Mornings'],
          notes: 'Tendency to "squat the deadlift" (drop hips too low) because the quads are dominant. Harder to access the hamstrings/glutes.'
        },
        {
          title: 'Hip Thrust / Glute Accessory',
          strategy: 'Use alternative extension-based exercises where the quads cannot help, rather than bridge-based movements.',
          examples: ['Reverse Hypers', '45-Degree Back Extension (Glute biased/Round back)', 'Cable Pull-Throughs'],
          notes: 'Will often compensate by using quads (pushing back rather than up).'
        },
        {
          title: 'Single Leg Work',
          strategy: 'Lengthen the step/stride to verticalise the shin and put the glute in a deep stretch. Unilateral work is generally less effective for this body type than bilateral heavy loading.',
          examples: ['Split Squats (Long Stance/Vertical Shin)', 'Deficit Reverse Lunges (from a box)', 'Single-Leg RDL', 'Sled Push (Low Handles/Horizontal drive)'],
          notes: 'Naturally relies on quads; targeting the glutes is the challenge.'
        },
        {
          title: 'Best Assistance Exercises',
          strategy: 'Focus on posterior chain isolation to compensate for natural quad dominance.',
          examples: ['Lying Leg Curls', 'Leg Press (Wide/High Feet placement)', 'Glute-Ham Raise (GHR)', 'Nordic Hamstring Curls']
        }
      ],
      mobilityConsiderations: {
        tightOveractive: ['Hip Flexors (Rectus Femoris/Psoas)', 'Quadriceps'],
        weakUnderactive: ['Glutes (Max and Medius)', 'Hamstrings'],
        symptoms: ['Anterior Knee Pain (Patellar Tendonitis)', 'Anterior Pelvic Tilt'],
        prehab: ['Couch Stretch (long duration)', 'Single-Leg RDL (sensory focus)', 'Mini-Band Walks (Lateral/Monster)', 'Nordic Hamstring Curls (eccentric)']
      }
    };
  }
}

export function getPushRecommendations(classifications: Classifications): RecommendationCategory {
  const isLongArmed = classifications.armStrategy === 'long';

  if (isLongArmed) {
    return {
      title: 'Upper Body Push Recommendations',
      description: 'Long Arms, Short Torso — Your longer arms create leverage challenges for pressing movements. The anterior deltoids tend to dominate over chest and triceps.',
      categories: [
        {
          title: 'Horizontal Press (Bench Pattern)',
          strategy: 'Reduce ROM to keep tension on the pecs, or use converging implements (dumbbells/cables) to get a peak contraction.',
          examples: ['Floor Press (spares shoulders)', 'Dumbbell Bench Press (neutral or pronated)', 'Spoto Press (pausing 1-2 inches off chest)', 'Decline Bench Press (reduces ROM)', 'Weighted Dips (leaning forward)'],
          notes: 'Range of motion is excessive, placing high stress on the anterior delts at the bottom. The chest is often the weak link.'
        },
        {
          title: 'Vertical Press (Overhead Pattern)',
          strategy: 'Focus on stability and tricep endurance. Use leg drive (Push Press) to bypass the mechanically weak starting position.',
          examples: ['Push Press', 'Z-Press (forces core stability)', 'Pin Press (from eye level)', 'Landmine Press (kneeling)'],
          notes: 'The distance to lockout is significant; requires immense tricep stability.'
        },
        {
          title: 'Isolation/Hypertrophy',
          strategy: 'Shoulders are likely dominant; need to isolate the chest and thicken the triceps to support the long lever.',
          examples: ['Cable Flyes (constant tension)', 'Rolling Tricep Extensions', 'Hex Press', 'Pec Deck']
        },
        {
          title: 'Best Assistance Exercises',
          strategy: 'Build tricep mass and chest isolation to support the long lever arms.',
          examples: ['Close-Grip Bench Press (board press/block press)', 'Overhead Tricep Extensions (French Press)', 'Lu Raises']
        }
      ],
      mobilityConsiderations: {
        tightOveractive: ['Anterior Deltoids', 'Upper Traps (compensating for weak leverage)', 'Levator Scapulae'],
        weakUnderactive: ['Mid-Back (Rhomboids)', 'Triceps (specifically long head stability)', 'Pectorals (as stabilisers)'],
        symptoms: ['Bicipital Tendonitis: The long lever places high stress on the bicep tendon', 'Neck Stiffness: Over-reliance on Upper Traps'],
        prehab: ['Lu Raises (Full ROM Lateral Raise)', 'Overhead Tricep Extensions (French Press)', 'Band Pull-Aparts', 'Isometric Overhead Holds (waiter\'s walks or barbell holds)']
      }
    };
  } else {
    return {
      title: 'Upper Body Push Recommendations',
      description: 'Short Arms, Long Torso — Your shorter arms provide mechanical advantages for pressing. Focus on maintaining shoulder health and developing the upper chest.',
      categories: [
        {
          title: 'Horizontal Press (Bench Pattern)',
          strategy: 'Increase the ROM or create a deficit to force the muscle to stretch. Focus on upper chest (clavicular) which is often lagging.',
          examples: ['Cambered Bar Bench Press', 'Deficit Push-ups (hands on plates)', 'Incline Barbell/DB Bench (steep angle)', 'Guillotine Press (neck press - light weight only)'],
          notes: 'Naturally built for benching. The short ROM makes it easy to move heavy weight, but can lead to "ego lifting."'
        },
        {
          title: 'Vertical Press (Overhead Pattern)',
          strategy: 'Strict, full-ROM pressing to maintain mobility. Lockout is easy, but mobility (tight lats/pecs) often limits the start position.',
          examples: ['Strict Military Press', 'Behind the Neck Press (if mobility allows)', 'Handstand Push-ups', 'Seated Dumbbell Press (no back support)']
        },
        {
          title: 'Isolation/Hypertrophy',
          strategy: 'Chest and Triceps grow easily; need to focus on Shoulder health and Rear Delts to prevent internal rotation posture.',
          examples: ['Face Pulls (high volume)', 'Lateral Raises', 'Front Raises (usually unnecessary, but okay for isolation)']
        },
        {
          title: 'Best Assistance Exercises',
          strategy: 'Focus on shoulder health and preventing internal rotation.',
          examples: ['Trap-3 Raise (Prone Y)', 'External Rotation work (Cable or DB)', 'Serratus Wall Slides']
        }
      ],
      mobilityConsiderations: {
        tightOveractive: ['Pectoralis Minor (tipping the scapula forward)', 'Pectoralis Major', 'Short Head of Biceps'],
        weakUnderactive: ['External Rotators (Infraspinatus, Teres Minor)', 'Lower Traps', 'Serratus Anterior'],
        symptoms: ['Wrist/Elbow Pain: Caused by forcing positions shoulders cannot accommodate', 'Anterior Shoulder Pain: Often impingement caused by humeral head sitting forward'],
        prehab: ['Doorway/Corner Pec Stretch', 'Face Pulls with External Rotation', 'Serratus Wall Slides', 'Trap-3 Raise (Prone Y-Raise)']
      }
    };
  }
}

export function getPullRecommendations(classifications: Classifications): RecommendationCategory {
  const isLongArmed = classifications.armStrategy === 'long';

  if (isLongArmed) {
    return {
      title: 'Upper Body Pull Recommendations',
      description: 'Long Arms, Short Torso (The "Puller" Build) — Your longer arms provide mechanical advantages for pulling. The lats engage easily, but mid-back thickness may lag.',
      categories: [
        {
          title: 'Vertical Pull',
          strategy: 'Emphasise the stretch (bottom) where you are strongest, but use variations that force a full contraction at the top.',
          examples: ['Weighted Pull-ups (Neutral Grip)', 'Wide Grip Pull-ups', 'Lat Pulldown (Mag-Grip/Neutral)', 'Single-Arm Lat Pulldown'],
          notes: 'Naturally strong lats and great leverage for pulling, but the "final inch" (chest to bar) is difficult due to arm length.'
        },
        {
          title: 'Horizontal Pull (Rowing)',
          strategy: 'Block movement/momentum to force strict scapular retraction. Focus on elbows out/wide to hit the upper back.',
          examples: ['Chest-Supported Row (T-Bar or Machine)', 'Seal Row (bench elevated)', 'Face Pulls', 'Rear Delt Flyes', 'Wide-Grip Cable Row (to neck)'],
          notes: 'The challenge is retracting the scapula fully (Rhomboids/Traps are the weak link). Tendency to let shoulders roll forward.'
        },
        {
          title: 'Isolation/Hypertrophy',
          strategy: 'Lats grow easily; focus must be on Mid-Back thickness and scapular control.',
          examples: ['Batwing Rows (isometric holds)', 'Band Pull-Aparts', 'Scapular Pull-ups']
        },
        {
          title: 'Best Assistance Exercises',
          strategy: 'Build mid-back thickness and scapular control.',
          examples: ['Farmer\'s Carries (heavy)', 'Snatch-Grip Deadlift (for upper back volume)', 'Kroc Rows (high rep)']
        }
      ],
      mobilityConsiderations: {
        tightOveractive: ['Latissimus Dorsi', 'Teres Major'],
        weakUnderactive: ['Rhomboids (Scapular Retraction)', 'Mid-Traps', 'Posterior Deltoids'],
        symptoms: ['Thoracic Kyphosis (Slouching): Strong internal rotation of lats pulls shoulders forward', 'Lower Back Pain (Extension): Tight lats limit arm elevation, causing lumbar compensation'],
        prehab: ['Batwing Rows (Chest Supported)', 'Face Pulls', 'T-Spine Extension (Foam Roller)', 'Snatch-Grip Sotts Press (light)']
      }
    };
  } else {
    return {
      title: 'Upper Body Pull Recommendations',
      description: 'Short Arms, Long Torso (The "Grinder" Build) — Your shorter arms create natural bicep/trap dominance. Focus on lat width and proper back engagement.',
      categories: [
        {
          title: 'Vertical Pull',
          strategy: 'Use cues or grips that disengage the biceps (thumbless grip). Focus on "driving elbows down" rather than "pulling up."',
          examples: ['Thumbless Grip Pull-ups', 'Straight-Arm Lat Pulldowns (Cable)', '1.5 Rep Pull-ups (full rep + bottom half rep)', 'Kneeling Lat Pulldown (reduces body english)'],
          notes: 'Range of motion is short, but "Short Arm" dominance leads to pulling with biceps/traps rather than lats.'
        },
        {
          title: 'Horizontal Pull (Rowing)',
          strategy: 'Angles that emphasise the "sweep" of the lats towards the hips.',
          examples: ['Single-Arm Dumbbell Row ("Sawing" motion towards hip)', 'Meadows Row', 'Pendlay Row (strict)', 'Dorian Yates Row (underhand)'],
          notes: 'Mechanically strong, but lats (width) are the weak link.'
        },
        {
          title: 'Isolation/Hypertrophy',
          strategy: 'Biceps and Traps grow easily; focus must be on Lat Width and low-lat engagement.',
          examples: ['Kayak Rows', 'Dumbbell Pullovers', 'Cable Pullovers']
        },
        {
          title: 'Best Assistance Exercises',
          strategy: 'Build lat width and maintain bicep tendon health.',
          examples: ['Eccentric Bicep Curls (tendon health)', 'Hammer Curls', 'Cross-Body Hammer Curls']
        }
      ],
      mobilityConsiderations: {
        tightOveractive: ['Upper Traps (Levator Scapulae)', 'Biceps/Forearms'],
        weakUnderactive: ['Latissimus Dorsi (width/sweep)', 'Lower Traps'],
        symptoms: ['Neck/Cervical Pain: Over-reliance on upper traps causes chronic neck tension', 'Medial Elbow Pain (Golfer\'s Elbow): Overusing flexors and biceps to initiate pulls'],
        prehab: ['Straight-Arm Lat Pulldowns (Cable or Band)', 'Unilateral Prone Lower Trap Raises (Trap-3 Raise)', 'Eccentric Bicep Curls', 'Farmer\'s Carries']
      }
    };
  }
}

export function getOlympicLiftingInsights(classifications: Classifications): { legs: string[]; arms: string[] } {
  const legInsights: string[] = [];
  const armInsights: string[] = [];

  if (classifications.legStrategy === 'long') {
    legInsights.push('The Pull (The "Stripper" Pull): Hips tend to shoot up faster than shoulders in the first pull, shifting load immediately to hamstrings and causing the chest to drop.');
    legInsights.push('The Catch: Stability in the bottom of the Clean or Snatch is physically harder. The "hole" is deeper and centre of mass is further behind the knees.');
    legInsights.push('The Recovery: Standing up from heavy Cleans is the sticking point. You can pull the weight high, but the squat recovery is challenging.');
  } else {
    legInsights.push('The Pull (Squatting the Pull): Strong quads may cause you to start with hips too low and torso too upright, preventing proper hamstring tension and leading to a weak second pull.');
    legInsights.push('Bar Path: May struggle to get knees back out of the way of the bar in the first pull, causing the bar to loop around the knees.');
    legInsights.push('The Recovery: Generally excellent. If you can clean it, you can stand it up. Legs are rarely the limiting factor.');
  }

  if (classifications.armStrategy === 'long') {
    armInsights.push('The Pull (Contact Point): Ideal build for pull mechanics. Long arms allow staying more upright in the start. Bar meets hips naturally without excessive arm bend.');
    armInsights.push('The Turnover: Generally smoother due to less restricting muscle mass, though long levers can make the turnover feel "slow."');
    armInsights.push('The Jerk: Danger zone — the drive distance is massive. If the Anterior Delt fatigues, elbows tend to soften or wobble at lockout.');
  } else {
    armInsights.push('The Pull (The "Arm Bend" Risk): Dominant biceps and traps with short arms create a tendency for early arm bend, trying to "muscle" the weight up before full hip extension.');
    armInsights.push('Bar Path: Strong traps make the shrug powerful, but difficult lats may cause the bar to loop away after the explosion.');
    armInsights.push('The Catch: Strong rhomboids usually mean a very stable upper back in the catch position, provided the bar didn\'t loop too far forward.');
  }

  return { legs: legInsights, arms: armInsights };
}

export function getActivationHierarchy(classifications: Classifications): { legs: { easy: string[]; neutral: string[]; difficult: string[] }; arms: { easy: string[]; neutral: string[]; difficult: string[] } } {
  const legs = classifications.legStrategy === 'long'
    ? {
        easy: ['Glutes', 'Lower Back'],
        neutral: ['Hamstrings'],
        difficult: ['Quads (esp. VMO)', 'Calves']
      }
    : {
        easy: ['Quads', 'Calves'],
        neutral: ['Hamstrings', 'Adductors'],
        difficult: ['Glutes']
      };

  const arms = classifications.armStrategy === 'long'
    ? {
        easy: ['Lats', 'Anterior Deltoids'],
        neutral: ['Posterior Deltoids', 'Medial Deltoids'],
        difficult: ['Traps', 'Rhomboids', 'Biceps', 'Chest', 'Triceps']
      }
    : {
        easy: ['Pectorals', 'Triceps', 'Traps', 'Rhomboids', 'Biceps'],
        neutral: ['Medial Deltoids', 'Posterior Deltoids'],
        difficult: ['Upper Chest', 'Anterior Deltoids', 'Lats']
      };

  return { legs, arms };
}
