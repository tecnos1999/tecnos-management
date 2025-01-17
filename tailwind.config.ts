import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./module/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #b91c1c, #f87171)',
        'blue-gradient': 'linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6, #60a5fa)',

      },
    },
  },
  plugins: [],
};
export default config;
