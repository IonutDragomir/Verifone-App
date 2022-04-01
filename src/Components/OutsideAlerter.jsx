import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, message, setDisplay) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (message !== "none") {
          setDisplay("none");
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [message]);
}

export function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.display, props.setDisplay);

  return (
    <div style={{ display: "inline-block" }} ref={wrapperRef}>
      {props.children}
    </div>
  );
}
