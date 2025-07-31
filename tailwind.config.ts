// @ts-nocheck
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

const customVariants = plugin(({ addVariant, e }) => {
  addVariant('master', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`master${separator}${className}`);
      return `.master .${element}`;
    });
  });
  addVariant('superadmin', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`superadmin${separator}${className}`);
      return `.superadmin .${element}`;
    });
  });

  addVariant('admin', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`admin${separator}${className}`);
      return `.admin .${element}`;
    });
  });

  addVariant('doctor', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`doctor${separator}${className}`);
      return `.doctor .${element}`;
    });
  });

  addVariant('patient', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`patient${separator}${className}`);
      return `.patient .${element}`;
    });
  });

  addVariant('nurse', ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`nurse${separator}${className}`);
      return `.nurse .${element}`;
    });
  });
});

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './common/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // <--- Add this line
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: '#F4FAF9',
        't-color-primary': '#259CFA',
        't-color-secondary': '#00B278',
        primary: '#0070FA',
        secondary: '#30588D',
        'background-secondary': '#F6F6F6',
        'gray-main': '#666666',
        'rag-red': '#DB0000',
        'rag-amber': '#F19F00',
        'rag-green': '#00990F',
        'rag-no-reading': '#0400C1',
        'rag-reading-not-set': '#962622',
        'dark-main': '#161B20',
        'dark-secondary': '#242E3D',
        theme: {
          doctor: {
            primary: '#0070FA',
          },
          nurse: {
            primary: '#FFA000',
          },
          superadmin: {
            primary: '#00B278',
          },
          admin: {
            primary: '#8697fa',
          },
          patient: {
            primary: '#ef233c',
          },
          master: {
            primary: '#252422',
          },
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        ssx: '10px',
        xs: '12px',
        sx: '14px',
        md: '16px',
      },
      screens: {
        1600: '1600px',
        1000: '1000px',
        1300: '1300px',
      },
    },
  },
  darkMode: ['class'],
  plugins: [customVariants],
};

export default config;
