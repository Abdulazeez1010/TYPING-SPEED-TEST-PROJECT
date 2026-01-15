import Typography from '@mui/material/Typography';
import './TypingText.css';

import { normalizeChar } from './utils/normalizeChar';
import { Box } from '@mui/material';
import { useRef, useLayoutEffect, useState, useEffect } from 'react';

function TypingText({text, typed, isRunning, hasStarted }) {
  const words = text.split(/(\s+)/);

  const cursorRef = useRef(null);
  const activeCharRef = useRef(null);
  const containerRef = useRef(null);

  const [cursorPos, setCursorPos] = useState({x: 0, y: 0});
  const [cursorWidth, setCursorWidth] = useState(0);
  const [cursorTick, setCursorTick] = useState(0);
  const [keyboardOffset, setKeyboardOffset] = useState(0);

  // Handle keyboard resize (on mobile devices)
  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      const height = window.innerHeight - window.visualViewport.height;
      setKeyboardOffset(Math.max(height, 0));
      setCursorTick(t => t + 1);
    }

    window.visualViewport.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll container to keep cursor in view
  useLayoutEffect(() => {
    if (!isRunning) return;
    if (!activeCharRef.current || !cursorRef.current) return;

    const container = containerRef.current;
    const charRect = activeCharRef.current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const charTop = charRect.top - containerRect.top + container.scrollTop;
    const charBottom = charTop + charRect.height;

    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight - keyboardOffset;

    const lineHeight = charRect.height;
    const bufferAbove = lineHeight * 1.2;
    const padding = 24;

    let targetScroll = null; 

    if (charBottom > viewBottom - padding) {
      targetScroll =
        charBottom - (container.clientHeight - keyboardOffset) + bufferAbove;
    } else if (charTop < viewTop + bufferAbove) {
      targetScroll = charTop - bufferAbove;
    }
    if (targetScroll !== null) {
      const maxScroll = container.scrollHeight - container.clientHeight;
      container.scrollTop = Math.max(
        0,
        Math.min(targetScroll, maxScroll)
      );
    }
  }, [typed.length, isRunning, keyboardOffset, cursorTick]);

  // Positon cursor after scroll/layout settles
  useLayoutEffect(() => {
    if (!isRunning) return;
    requestAnimationFrame(() => {
      if (!activeCharRef.current || !containerRef.current)
        return;

      const charRect = activeCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setCursorWidth(charRect.width);

      setCursorPos({
        x: charRect.left - containerRect.left,
        y: charRect.top - containerRect.top
      });
    });
  }, [typed.length, isRunning, keyboardOffset, cursorTick]);

  return (
    <>
    <Box
      ref={containerRef}
      className='Typing-text-container'
      sx={{
        overflowY:'auto',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        height: '100%',
        pt: 1,
        paddingBottom: `${keyboardOffset + 80}px`,
        pointerEvents: hasStarted ? 'auto' : 'none'
      }}
    >
      {isRunning && (
        <span
          ref={cursorRef}
          className='cursor'
          style={{
            width: cursorWidth,
            transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`
          }}
        />
      )}
    {
      words.map((word, wordIndex) => (
        <span key={wordIndex} className='word'>
          {word.split("").map((char, charIndex) => {
            const index = words.slice(0, wordIndex).join("").length + charIndex;

            const isActive = index === typed.length && isRunning;

            let classes = "char";
            if (typed[index] !== null && index < typed.length){
              classes +=
                normalizeChar(typed[index]) === normalizeChar(char)
                  ? ` correct`
                  : ` error`;
            }

            return (
              <span
                key={charIndex}
                className='char-wrapper'
              >
                <Typography
                  ref={isActive ? activeCharRef : null}
                  className={classes}
                  // gutterBottom
                  variant="h4"
                  component="span"
                  sx={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: {xs: '1.89rem', sm: '2rem', md: '2rem', lg: '2rem', xl: '2.5rem'}
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </Typography>
              </span>
            )
          })}
        </span>
      ))
    }
    </Box>
    </>    
  )
}

export default TypingText;