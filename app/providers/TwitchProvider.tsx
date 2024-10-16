import React, { ReactNode } from 'react';
import { TwitchManager, TwitchContext } from "../managers/TwitchManager"

interface TwitchProviderProps {
  children: ReactNode;
}

const TwitchProvider: React.FC<TwitchProviderProps> = ({ children }) => {
  const twitchManager = TwitchManager();

  return (
    <TwitchContext.Provider value={twitchManager}>
      {children}
    </TwitchContext.Provider>
  );
};

export default TwitchProvider;
