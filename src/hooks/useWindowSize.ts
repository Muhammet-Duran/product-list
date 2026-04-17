import { useEffect, useState } from 'react';
import { WindowSize, UseWindowSizeReturn } from '../types/hooks.types';

const useWindowSize = (): UseWindowSizeReturn => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  }); 

  useEffect(() => {
    const handleResize = (): void => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return windowSize;
};

export default useWindowSize;