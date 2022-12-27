import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          bg: ' #922AB8',
          color: '#fff',
          _hover: { backgroundColor: '#57236A' },
        },
        secondary: {
          bg: ' #86B818',
          color: '#fff',
          _hover: { backgroundColor: '#556B23' },
        },
      },
    },
  },
});
