import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { customTheme } from './UI/chakra/customTheme';
import store from './store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <Provider store={store}>
        <ChakraProvider theme={customTheme}>
          <App />
        </ChakraProvider>
      </Provider>
    </>
  </React.StrictMode>
);
