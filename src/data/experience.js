// Work and leadership experience, newest first. The timeline is generated from this list.
//
// Fields
//   org, role, location, period   shown on the card
//   focus[]                       areas of work (only what Kimberly has confirmed)
//   details                       optional longer description shown when the card is expanded
//   project                       optional slug from projects.js to link a case study
//   verify[]                      notes about content that still needs confirming;
//                                 rendered as a visible "to confirm" note in development builds only

export const experience = [
  {
    id: 'graphen',
    org: 'Graphen Robotics',
    role: 'Robotics Engineer',
    location: 'New York City',
    period: 'Nov 2026 – Present',
    kind: 'work',
    focus: [
      'Computer vision',
      'Machine learning',
      'Robotics software',
      'Real-time perception systems',
      'Object detection and classification',
    ],
    details:
      'Building perception software for robots, including a hybrid detection and classification system for packaged products.',
    project: 'hybrid-candy-vision',
    verify: [],
  },
  {
    id: 'idtech',
    org: 'iD Tech',
    role: 'Robotics Instructor',
    location: 'Stanford University',
    period: 'Summer 2026',
    kind: 'work',
    focus: ['Robotics education', 'Programming', 'Hardware integration', 'Teaching engineering concepts'],
    details: null,
    verify: ['Add a sentence on what you taught (age group, platforms, curriculum).'],
  },
  {
    id: 'lunabotics',
    org: 'NASA Lunabotics · UCSC Slugbotics',
    role: 'President',
    location: 'UC Santa Cruz',
    period: '2025 – 2026',
    kind: 'leadership',
    focus: [
      'Robotics team leadership',
      'Autonomous lunar excavation robot development',
      'Multidisciplinary engineering coordination',
      'Mechanical and electrical system integration',
    ],
    details: null,
    project: 'nasa-lunabotics',
    verify: ['Competition year, team size and outcome.'],
  },
  {
    id: 'seastar',
    org: 'SeaSTAR ROV Capstone',
    role: 'Software Lead',
    location: 'UC Santa Cruz',
    period: '2025 – 2026',
    kind: 'project',
    focus: [
      'ROS 2',
      'Underwater robotics',
      'Real-time telemetry',
      'Robot control',
      'Browser-based monitoring interfaces',
      'Raspberry Pi and STM32 integration',
    ],
    details:
      'Led the software for an underwater remotely operated vehicle, from ROS 2 integration on board to the browser interface used to drive it.',
    project: 'seastar-rov',
    verify: [],
  },
  {
    id: 'cuhk',
    org: 'The Chinese University of Hong Kong',
    role: 'Robotics Software Research Intern',
    location: 'Hong Kong',
    period: 'Summer 2025',
    kind: 'research',
    focus: [
      'Surgical robotics',
      'Computer vision',
      'Snake robot research',
      'Force estimation',
      'C++ and OpenCV',
      'Real-time contour tracking',
    ],
    details:
      'Worked on force estimation for a surgical snake robot using real-time visual tracking and mechanical modeling.',
    project: 'surgical-snake-robot',
    verify: [],
  },
  {
    id: 'skanska',
    org: 'Skanska',
    role: 'Civil Engineering Intern',
    location: null,
    period: 'Summer 2025',
    kind: 'work',
    focus: [],
    details: null,
    verify: ['Location and a line on what you worked on.', 'Same summer as CUHK — confirm dates.'],
  },
  {
    id: 'goengineer',
    org: 'GoEngineer',
    role: 'Mechanical Engineering Intern',
    location: null,
    period: '2024',
    kind: 'work',
    focus: ['CAD', 'SolidWorks', 'Mechanical design'],
    details: null,
    verify: ['Season or months, and location.'],
  },
  {
    id: 'lausd',
    org: 'Los Angeles Unified School District',
    role: 'Electrical Engineering Intern',
    location: 'Los Angeles',
    period: 'Summer 2023',
    kind: 'work',
    focus: [],
    details: null,
    verify: ['A line on what you worked on.'],
  },
  {
    id: 'energy-coalition',
    org: 'The Energy Coalition',
    role: 'Electrical Engineering Intern',
    location: null,
    period: 'Summer 2023',
    kind: 'work',
    focus: [],
    details: null,
    verify: ['Location and a line on what you worked on.'],
  },
];
