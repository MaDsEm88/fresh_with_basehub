import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  fontFamily: {  
    manrope_1: ["manrope_1", "sans"],
  
  },
} satisfies Config;
