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
    skillz: ["ES6", "React", "Redux", "Node", "GraphQL", "Apollo", "jQuery"]
  },
  {
    title: "CSS4",
    skillz: ["SCSS", "Ant Design", "Styled Components", "Material UI"]
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
