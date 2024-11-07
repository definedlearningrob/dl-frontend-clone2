/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const spacing = {
  0: '0',
  xxxs: '2px',
  xxs: '4px',
  xs: '8px',
  x: '12px',
  sm: '16px',
  base: '24px',
  md: '32px',
  lg: '48px',
  '2lg': '64px',
  xl: '72px',
  '2xl': '96px',
};

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    borderRadius: {
      none: '0',
      xxs: spacing.xxxs,
      xs: spacing.xxs,
      sm: spacing.xs,
      s: spacing.sm,
      base: spacing.base,
      lg: spacing.lg,
      full: '9999px',
    },
    fontSize: {
      xxxs: '10px',
      xxs: '12px',
      xs: '14px',
      sm: '16px',
      base: '18px',
      lg: '20px',
      '2lg': '24px',
      xl: '28px',
      '2xl': '32px',
      '3xl': '48px',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    spacing,
    screens: {
      xs: '0',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1440px',
      xxxl: '1920px',
    },
    lineHeight: {
      sm: 1,
      base: 1.25,
      lg: 1.5,
    },
    boxShadow: (theme) => ({
      200: '0px 4px 8px rgba(69, 76, 102, 0.1)',
      300: '0px 4px 12px rgba(69, 76, 102, 0.2)',
      400: '0px 12px 40px 0px rgba(69, 76, 102, 0.20)',
      input: `0 0 0 1px ${theme('colors.neutral.300')} inset`,
      none: 'none',
    }),
    backdropBlur: {
      modal: '2px',
    },
    colors: {
      transparent: 'transparent',
      inherit: 'inherit',
      overlay: {
        modal: '#454C66',
      },
      font: {
        primary: '#3C4258',
        secondary: '#5B6486',
      },
      chartPrimary: {
        200: '#CCEBFF',
        300: '#99D6FF',
        400: '#66C2FF',
        500: '#33AEFF',
        600: '#0099FF',
        700: '#007BCC',
        800: '#005C99',
        900: '#003D66',
      },
      chartSecondary: {
        200: '#FFE5CC',
        300: '#FFCC99',
        400: '#FFB366',
        500: '#FF9933',
        600: '#FF8000',
        700: '#CC6600',
        800: '#994D00',
        900: '#663300',
      },
      primary: {
        200: '#EBF7FF',
        300: '#C2E7FF',
        500: '#005994',
        600: '#004775',
      },
      secondary: {
        200: '#FFF7EE',
        300: '#FFDEBD',
        500: '#ED7700',
        600: '#CC6600',
      },
      white: '#FCFCFC',
      black: '#1D202A',
      neutral: {
        200: '#F3F4F7',
        300: '#DADDE6',
        400: '#B0B5C9',
        500: '#9199B5',
        600: '#737DA0',
        700: '#5B6486',
        800: '#3C4258',
      },
      success: {
        100: '#E8FAF4',
        500: '#26B183',
        600: '#1D8764',
      },
      warning: {
        100: '#FFFAE4',
        500: '#EBC500',
        600: '#CCAB00',
      },
      danger: {
        100: '#FFEBEC',
        500: '#FB3B40',
        600: '#CD0409',
      },
      info: {
        100: '#EBF1FE',
        500: '#5985F8',
        600: '#0F4FF5',
      },
    },
    zIndex: {
      negative: -1,
      lowest: 1,
      lower: 30,
      low: 40,
      base: 50,
      medium: 60,
      high: 70,
      higher: 80,
      highest: 90,
    },
    letterSpacing: {
      tighter: '-0.02em',
      tight: '0em',
      normal: '0.01em',
      wide: '0.1em',
    },
    variables: {
      headerHeight: '48px',
      navbarCollapseWidth: '56px',
      navbarExpandWidth: '168px',
    },
    layout: ({ theme }) => ({
      containerHeight: `calc(100vh - ${theme('variables.headerHeight')})`,
    }),
    extend: {
      backgroundImage: {
        'gradient-neutral':
          'linear-gradient(225deg, rgba(69, 76, 102, 0.48), rgba(69, 76, 102, 0.48), rgba(69, 76, 102, 0.48))',
        'gradient-primary-600':
          'linear-gradient(180deg, rgba(29, 32, 42, 0) 0%, rgba(29, 32, 42, 0.40) 46.85%, rgba(29, 32, 42, 0.56) 100%), linear-gradient(0deg, #004775, #004775)',
        'generic-card-gradient':
          'linear-gradient(180deg, rgba(29, 32, 42, 0.00) 0%, rgba(29, 32, 42, 0.40) 46.85%, rgba(29, 32, 42, 0.56) 100%), linear-gradient(225deg, rgba(0, 89, 148, 0.57) 1%, rgba(0, 89, 148, 0.62) 37.14%, rgba(0, 89, 148, 0.88) 98.95%)',
        'generic-card-gradient-hovered':
          'linear-gradient(180deg, rgba(29, 32, 42, 0.00) 0%, rgba(29, 32, 42, 0.63) 46.85%, rgba(29, 32, 42, 0.88) 100%)',
      },
      animation: {
        fadeDropIn: 'fadeIn 0.7s linear, dropIn 0.375s ease-out',
        slideUpAndFade: 'slideUpAndFade 0.400s cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 0.400s cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade: 'slideDownAndFade 0.400s cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 0.400s cubic-bezier(0.16, 1, 0.3, 1)',
        highlight: 'highlight 1.65s linear infinite',
        wave: 'waveHand 60s linear infinite',
      },
      keyframes: {
        waveHand: {
          '0%, 100%': { transform: 'rotate(0.0deg)' },
          '0.4%': { transform: 'rotate(14.0deg)' },
          '0.8%': { transform: 'rotate(-8.0deg)' },
          '1.2%': { transform: 'rotate(14.0deg)' },
          '1.6%': { transform: 'rotate(-4.0deg)' },
          '2%': { transform: 'rotate(10.0deg)' },
          '2.4%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        dropIn: {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        highlight: {
          '0%': { borderColor: '#DADDE6' },
          '0.1%': { borderColor: '#005994' },
          '20%': { borderColor: '#005994' },
          '20.1%': { borderColor: '#DADDE6' },
          '100%': { borderColor: '#DADDE6' },
        },
        slideUpAndFade: {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        slideRightAndFade: {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' },
        },
        slideDownAndFade: {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        slideLeftAndFade: {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0px)' },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => ({
            'animation-delay': value,
          }),
        },
        {
          values: theme('transitionDelay'),
        }
      );
    }),
  ],
};
