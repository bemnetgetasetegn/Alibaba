import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#D64000',
          'orange-hover': '#C03800',
          'orange-light': '#FFF5EE',
        },
        alibaba: {
          dark: '#222222',
          secondary: '#666666',
          muted: '#767676',
          border: '#DDDDDD',
          'border-light': '#E6E7EB',
          surface: '#F8F8F8',
          'surface-dark': '#F4F4F4',
          background: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'SF Pro Text',
          'Roboto',
          'Helvetica Neue',
          'Helvetica',
          'Tahoma',
          'Arial',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      maxWidth: {
        'container': '1580px',
        'container-sm': '1440px',
      },
      minWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
