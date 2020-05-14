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
    skillz: ["ES9", "React", "Redux", "Node"]
  },
  {
    title: "CSS",
    skillz: ["SCSS", "Styled Components", "Ant Design", "Material UI"]
  },
  {
    title: "Design",
    skillz: ["Figma", "Sketch", "Adobe XD", "Photoshop", "Zeplin"]
  },
  {
    title: "Miscellaneous",
    skillz: ["HTML5", "Webpack", "Github & Git", "Waffle.io"]
  }
];
