import { defineStyleConfig } from '@chakra-ui/react';

export const TextTheme = defineStyleConfig({
  sizes: {
    lg: {
      fontSize: '20px',
    },
    md: {
      fontSize: '16px',
    },
    sm: {
      fontSize: '14px',
    },
    xs: {
      fontSize: '12px',
    },
  },
  variants: {
    xs_thin: {
      lineHeight: '14.06px',
      fontWeight: 'thin',
      fontSize: 'xs',
    },

    xs_normal: {
      lineHeight: '14.06px',
      fontWeight: 'normal',
      fontSize: 'xs',
    },

    xs_semibold: {
      lineHeight: '14.06px',
      fontWeight: 'semibold',
      fontSize: 'xs',
    },
    xs_extrabold: {
      lineHeight: '14.06px',
      fontWeight: 'extrabold',
      fontSize: 'xs',
    },

    // Variants for 'sm'
    sm_thin: {
      lineHeight: '16.41px',
      fontWeight: 'thin',
      fontSize: 'sm',
    },
    sm_normal: {
      lineHeight: '16.41px',
      fontWeight: 'normal',
      fontSize: 'sm',
    },
    sm_semibold: {
      lineHeight: '16.41px',
      fontWeight: 'semibold',
      fontSize: 'sm',
    },
    sm_extrabold: {
      lineHeight: '16.41px',
      fontWeight: 'extrabold',
      fontSize: 'sm',
    },

    // Variants for 'md'
    md_thin: {
      lineHeight: '18.75px',
      fontWeight: 'thin',
      fontSize: 'md',
    },
    md_normal: {
      lineHeight: '18.75px',
      fontWeight: 'normal',
      fontSize: 'md',
    },
    md_semibold: {
      lineHeight: '18.75px',
      fontWeight: 'semibold',
      fontSize: 'md',
    },
    md_extrabold: {
      lineHeight: '18.75px',
      fontWeight: 'extrabold',
      fontSize: 'md',
    },

    // Variants for 'lg'
    lg_thin: {
      lineHeight: '23.44px',
      fontWeight: 'thin',
      fontSize: 'lg',
    },
    lg_normal: {
      lineHeight: '23.44px',
      fontWeight: 'normal',
      fontSize: 'lg',
    },
    lg_semibold: {
      lineHeight: '23.44px',
      fontWeight: 'semibold',
      fontSize: 'lg',
    },
    lg_extrabold: {
      lineHeight: '23.44px',
      fontWeight: 'extrabold',
      fontSize: 'lg',
    },
  },
});
