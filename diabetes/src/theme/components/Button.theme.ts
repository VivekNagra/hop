import { defineStyleConfig } from '@chakra-ui/react';

// Commented part for secondary color, no secondar colors in design

export const ButtonTheme = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    borderRadius: '8px',
    color: 'black',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  // Styles for the size variations
  sizes: {
    sm: {
      fontSize: '14px',
      px: '12px',
      py: '8px',
      lineHeight: '20px',
    },
    md: {
      fontSize: '14px',
      px: '16px',
      py: '10px',
      lineHeight: '24px',
    },
    lg: {
      fontSize: '14px',
      px: '20px',
      py: '12px',
      lineHeight: '28px',
    },
  },
  // Styles for the visual style variations
  variants: {
    primary: {
      background: 'primary.700',
      paddingX: '30px',
      border: '1px solid white',
      color: 'white',
      _hover: {
        color: 'primary.800',
        background: 'primary.200',
        borderColor: 'white',
        svg: { stroke: 'black' },
        _disabled: { color: 'white', background: 'primary.200' },
      },
    },
    secondary: {
      background: 'primary.50',
      paddingX: '30px',
      border: '1px solid white',
      borderColor: 'primary.700',
      color: 'primary.700',
      _hover: {
        color: 'primary.700',
        background: 'primary.200',
        borderColor: 'white',
        _disabled: {
          color: 'primary.800',
          background: 'primary.50',
          borderColor: 'primary.700',
        },
      },
    },
  },

  // The default `size` or `variant` values
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
});
