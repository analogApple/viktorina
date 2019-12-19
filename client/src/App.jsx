import React from 'react';
import { isMobile } from 'react-device-detect';
import { GlobalStyle } from './styles/GlobalStyles';
import WebRoute from './web/route/WebRoute';
import MobileRoute from './mobile/route/MobileRoute';
import { RoomProvider } from './web/context/RoomContext';

const App = () => {
  return (
    <>
      <RoomProvider>
        {isMobile ? <MobileRoute /> : <WebRoute />}
        <GlobalStyle />
      </RoomProvider>
    </>
  );
};
export default App;
