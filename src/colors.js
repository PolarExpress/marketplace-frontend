/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import * as defaultTheme from "tailwindcss/defaultTheme";

export const tailwindColors = {
  ...defaultTheme.colors,

  accent: {
    100: "hsl(var(--clr-acc--100) / <alpha-value>)",
    200: "hsl(var(--clr-acc--200) / <alpha-value>)",
    300: "hsl(var(--clr-acc--300) / <alpha-value>)",
    400: "hsl(var(--clr-acc--400) / <alpha-value>)",
    500: "hsl(var(--clr-acc--500) / <alpha-value>)",
    600: "hsl(var(--clr-acc--600) / <alpha-value>)",
    700: "hsl(var(--clr-acc--700) / <alpha-value>)",
    800: "hsl(var(--clr-acc--800) / <alpha-value>)",
    DEFAULT: "hsl(var(--clr-acc) / <alpha-value>)"
  },

  custom: {
    nodes: [
      "#181520", // black
      "#d49350", // orange
      "#1e9797", // blue
      "#d56a50", // red
      "#800000",
      "#fabed4",
      "#808000",
      "#ffe119",
      "#bfef45",
      "#3cb44b",
      "#42d4f4",
      "#000075",
      "#4363d8",
      "#911eb4",
      "#dcbeff",
      "#f032e6",
      "#a9a9a9",
      "#2d7c0b",
      "#00ff00",
      "#0000ff"
    ]
  },

  danger: {
    100: "hsl(var(--clr-dang--100) / <alpha-value>)",
    200: "hsl(var(--clr-dang--200) / <alpha-value>)",
    300: "hsl(var(--clr-dang--300) / <alpha-value>)",
    400: "hsl(var(--clr-dang--400) / <alpha-value>)",
    500: "hsl(var(--clr-dang--500) / <alpha-value>)",
    600: "hsl(var(--clr-dang--600) / <alpha-value>)",
    700: "hsl(var(--clr-dang--700) / <alpha-value>)",
    800: "hsl(var(--clr-dang--800) / <alpha-value>)",
    DEFAULT: "hsl(var(--clr-dang) / <alpha-value>)"
  },

  dark: "hsl(var(--clr-dark) / <alpha-value>)",

  entity: {
    0: "#FFFAF9",
    50: "#FFF3E6",
    100: "#FFE7CC",
    200: "#FFD3A3",
    300: "#FFBF7A",
    400: "#FFA952",
    500: "#FF9429",
    600: "#FF7D00", // primary
    700: "#D66700",
    800: "#AD5200",
    900: "#853E00",
    950: "#703400",
    // https://www.tailwindshades.com/#color=29.41176470588235%2C100%2C50&step-up=8&step-down=8&hue-shift=5&name=flush-orange&base-stop=6&v=1&overrides=e30%3D
    DEFAULT: "#FF7D00"
  },

  info: {
    100: "hsl(var(--clr-info--100) / <alpha-value>)",
    200: "hsl(var(--clr-info--200) / <alpha-value>)",
    300: "hsl(var(--clr-info--300) / <alpha-value>)",
    400: "hsl(var(--clr-info--400) / <alpha-value>)",
    500: "hsl(var(--clr-info--500) / <alpha-value>)",
    600: "hsl(var(--clr-info--600) / <alpha-value>)",
    700: "hsl(var(--clr-info--700) / <alpha-value>)",
    800: "hsl(var(--clr-info--800) / <alpha-value>)",
    DEFAULT: "hsl(var(--clr-inf) / <alpha-value>)"
  },

  light: "hsl(var(--clr-light) / <alpha-value>)",

  primary: {
    50: "hsl(var(--clr-pri--50) / <alpha-value>)",
    100: "hsl(var(--clr-pri--100) / <alpha-value>)",
    200: "hsl(var(--clr-pri--200) / <alpha-value>)",
    300: "hsl(var(--clr-pri--300) / <alpha-value>)",
    400: "hsl(var(--clr-pri--400) / <alpha-value>)",
    500: "hsl(var(--clr-pri--500) / <alpha-value>)",
    600: "hsl(var(--clr-pri--600) / <alpha-value>)",
    700: "hsl(var(--clr-pri--700) / <alpha-value>)",
    800: "hsl(var(--clr-pri--800) / <alpha-value>)",
    900: "hsl(var(--clr-pri--900) / <alpha-value>)",
    DEFAULT: "hsl(var(--clr-pri) / <alpha-value>)"
  },
  relation: {
    50: "#EFF6FB",
    100: "#DDEBF7",
    200: "#B7D5EE",
    300: "#92BFE6",
    400: "#6DA9DD",
    500: "#4893D4",
    600: "#2D7CC1",
    700: "#236198",
    800: "#1A476E",
    900: "#102C45",
    950: "#0B1F30",
    //https://www.tailwindshades.com/#color=207.97297297297297%2C62.184873949579824%2C46.666666666666664&step-up=9&step-down=10&hue-shift=0&name=mariner&base-stop=6&v=1&overrides=e30%3D
    DEFAULT: "#2D7CC1"
  },

  secondary: {
    0: "hsl(var(--clr-sec--0) / <alpha-value>)",
    50: "hsl(var(--clr-sec--50) / <alpha-value>)",
    100: "hsl(var(--clr-sec--100) / <alpha-value>)",
    200: "hsl(var(--clr-sec--200) / <alpha-value>)",
    300: "hsl(var(--clr-sec--300) / <alpha-value>)",
    400: "hsl(var(--clr-sec--400) / <alpha-value>)",
    500: "hsl(var(--clr-sec--500) / <alpha-value>)",
    600: "hsl(var(--clr-sec--600) / <alpha-value>)",
    700: "hsl(var(--clr-sec--700) / <alpha-value>)",
    800: "hsl(var(--clr-sec--800) / <alpha-value>)",
    900: "hsl(var(--clr-sec--900) / <alpha-value>)",
    950: "hsl(var(--clr-sec--950) / <alpha-value>)",
    1000: "hsl(var(--clr-sec--1000) / <alpha-value>)",
    DEFAULT: "hsl(var(--clr-sec) / <alpha-value>)"
  },
  success: {
    100: "hsl(var(--clr-succ--100) / <alpha-value>)",
    200: "hsl(var(--clr-succ--200) / <alpha-value>)",
    300: "hsl(var(--clr-succ--300) / <alpha-value>)",
    400: "hsl(var(--clr-succ--400) / <alpha-value>)",
    500: "hsl(var(--clr-succ--500) / <alpha-value>)",
    600: "hsl(var(--clr-succ--600) / <alpha-value>)",
    700: "hsl(var(--clr-succ--700) / <alpha-value>)",
    800: "hsl(var(--clr-succ--800) / <alpha-value>)",
    DEFAULT: "hsl(var(--clr-succ) / <alpha-value>)"
  },

  warning: {
    100: "hsl(var(--clr-warn--100) / <alpha-value>)",
    200: "hsl(var(--clr-warn--200) / <alpha-value>)",
    300: "hsl(var(--clr-warn--300) / <alpha-value>)",
    400: "hsl(var(--clr-warn--400) / <alpha-value>)",
    500: "hsl(var(--clr-warn--500) / <alpha-value>)",
    600: "hsl(var(--clr-warn--600) / <alpha-value>)",
    700: "hsl(var(--clr-warn--700) / <alpha-value>)",
    800: "hsl(var(--clr-warn--800) / <alpha-value>)",
    DEFAULT: "hsl(var(--clr-warn) / <alpha-value>)"
  }
};

