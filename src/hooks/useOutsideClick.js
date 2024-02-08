import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    window.addEventListener("click", handleClick, true);

    return () => window.removeEventListener("click", handleClick, true);
  }, [ref, callback]);

  return ref;
};
export default useOutsideClick;
