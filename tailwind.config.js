/**
 * @type {import("tailwindcss").Config}
 */
import * as defaultTheme from "tailwindcss/defaultTheme";

import { tailwindColors } from "./src/colors.js";

const config = {
  content: ["./index.html", "src/**/*.{js,ts,jsx,tsx,mdx}"],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    // darkTheme: 'dark', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    darkTheme: false, // disabled for now
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    styled: true, // include daisyUI colors and design decisions for all components
    themes: [
      {
        graphpolarisWhite: {
          ...import("daisyui/src/theming/themes")["[data-theme=corporate]"],
          accent: "#FF7D00",
          "base-100": "#F7F9FA",
          error: "#dc2626",
          fontFamily:
            "inter,ubuntu,courier,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
          // 'base-200': '#F9FBFC',
          info: "#99622E",
          neutral: "#1c1917",
          primary: "#112646",
          secondary: "#B0B8C2",
          success: "#35a06a",
          warning: "#eab308"

          // "--rounded-box": "0rem", // border radius rounded-box utility class, used in card and other large boxes
          // "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          // "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          // "--animation-btn": "0.25s", // duration of animation when you click on button
          // "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          // "--btn-text-case": "uppercase", // set default text transform for buttons
          // "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          // "--border-btn": "1px", // border width of buttons
          // "--tab-border": "1px", // border width of tabs
          // "--tab-radius": "0.5rem", // border radius of tabs
        }
      },
      "dark",
      "corporate"
    ], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    utils: true // adds responsive and modifier utility classes
  },
  plugins: [import("@tailwindcss/typography"), import("daisyui")],
  theme: {
    borderRadius: {
      "2xl": "1rem",
      "3xl": "1.5rem",
      DEFAULT: "0.25rem",
      full: "9999px",
      lg: "0.5rem",
      md: "0.375rem",
      none: 0,
      sm: "0.125rem",
      xl: "0.75rem"
    },
    extend: {
      animation: {
        closemenu: "closemenu 0.3s ease-out",
        openmenu: "openmenu 0.3s ease-out"
      },
      colors: tailwindColors,
      keyframes: {
        closemenu: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" }
        },
        openmenu: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      }
    },
    fontFamily: {
      mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
      sans: ["Inter", ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      "2xl": "1.5rem",
      "2xs": "0.688rem",
      "3xl": "1.875rem",
      "3xs": "0.625rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      base: "1rem",
      lg: "1.125rem",
      sm: "0.875rem",
      xl: "1.25rem",
      xs: "0.75rem"
    }
  }
};

export default config;
