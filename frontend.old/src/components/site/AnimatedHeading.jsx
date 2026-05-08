import React from "react";
import { useInView } from "react-intersection-observer";

/**
 * Letter-by-letter reveal heading - signature Covar effect.
 * Splits text into words & letters, fades + slides each in with stagger.
 */
export default function AnimatedHeading({
  as: Tag = "h2",
  text,
  className = "",
  italicWords = [],
  delay = 0,
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={`heading-anim ${inView ? "revealed" : ""} ${className}`}
      data-testid="animated-heading"
    >
      {words.map((word, wi) => {
        const isItalic = italicWords.some(
          (iw) => iw.toLowerCase() === word.toLowerCase().replace(/[.,]/g, "")
        );
        return (
          <span key={wi} className={`word ${isItalic ? "italic font-light" : ""}`}>
            {word.split("").map((ch, ci) => (
              <span
                key={ci}
                className="letter"
                style={{ transitionDelay: `${delay + (wi * 60 + ci * 25)}ms` }}
              >
                {ch}
              </span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
