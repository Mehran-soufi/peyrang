"use client";

import { useEffect, useState } from "react";

type FavoriteCountProps = {
  initialCount: number;
};

export function FavoriteCount({ initialCount }: FavoriteCountProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    function handleCountChange(event: Event) {
      const customEvent = event as CustomEvent<number>;
      setCount(customEvent.detail);
    }

    window.addEventListener("favorites-count-change", handleCountChange);

    return () => {
      window.removeEventListener("favorites-count-change", handleCountChange);
    };
  }, []);

  return <p className="mt-3 text-2xl font-bold">{count}</p>;
}
