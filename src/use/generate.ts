/* eslint-disable no-multi-assign,no-param-reassign,no-const-assign */

const maxValue = (val: number, n: number) => ((val > n) ? n : val);

const minValue = (val: number, n: number) => ((val < n) ? n : val);

const cycle = (val: number) => {
  val = maxValue(val, 1e7);
  val = minValue(val, -1e7);
  while (val < 0) { val += 360; }
  while (val > 359) { val -= 360; }
  return val;
};

const hslToRgb = (hue: number, saturation: number, lightness: number) => {
  if (hue === undefined) {
    return [0, 0, 0];
  }

  const chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
  let huePrime = hue / 60;
  const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  huePrime = Math.floor(huePrime);
  let red = 0;
  let green = 0;
  let blue = 0;

  if (huePrime === 0) {
    red = chroma;
    green = secondComponent;
    blue = 0;
  } else if (huePrime === 1) {
    red = secondComponent;
    green = chroma;
    blue = 0;
  } else if (huePrime === 2) {
    red = 0;
    green = chroma;
    blue = secondComponent;
  } else if (huePrime === 3) {
    red = 0;
    green = secondComponent;
    blue = chroma;
  } else if (huePrime === 4) {
    red = secondComponent;
    green = 0;
    blue = chroma;
  } else if (huePrime === 5) {
    red = chroma;
    green = 0;
    blue = secondComponent;
  }

  const lightnessAdjustment = lightness - (chroma / 2);
  red += lightnessAdjustment;
  green += lightnessAdjustment;
  blue += lightnessAdjustment;

  return [
    Math.abs(Math.round(red * 255)),
    Math.abs(Math.round(green * 255)),
    Math.abs(Math.round(blue * 255)),
  ];
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateHSL = () => {
  const h = randomInt(0, 360);
  const s = randomInt(42, 98);
  const l = randomInt(40, 90);
  return [h, s, l];
};

export const useGenerate = () => {
  const hsl = () => {
    const [h, s, l] = generateHSL();
    return `hsl(${h},${s}%,${l}%)`;
  };

  const rgb = () => {
    let [h, s, l] = generateHSL();
    h = cycle(h);
    s = minValue(maxValue(s, 100), 0);
    l = minValue(maxValue(l, 100), 0);
    s /= 100;
    l /= 100;
    const rgbV = hslToRgb(h, s, l);
    return `rgb(${rgbV[0]}, ${rgbV[1]}, ${rgbV[2]})`;
  };

  const hex = () => {
    let [h, s, l] = generateHSL();
    h = cycle(h);
    s = minValue(maxValue(s, 100), 0);
    l = minValue(maxValue(l, 100), 0);
    s /= 100;
    l /= 100;
    const rgbV = hslToRgb(h, s, l);
    return `#${rgbV
      .map((n) => (256 + n).toString(16).substr(-2))
      .join('')}`.toUpperCase();
  };

  const deg = () => randomInt(-180, 180);
  return {
    hsl,
    rgb,
    hex,
    deg,
  };
};
