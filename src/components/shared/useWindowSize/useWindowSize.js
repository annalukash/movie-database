import {useEffect, useState} from 'react';

const useWindowSize = () => {
    const [width, setWindowSize] = useState(null);
  
    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth);

        window.addEventListener("resize", handleResize);
        
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return width;
}

export default useWindowSize;