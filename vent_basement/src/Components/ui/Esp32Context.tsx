import React from 'react';

export interface Esp32ContextType {
  isEsp32On: boolean;
  setIsEsp32On?: (value: boolean) => void; // если нужно менять значение
}

export const Esp32Context = React.createContext<Esp32ContextType>({
  isEsp32On: true,
  setIsEsp32On: () => {},
});