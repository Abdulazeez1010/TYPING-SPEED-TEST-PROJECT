import Typography from '@mui/material/Typography';
import './TypingText.css';

import { normalizeChar } from './utils/normalizeChar';
import { Box } from '@mui/material';
import { useRef, useLayoutEffect, useState } from 'react';

function TypingText({text, typed, isRunning, hasStarted }) {
  const words = text.split(/(\s+)/);

  const cursorRef = useRef(null);
  const activeCharRef = useRef(null);
  const containerRef = useRef(null);

  const [cursorPos, setCursorPos] = useState({x: 0, y: 0});
  const [cursorWidth, setCursorWidth] = useState(0);

  useLayoutEffect(() => {
    if (!isRunning) return;
    if (!activeCharRef.current || !cursorRef.current) return;

    const container = containerRef.current;
    const charRect = activeCharRef.current.getBoundingClientRect();
    // const containerRect = cursorRef.current.offsetParent.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const charTop = charRect.top - containerRect.top + container.scrollTop;
    const charBottom = charTop + charRect.height;

    const viewTop = container.scrollTop;
    const viewBottom = viewTop + container.clientHeight;

    const padding = 40;

    if (charBottom > viewBottom - padding) {
      container.scrollTop = charBottom - container.clientHeight + padding;
    } else if (charTop < viewTop + padding) {
      container.scrollTop = charTop - padding;
    }

    // setCursorWidth(charRect.width);

    // setCursorPos({
    //   x: charRect.left - containerRect.left,
    //   // y: charRect.top - containerRect.top
    //   y: charRect.bottom - containerRect.top - charRect.height
    // });

    // if (containerRef.current) {
    //   // const charTop = 
    //   //   charRect.top -
    //   //   containerRect.top + 
    //   //   container.scrollTop;
    //   // const charTop = 
    //   //   activeCharRef.current.getBoundingClientRect().top -
    //   //   containerRef.current.getBoundingClientRect().top + 
    //   //   containerRef.current.scrollTop;
    //   // const charBottom = charTop + activeCharRef.current.offsetHeight;
    //   // const charBottom = charTop + charRect.height;

    //   // const viewTop = container.scrollTop;
    //   // const viewBottom = viewTop + container.clientHeight;
    //   // const padding = 40;
      
    //   if (charBottom > viewBottom - padding) {
    //     container.scrollTop = charBottom - container.clientHeight + padding;
    //   } else if (charTop < viewTop + padding) {
    //     container.scrollTop = charTop - padding;
    //   }
    // }


  }, [typed.length, isRunning, text]);

  useLayoutEffect(() => {
    if (!isRunning) return;
    requestAnimationFrame(() => {
      if (!activeCharRef.current || !cursorRef.current || !containerRef.current)
        return;

      const charRect = activeCharRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setCursorWidth(charRect.width);

      setCursorPos({
        x: charRect.left - containerRect.left,
        y: charRect.bottom - containerRect.top - charRect.height
      });
    });
  }, [typed.length, isRunning]);

  return (
    <>
    <Box
      ref={containerRef}
      className='Typing-text-container'
      sx={{
        // overflowY: {xs: 'auto', md: 'auto'},
        overflowY:'auto',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        height: '100%',
        pt: 1
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
                {/* {isActive && <span  className='cursor'/>} */}
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