import { useEffect, useRef } from "react";

function useAutoScroll(dependency: unknown) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [dependency]);

  return bottomRef;
}

export default useAutoScroll;