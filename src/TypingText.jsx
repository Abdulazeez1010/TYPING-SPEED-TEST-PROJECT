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
        maxHeight: {
          xs: `calc(100vh - 320px)`,
          md: 'none'
        },
        // height: {xs: '75vh', md: '90vh'},
        overflowY: {xs: 'auto', md: 'visible'},
        // pr: {xs: 1, md: 0}
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        // height: {xs: 'auto', md: 'auto'}
        height: '60vh'
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
                    fontSize: {xs: '2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem'}
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