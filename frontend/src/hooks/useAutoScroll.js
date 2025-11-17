import { useEffect, useRef, useState } from "react";

export default function useAutoScroll() {
  const containerRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const nearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        20;

      // hide button if no scrollbar
      const noScrollbar = container.scrollHeight <= container.clientHeight + 10;

      if (noScrollbar) {
        setShowButton(false);
        setAutoScroll(true);
        return;
      }

      if (nearBottom) {
        setAutoScroll(true);
        setShowButton(false);
      } else {
        setAutoScroll(false);
        setShowButton(true);
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

    setAutoScroll(true);
    setShowButton(false);
  };

  const maintainBottom = () => {
    const container = containerRef.current;
    if (!container) return;

    // Only auto-scroll if user hasn't manually scrolled up
    if (autoScroll) {
      container.scrollTop = container.scrollHeight;
    }
  };

  return {
    containerRef,
    showButton,
    autoScroll,
    scrollToBottom,
    maintainBottom,
    setAutoScroll,
  };
}
