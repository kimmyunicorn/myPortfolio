// Every project card and case-study page is generated from this list.
// To add a project, copy one entry, give it a unique `slug`, and fill in what you have.
// Leave a field as null and the site shows a tidy "to add" placeholder instead of inventing content.
//
// Field guide
//   slug          URL: /projects/<slug>
//   theme         'sakura' (default) | 'lunar' | 'ocean' — changes the case-study palette
//   featured      true = large editorial layout on the home page; false = "More projects" list
//   visibility    'public' | 'summary-only' (company / confidential work: no code, data or internals)
//   disclosure    for company work: { approved: false } hides `results` until you confirm approval
//   results[]     { value, label, context } — `context` says how/where it was measured
//   architecture  { stages: [...] } rendered as a pipeline diagram (keep it high level)
//   media.hero    { key, widths, width, height, alt } after running scripts/optimize-media.mjs
//   media.gallery same shape, list
//   media.wanted  list of media you plan to add; shown as labelled placeholders until then
//   links         { github, demo, paper } — null hides the link

export const projects = [
  {
    slug: 'seastar-rov',
    title: 'SeaSTAR Underwater ROV',
    category: 'Underwater robotics · Real-time interfaces',
    org: 'UCSC capstone',
    role: 'Software Lead',
    period: '2025 – 2026',
    theme: 'ocean',
    featured: true,
    visibility: 'public',
    summary:
      'Software infrastructure and a real-time browser interface for an underwater remotely operated vehicle: controls, telemetry and the ROS 2 link between the vehicle and the pilot.',
    tech: ['ROS 2 Jazzy', 'Python', 'JavaScript', 'Raspberry Pi', 'STM32', 'rosbridge', 'HTML', 'CSS'],
    problem:
      'An ROV pilot needs to send commands and see what the vehicle is doing in real time, while the onboard computer, microcontroller and surface interface all speak to each other reliably.',
    contribution:
      'As software lead I owned the robot control interfaces, telemetry visualization, ROS 2 integration, and the communication path between the onboard hardware and the browser interface.',
    solution:
      'ROS 2 runs on the vehicle’s Raspberry Pi and talks to an STM32 for low-level hardware. A browser interface connects through rosbridge, so the pilot can drive the ROV and watch sensor telemetry live from a web page.',
    architecture: {
      stages: ['Controller input', 'Browser UI', 'rosbridge', 'ROS 2 on Raspberry Pi', 'STM32', 'Thrusters & sensors'],
    },
    results: [
      { value: '≈9 ms', label: 'communication latency', context: 'Measured in project testing.' },
      { value: 'Reliable', label: 'mission command delivery', context: 'In reported tests.' },
      { value: 'Live', label: 'controller and sensor integration', context: 'Real-time, end to end.' },
    ],
    lessons: null,
    media: {
      hero: null,
      gallery: [],
      wanted: ['ROV photograph', 'Software architecture diagram', 'Pilot UI screenshot', 'Demo video'],
    },
    links: { github: null, demo: null },
  },
  {
    slug: 'hybrid-candy-vision',
    title: 'Hybrid Candy Vision System',
    category: 'Computer vision · Machine learning',
    org: 'Graphen Robotics',
    role: 'Robotics Engineer',
    period: '2026',
    theme: 'sakura',
    featured: true,
    visibility: 'summary-only',
    disclosure: { approved: false },
    summary:
      'A hybrid computer vision system that detects and classifies packaged candy products in real time, combining lightweight detection, deep-learning classification, color analysis and temporal smoothing.',
    tech: ['Python', 'PyTorch', 'YOLOv8 Nano', 'MobileNetV3-Small', 'OpenCV', 'NumPy', 'scikit-learn', 'CUDA'],
    problem:
      'Packaged products that look alike, such as different M&M’s varieties, have to be told apart quickly and reliably from a live camera feed.',
    contribution:
      'I developed the vision system, from detection and classification through color verification and tracking.',
    solution:
      'A fast detector finds each package, a compact classifier identifies it, and a color check settles cases that look alike. Evidence is fused over time so the label stays steady from frame to frame. It recognizes brown and yellow M&M’s, Snickers and Twix.',
    architecture: {
      stages: ['Camera', 'Detection', 'Classification', 'Color verification', 'Evidence fusion', 'Tracking'],
    },
    results: [
      { value: '99.41%', label: 'classifier validation accuracy', context: 'MobileNetV3 validation set. Not a measure of real-world deployment accuracy.' },
      { value: '100%', label: 'color-classifier validation accuracy', context: 'Small, 12-image validation set. Not a measure of real-world deployment accuracy.' },
    ],
    lessons: null,
    media: { hero: null, gallery: [], wanted: ['Approved demo image or video'] },
    links: { github: null, demo: null },
  },
  {
    slug: 'nasa-lunabotics',
    title: 'NASA Lunabotics',
    category: 'Space robotics · Team leadership',
    org: 'UCSC Slugbotics',
    role: 'President',
    period: '2025 – 2026',
    theme: 'lunar',
    featured: true,
    visibility: 'public',
    summary:
      'Led a multidisciplinary student team building an autonomous lunar excavation robot for NASA’s Lunabotics challenge.',
    tech: [],
    highlights: [
      'Robotics integration',
      'Mechanical design',
      'Team leadership',
      'Autonomous robotics',
      'Electrical systems',
      'System-level engineering',
    ],
    problem: null,
    contribution:
      'As president I led the team and coordinated mechanical, electrical and software work toward one integrated robot.',
    solution: null,
    architecture: null,
    results: [],
    lessons: null,
    media: { hero: null, gallery: [], wanted: ['Robot photograph', 'Team photo', 'CAD render', 'Competition video'] },
    links: { github: null, demo: null },
  },
  {
    slug: 'surgical-snake-robot',
    title: 'Surgical Snake Robot',
    category: 'Surgical robotics · Research',
    org: 'The Chinese University of Hong Kong',
    role: 'Robotics Software Research Intern',
    period: 'Summer 2025',
    theme: 'sakura',
    featured: true,
    visibility: 'public',
    summary:
      'Force estimation for a surgical snake robot, combining real-time visual tracking with mechanical modeling.',
    tech: ['C++', 'OpenCV', 'Computer vision'],
    highlights: ['Image processing', 'Contour detection', 'Force estimation', 'Real-time computation'],
    problem:
      'Estimating the forces on a flexible surgical robot without relying only on dedicated force sensors.',
    contribution: 'I worked on the vision and estimation software in C++ and OpenCV.',
    solution:
      'Track the robot’s shape in real time with contour detection, then use a mechanical model to estimate force from how it bends.',
    architecture: { stages: ['Camera', 'Contour tracking', 'Shape estimate', 'Mechanical model', 'Force estimate'] },
    results: [],
    lessons: null,
    media: { hero: null, gallery: [], wanted: ['Research imagery', 'Tracking overlay', 'Technical diagram'] },
    links: { github: null, paper: null },
  },
  {
    slug: 'seed-planting-robot',
    title: 'Autonomous Seed-Planting Robot',
    category: 'Embedded systems · Prototyping',
    org: null,
    role: null,
    period: null,
    theme: 'sakura',
    featured: true,
    visibility: 'public',
    summary:
      'An autonomous seed-planting robot bringing together mechanical design, electronics and embedded control.',
    tech: ['Embedded systems', 'CAD', 'Microcontrollers', 'Mechanical prototyping'],
    highlights: ['CAD', 'Chassis fabrication', 'Sensor integration', 'Embedded control', 'Robotics prototyping'],
    problem: null,
    contribution: null,
    solution: null,
    architecture: null,
    results: [],
    lessons: null,
    media: { hero: null, gallery: [], wanted: ['Robot photograph', 'CAD model', 'Planting demo video'] },
    links: { github: null },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
