import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const theme = extendTheme({
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
