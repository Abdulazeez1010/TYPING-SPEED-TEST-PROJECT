import Typography from '@mui/material/Typography';
import './TypingText.css';

import { normalizeChar } from './utils/normalizeChar';
import { Box } from '@mui/material';

function TypingText({text, typed, isRunning, hasStarted }) {
  const words = text.split(/(\s+)/);

  return (
    <>
    <Box
      className='Typing-text-container'
      sx={{
        overflowY: {xs: 'auto', md: 'visible'},
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        height: '100%',
        pt: 1
      }}
    >
    {
      words.map((word, wordIndex) => (
        <span key={wordIndex} className='word'>
          {word.split("").map((char, charIndex) => {
            const index = words.slice(0, wordIndex).join("").length + charIndex;

            const isActive = index === typed.length && isRunning;

            let classes = "char";
            if (typed[index] !== null && index < typed.length){
              classes += normalizeChar(typed[index]) === normalizeChar(char) ? ` correct` : ` error`
            }

            return (
              <span key={charIndex} className='char-wrapper'>
                {isActive && <span  className='cursor'/>}
                <Typography
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