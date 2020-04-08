export default {
  name: "Bouncin Beans",
  order: 10,
  type: "oscillator",
  config: [
    [false, true, true, false, true, true, false],
    [false, true, true, false, true, true, false],
    [false, false, true, false, true, false, false],
    [true, false, true, false, true, false, true],
    [true, false, true, false, true, false, true],
    [true, true, false, false, false, true, true]
  ]
};