export const dataColors = {
  black: "hsl(0 0 0%)",
  blue: {
    5: "hsl(220 80% 98%)",
    10: "hsl(220 71% 96%)",
    20: "hsl(220 95% 92%)",
    30: "hsl(220 92% 85%)",
    40: "hsl(220 94% 75%)",
    50: "hsl(220 92% 67%)",
    60: "hsl(220 84% 58%)",
    70: "hsl(220 79% 49%)",
    80: "hsl(220 86% 36%)",
    90: "hsl(220 80% 23%)",
    95: "hsl(220 84% 17%)",
    100: "hsl(220 61% 13%)"
  },
  cyan: {
    5: "hsl(207 40% 98%)",
    10: "hsl(207 69% 95%)",
    20: "hsl(207 80% 90%)",
    30: "hsl(207 75% 81%)",
    40: "hsl(207 67% 69%)",
    50: "hsl(207 75% 60%)",
    60: "hsl(207 80% 49%)",
    70: "hsl(207 94% 39%)",
    80: "hsl(207 97% 29%)",
    90: "hsl(207 94% 20%)",
    95: "hsl(207 89% 14%)",
    100: "hsl(207 80% 10%)"
  },
  gray: {
    5: "hsl(210 20% 98%)",
    10: "hsl(220 14% 96%)",
    20: "hsl(223 14% 90%)",
    30: "hsl(214 14% 80%)",
    40: "hsl(219 10% 68%)",
    50: "hsl(219 11% 57%)",
    60: "hsl(217 10% 45%)",
    70: "hsl(218 15% 35%)",
    80: "hsl(216 21% 27%)",
    90: "hsl(215 30% 17%)",
    95: "hsl(221 33% 13%)",
    100: "hsl(223 30% 9%)"
  },
  green: {
    5: "hsl(122 80% 98%)",
    10: "hsl(122 80% 94%)",
    20: "hsl(122 73% 87%)",
    30: "hsl(122 59% 76%)",
    40: "hsl(122 54% 63%)",
    50: "hsl(122 50% 51%)",
    60: "hsl(122 57% 40%)",
    70: "hsl(122 58% 31%)",
    80: "hsl(122 66% 22%)",
    90: "hsl(122 82% 15%)",
    95: "hsl(122 54% 12%)",
    100: "hsl(122 56% 8%)"
  },
  magenta: {
    5: "hsl(334 100% 99%)",
    10: "hsl(334 100% 97%)",
    20: "hsl(334 100% 92%)",
    30: "hsl(334 100% 84%)",
    40: "hsl(334 98% 74%)",
    50: "hsl(334 84% 64%)",
    60: "hsl(334 75% 54%)",
    70: "hsl(334 73% 44%)",
    80: "hsl(334 75% 32%)",
    90: "hsl(334 91% 21%)",
    95: "hsl(334 74% 15%)",
    100: "hsl(334 62% 10%)"
  },
  neutral: {
    5: "hsl(0 0% 98%)",
    10: "hsl(0 0% 95%)",
    20: "hsl(0 0% 89%)",
    30: "hsl(0 0% 79%)",
    40: "hsl(0 0% 66%)",
    50: "hsl(0 0% 55%)",
    60: "hsl(0 0% 44%)",
    70: "hsl(0 0% 33%)",
    80: "hsl(0 0% 25%)",
    90: "hsl(0 0% 17%)",
    95: "hsl(0 0% 12%)",
    100: "hsl(0 0% 8%)"
  },
  orange: {
    5: "hsl(29 100% 98%)",
    10: "hsl(29 100% 95%)",
    20: "hsl(29 100% 87%)",
    30: "hsl(29 100% 76%)",
    40: "hsl(29 96% 60%)",
    50: "hsl(29 100% 50%)",
    60: "hsl(28 100% 43%)",
    70: "hsl(25 100% 35%)",
    80: "hsl(26 96% 27%)",
    90: "hsl(25 100% 17%)",
    95: "hsl(25 100% 12%)",
    100: "hsl(25 100% 8%)"
  },
  purple: {
    5: "hsl(263 100% 99%)",
    10: "hsl(263 100% 97%)",
    20: "hsl(263 100% 93%)",
    30: "hsl(263 97% 87%)",
    40: "hsl(263 96% 78%)",
    50: "hsl(263 96% 71%)",
    60: "hsl(263 80% 61%)",
    70: "hsl(263 65% 52%)",
    80: "hsl(263 64% 38%)",
    90: "hsl(263 67% 25%)",
    95: "hsl(263 54% 16%)",
    100: "hsl(263 52% 12%)"
  },
  red: {
    5: "hsl(0 100% 99%)",
    10: "hsl(0 100% 97%)",
    20: "hsl(0 100% 92%)",
    30: "hsl(0 100% 85%)",
    40: "hsl(0 98% 76%)",
    50: "hsl(0 95% 68%)",
    60: "hsl(0 89% 58%)",
    70: "hsl(0 76% 48%)",
    80: "hsl(0 82% 35%)",
    90: "hsl(0 85% 24%)",
    95: "hsl(0 77% 17%)",
    100: "hsl(0 74% 12%)"
  },
  teal: {
    5: "hsl(180 80% 98%)",
    10: "hsl(180 83% 93%)",
    20: "hsl(180 79% 85%)",
    30: "hsl(180 72% 71%)",
    40: "hsl(180 62% 57%)",
    50: "hsl(180 93% 40%)",
    60: "hsl(180 93% 33%)",
    70: "hsl(180 89% 26%)",
    80: "hsl(180 71% 20%)",
    90: "hsl(180 79% 13%)",
    95: "hsl(180 61% 10%)",
    100: "hsl(180 56% 7%)"
  },
  white: "hsl(0 0 100%)",
  yellow: {
    5: "hsl(49 82% 98%)",
    10: "hsl(49 86% 91%)",
    20: "hsl(49 97% 76%)",
    30: "hsl(49 95% 56%)",
    40: "hsl(49 100% 44%)",
    50: "hsl(49 100% 38%)",
    60: "hsl(49 100% 31%)",
    70: "hsl(49 89% 26%)",
    80: "hsl(49 86% 19%)",
    90: "hsl(49 91% 13%)",
    95: "hsl(49 83% 9%)",
    100: "hsl(49 83% 7%)"
  }
};
export const divergenceColors = {
  blueRed: [
    dataColors.blue[90],
    dataColors.blue[80],
    dataColors.blue[70],
    dataColors.blue[60],
    dataColors.blue[50],
    dataColors.blue[40],
    dataColors.blue[30],
    dataColors.blue[20],
    dataColors.blue[10],
    dataColors.blue[5],
    dataColors.red[5],
    dataColors.red[10],
    dataColors.red[20],
    dataColors.red[30],
    dataColors.red[40],
    dataColors.red[50],
    dataColors.red[60],
    dataColors.red[70],
    dataColors.red[80],
    dataColors.red[90]
  ],
  blueRedMiddle: [
    dataColors.blue[90],
    dataColors.blue[80],
    dataColors.blue[70],
    dataColors.blue[60],
    dataColors.blue[50],
    dataColors.blue[40],
    dataColors.blue[30],
    dataColors.blue[20],
    dataColors.blue[10],
    dataColors.blue[5],
    dataColors.neutral[5],
    dataColors.red[5],
    dataColors.red[10],
    dataColors.red[20],
    dataColors.red[30],
    dataColors.red[40],
    dataColors.red[50],
    dataColors.red[60],
    dataColors.red[70],
    dataColors.red[80],
    dataColors.red[90]
  ],
  magentaGreen: [
    dataColors.magenta[90],
    dataColors.magenta[80],
    dataColors.magenta[70],
    dataColors.magenta[60],
    dataColors.magenta[50],
    dataColors.magenta[40],
    dataColors.magenta[30],
    dataColors.magenta[20],
    dataColors.magenta[10],
    dataColors.magenta[5],
    dataColors.green[5],
    dataColors.green[10],
    dataColors.green[20],
    dataColors.green[30],
    dataColors.green[40],
    dataColors.green[50],
    dataColors.green[60],
    dataColors.green[70],
    dataColors.green[80],
    dataColors.green[90]
  ],
  magentaGreenMiddle: [
    dataColors.magenta[90],
    dataColors.magenta[80],
    dataColors.magenta[70],
    dataColors.magenta[60],
    dataColors.magenta[50],
    dataColors.magenta[40],
    dataColors.magenta[30],
    dataColors.magenta[20],
    dataColors.magenta[10],
    dataColors.magenta[5],
    dataColors.neutral[5],
    dataColors.green[5],
    dataColors.green[10],
    dataColors.green[20],
    dataColors.green[30],
    dataColors.green[40],
    dataColors.green[50],
    dataColors.green[60],
    dataColors.green[70],
    dataColors.green[80],
    dataColors.green[90]
  ],
  orangePurple: [
    dataColors.orange[90],
    dataColors.orange[80],
    dataColors.orange[70],
    dataColors.orange[60],
    dataColors.orange[50],
    dataColors.orange[40],
    dataColors.orange[30],
    dataColors.orange[20],
    dataColors.orange[10],
    dataColors.orange[5],
    dataColors.purple[5],
    dataColors.purple[10],
    dataColors.purple[20],
    dataColors.purple[30],
    dataColors.purple[40],
    dataColors.purple[50],
    dataColors.purple[60],
    dataColors.purple[70],
    dataColors.purple[80],
    dataColors.purple[90]
  ],
  orangePurpleMiddle: [
    dataColors.orange[90],
    dataColors.orange[80],
    dataColors.orange[70],
    dataColors.orange[60],
    dataColors.orange[50],
    dataColors.orange[40],
    dataColors.orange[30],
    dataColors.orange[20],
    dataColors.orange[10],
    dataColors.orange[5],
    dataColors.neutral[5],
    dataColors.purple[5],
    dataColors.purple[10],
    dataColors.purple[20],
    dataColors.purple[30],
    dataColors.purple[40],
    dataColors.purple[50],
    dataColors.purple[60],
    dataColors.purple[70],
    dataColors.purple[80],
    dataColors.purple[90]
  ],
  yellowTeal: [
    dataColors.yellow[90],
    dataColors.yellow[80],
    dataColors.yellow[70],
    dataColors.yellow[60],
    dataColors.yellow[50],
    dataColors.yellow[40],
    dataColors.yellow[30],
    dataColors.yellow[20],
    dataColors.yellow[10],
    dataColors.yellow[5],
    dataColors.teal[5],
    dataColors.teal[10],
    dataColors.teal[20],
    dataColors.teal[30],
    dataColors.teal[40],
    dataColors.teal[50],
    dataColors.teal[60],
    dataColors.teal[70],
    dataColors.teal[80],
    dataColors.teal[90]
  ],
  yellowTealMiddle: [
    dataColors.yellow[90],
    dataColors.yellow[80],
    dataColors.yellow[70],
    dataColors.yellow[60],
    dataColors.yellow[50],
    dataColors.yellow[40],
    dataColors.yellow[30],
    dataColors.yellow[20],
    dataColors.yellow[10],
    dataColors.yellow[5],
    dataColors.neutral[5],
    dataColors.teal[5],
    dataColors.teal[10],
    dataColors.teal[20],
    dataColors.teal[30],
    dataColors.teal[40],
    dataColors.teal[50],
    dataColors.teal[60],
    dataColors.teal[70],
    dataColors.teal[80],
    dataColors.teal[90]
  ]
};
export const categoricalColors = {
  darkMode: {
    1: dataColors.orange[50],
    2: dataColors.purple[50],
    3: dataColors.green[50],
    4: dataColors.blue[30],
    5: dataColors.red[40],
    6: dataColors.yellow[40],
    7: dataColors.magenta[40],
    8: dataColors.teal[50],
    9: dataColors.orange[30],
    10: dataColors.red[70],
    11: dataColors.purple[40],
    12: dataColors.blue[60],
    13: dataColors.green[30],
    14: dataColors.magenta[60]
  },
  lightMode: {
    1: dataColors.orange[60],
    2: dataColors.purple[70],
    3: dataColors.green[70],
    4: dataColors.blue[50],
    5: dataColors.red[50],
    6: dataColors.yellow[50],
    7: dataColors.magenta[50],
    8: dataColors.teal[60],
    9: dataColors.orange[40],
    10: dataColors.red[80],
    11: dataColors.purple[40],
    12: dataColors.blue[80],
    13: dataColors.green[50],
    14: dataColors.magenta[70]
  }
};
