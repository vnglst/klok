import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif;`,
  },
  colors: {
    brand: {
      50: 'hsl(174deg 61% 96%);',
      100: 'hsl(174deg 61% 94%);',
      200: 'hsl(174deg 61% 92%);',
      300: 'hsl(174deg 61% 90%);',
      400: 'hsl(174deg 61% 88%);',
      500: 'hsl(174deg 61% 86%);',
      600: 'hsl(174deg 61% 85%);',
      700: 'hsl(174deg 61% 83%);',
      800: 'hsl(174deg 61% 81%);',
      900: 'hsl(174deg 61% 80%);',
      // TODO: other colors
    },
  },
  components: {
    Link: {
      baseStyle: {
        textDecoration: 'underline',
      },
    },
    // Button: {
    //   sizes: {
    //     md: {
    //       lineHeight: 0, // fix for Safari
    //       fontSize: '16px',
    //       padding: 8,
    //     },
    //   },
    //   baseStyle: {
    //     fontWeight: 'bold',
    //     borderRadius: '0 20px 20px 20px',
    //     _hover: {
    //       boxShadow: '4px 4px 0px #333;',
    //     },
    //     _active: {
    //       boxShadow: '1px 1px 0px #333;',
    //     },
    //     _focus: {
    //       boxShadow: '2px 2px 0px #333;',
    //     },
    //   },
    //   variants: {
    //     primary: {
    //       bg: 'brand.400',
    //       _hover: {
    //         bg: 'brand.600',
    //       },
    //     },
    //   },
    // },
  },
})
