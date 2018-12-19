import Plant1 from "./assets/jungleSearch/fauna/plant1.jpg";
import Plant2 from "./assets/jungleSearch/fauna/plant2.png";
import Plant3 from "./assets/jungleSearch/fauna/plant3.png";
import Plant4 from "./assets/jungleSearch/fauna/plant4.png";
import Plant5 from "./assets/jungleSearch/fauna/plant5.png";
import Montsera from "./assets/jungleSearch/fauna/montsera.png";
import Heart from "./assets/jungleSearch/fauna/heart.png";

import Koala from "./assets/jungleSearch/animals/koala.jpg";
import Monkie from "./assets/jungleSearch/animals/monkie.jpg";
import Cat from "./assets/jungleSearch/animals/cat.jpg";
import Cat2 from "./assets/jungleSearch/animals/cat2.jpg";
import Dog from "./assets/jungleSearch/animals/dog.jpg";
import Dog2 from "./assets/jungleSearch/animals/dog2.jpg";
import Chicken from "./assets/jungleSearch/animals/chicken.jpg";
import Horse from "./assets/jungleSearch/animals/horse.jpg";
import Spider from "./assets/jungleSearch/animals/spider.jpg";

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

export const animals = [
  Koala,
  Monkie,
  Cat,
  Cat2,
  Dog,
  Dog2,
  Chicken,
  Horse,
  Spider
];
export const plantsArray = [
  Plant1,
  Montsera,
  Heart,
  Plant2,
  Plant3,
  Plant4,
  Plant5,
  Plant1,
  Plant2,
  Plant3
];
