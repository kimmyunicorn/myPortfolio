// Skill groups. No ratings on purpose: the site links each skill to the
// projects that demonstrate it (matched against `tech` in projects.js).
// `aliases` lets a skill match differently worded tech entries.

export const skills = [
  {
    id: 'programming',
    title: 'Programming',
    items: [
      { name: 'Python' },
      { name: 'C' },
      { name: 'C++' },
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'MATLAB' },
      { name: 'Verilog / SystemVerilog' },
    ],
  },
  {
    id: 'robotics-ai',
    title: 'Robotics and AI',
    items: [
      { name: 'ROS 2', aliases: ['ROS 2 Jazzy', 'rosbridge'] },
      { name: 'OpenCV' },
      { name: 'PyTorch' },
      { name: 'Computer Vision' },
      { name: 'Machine Learning', aliases: ['scikit-learn', 'YOLOv8 Nano', 'MobileNetV3-Small'] },
      { name: 'Robot Control' },
      { name: 'MuJoCo' },
    ],
  },
  {
    id: 'embedded',
    title: 'Embedded systems',
    items: [
      { name: 'STM32' },
      { name: 'Raspberry Pi' },
      { name: 'Microcontrollers' },
      { name: 'Sensor Integration' },
      { name: 'UART' },
      { name: 'PWM' },
      { name: 'FPGA' },
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering and development',
    items: [
      { name: 'Git' },
      { name: 'Linux' },
      { name: 'Docker' },
      { name: 'SolidWorks' },
      { name: 'Fusion 360' },
      { name: 'CAD' },
      { name: 'System Integration' },
    ],
  },
];
