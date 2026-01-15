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

  // const getKeyboardOffset = () => {
  //   if (!window.visualViewport) return 0;

  //   const keyboardHeight = window.innerHeight - window.visualViewport.height;

  //   return Math.max(keyboardHeight, 0);
  // }

  useEffect(() => {
    if (!window.visualViewport) return;

    const updateKeyboard = () => {
      const height = window.innerHeight - window.visualViewport.height;
      setKeyboardOffset(Math.max(height, 0));
    };

    window.visualViewport.addEventListener('resize', updateKeyboard);
    updateKeyboard();

    return () => {
      window.visualViewport.removeEventListener('resize', updateKeyboard);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isRunning) return;
    if (!activeCharRef.current || !cursorRef.current) return;

    const container = containerRef.current;
    const charRect = activeCharRef.current.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const charTop = charRect.top - containerRect.top + container.scrollTop;
    const charBottom = charTop + charRect.height;

    // const keyboardOffset = getKeyboardOffset();
    // const keyboardOffset = getKeyboardOffset?.() ?? 0;

    // const viewHeight = container.clientHeight - keyboardOffset;
    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    const lineHeight = charRect.height;
    const bufferAbove = lineHeight * 1.2;
    // const bufferBelow = lineHeight * 0.8;
    const padding = 24;

    // const maxscrollTop = container.scrollHeight - container.clientHeight;

    let nextScrollTop = null; 

    if (charBottom > viewBottom - padding) {
      nextScrollTop =
        charBottom - container.clientHeight + bufferAbove;
    } else if (charTop < viewTop + bufferAbove) {
      nextScrollTop = charTop - bufferAbove;
    }
    if (nextScrollTop !==null) {
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      container.scrollTop = Math.max(
        0,
        Math.min(nextScrollTop, maxScrollTop)
      );
    }
    // container.scrollTo({
    //   top: nextScrollTop,
    //   behavior: 'smooth'
    // });
  }, [typed.length, isRunning, text, keyboardOffset]);
  // }, [typed.length, isRunning, text, cursorTick]);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleResize = () => {
      setCursorTick(t => t + 1);
    };

    window.visualViewport.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isRunning) return;
    requestAnimationFrame(() => {
      // if (!activeCharRef.current || !cursorRef.current || !containerRef.current)
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
  }, [typed.length, isRunning, keyboardOffset]);
  // }, [typed.length, isRunning, cursorTick]);

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