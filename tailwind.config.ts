import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        hf: "40px",
      },
      colors: {
        yellow: {
          hy: "#F4B860",
          hf: "#F8D57E",
        },
      },
      width: {
        scr: "70vw",
      },
    },
  },
  plugins: [],
};
export default config;
