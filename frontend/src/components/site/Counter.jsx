import React from "react";
import { useInView } from "react-intersection-observer";

export default function Counter({ from = 0, to, duration = 2200, suffix = "", prefix = "", className = "" }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  const [val, setVal] = React.useState(from);

  React.useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={`counter-num ${className}`} data-testid="counter">
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}
