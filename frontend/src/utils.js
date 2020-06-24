// Shuffle an array helper function
export const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const skillz = [
  {
    title: "JavaScript",
    skillz: ["ES9", "React", "Node", "p5"]
  },
  {
    title: "Design",
    skillz: ["SCSS", "Styled Components", "Figma", "Sketch"]
  },
  {
    title: "Mobile",
    skillz: ["React Native", "Flutter"]
  },
  {
    title: "Miscellaneous",
    skillz: ["Version Control", "API Integration", "MySQL", "Agile development"]
  }
];
