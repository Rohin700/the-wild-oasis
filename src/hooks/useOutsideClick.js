import { useRef, useEffect } from "react";

function useOutsideClick(
  doClose,
  { name, openName, listenCapturing = true } = {},
) {
  const ref = useRef();

  useEffect(
    function () {
      if (name && openName && name !== openName) return;

      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("clicked outside");
          doClose();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [doClose, name, openName, listenCapturing],
  );

  return ref;
}

export default useOutsideClick;
