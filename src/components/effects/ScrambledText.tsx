// Component inspired by Tom Miller from the GSAP community
// https://codepen.io/creativeocean/pen/NPWLwJM

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./ScrambledText.css";

// Register GSAP plugins (if available)
try {
  const { SplitText } = require("gsap/SplitText");
  const { ScrambleTextPlugin } = require("gsap/ScrambleTextPlugin");
  gsap.registerPlugin(SplitText, ScrambleTextPlugin);
} catch (error) {
  console.warn("GSAP plugins not available, using fallback implementation");
}

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);
  const originalTextRef = useRef<string>("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;

    const textElement = rootRef.current.querySelector("p");
    if (!textElement) return;

    // Store the original text content properly
    originalTextRef.current = textElement.textContent || "";

    // Enhanced fallback text splitting that preserves spaces
    const splitTextFallback = () => {
      const text = originalTextRef.current;
      const chars = text.split("").map((char, i) => {
        const span = document.createElement("span");
        
        // Handle spaces properly
        if (char === " ") {
          span.innerHTML = "&nbsp;"; // Use innerHTML for non-breaking space
          span.dataset.content = " "; // Store original space character
        } else {
          span.textContent = char;
          span.dataset.content = char;
        }
        
        span.style.display = "inline-block";
        span.className = "char";
        span.style.willChange = "transform";
        return span;
      });

      textElement.innerHTML = "";
      chars.forEach(char => textElement.appendChild(char));
      return chars;
    };

    // Try to use SplitText if available, otherwise use fallback
    let chars: HTMLElement[] = [];
    try {
      // @ts-ignore - SplitText might not be available
      if (window.SplitText) {
        // @ts-ignore
        const split = new SplitText(textElement, {
          type: "chars",
          charsClass: "char",
        });
        chars = split.chars as HTMLElement[];
        
        // Ensure data-content is set for each character
        chars.forEach((char) => {
          if (!char.dataset.content) {
            char.dataset.content = char.textContent === "\u00A0" ? " " : (char.textContent || "");
          }
        });
      } else {
        chars = splitTextFallback();
      }
    } catch (error) {
      chars = splitTextFallback();
    }

    charsRef.current = chars;

    chars.forEach((c) => {
      gsap.set(c, {
        display: "inline-block",
        willChange: "transform",
      });
    });

    const createScrambleEffect = (char: HTMLElement, originalText: string) => {
      // Don't scramble spaces
      if (originalText === " " || originalText === "\u00A0") {
        return;
      }

      const scrambleCharsArray = scrambleChars.split("");
      let currentStep = 0;
      const totalSteps = Math.floor(duration * 10);
      
      const scrambleInterval = setInterval(() => {
        if (currentStep < totalSteps * 0.8) {
          const scrambledChar = scrambleCharsArray[Math.floor(Math.random() * scrambleCharsArray.length)];
          char.textContent = scrambledChar;
          currentStep++;
        } else {
          // Restore original character properly
          if (originalText === " ") {
            char.innerHTML = "&nbsp;";
          } else {
            char.textContent = originalText;
          }
          clearInterval(scrambleInterval);
        }
      }, (duration * 1000) / totalSteps);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      charsRef.current.forEach((c, index) => {
        const originalText = (c as HTMLElement).dataset.content || "";
        
        // Skip scrambling for spaces
        if (originalText === " " || originalText === "\u00A0") {
          return;
        }
        
        // Add a slight delay for each character to create a wave effect
        setTimeout(() => {
          // Try to use ScrambleTextPlugin if available
          try {
            // @ts-ignore - ScrambleTextPlugin might not be available
            if (gsap.plugins.scrambleText) {
              gsap.to(c, {
                overwrite: true,
                duration: duration,
                scrambleText: {
                  text: originalText,
                  chars: scrambleChars,
                  speed,
                },
                ease: "none",
              });
            } else {
              createScrambleEffect(c, originalText);
            }
          } catch (error) {
            createScrambleEffect(c, originalText);
          }
        }, index * 50);
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // Restore all characters to their original state
      charsRef.current.forEach((c) => {
        const originalText = (c as HTMLElement).dataset.content || "";
        if (originalText === " ") {
          c.innerHTML = "&nbsp;";
        } else {
          c.textContent = originalText;
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function
    return () => {
      if (el) {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
      
      // Clear any running intervals
      charsRef.current.forEach((char) => {
        gsap.killTweensOf(char);
      });
    };
  }, [radius, duration, speed, scrambleChars, children]);

  return (
    <div 
      ref={rootRef} 
      className={`text-block ${className} cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105' : ''}`} 
      style={style}
    >
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
