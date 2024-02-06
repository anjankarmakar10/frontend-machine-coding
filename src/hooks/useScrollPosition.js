import { useEffect, useState } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePosition = () => {
      setScrollPosition({
        x: window.screenX,
        y: window.screenY,
      });
    };

    window.addEventListener("scroll", handlePosition);

    return () => window.removeEventListener("scroll", handlePosition);
  }, []);

  return scrollPosition;
};
export default useScrollPosition;
