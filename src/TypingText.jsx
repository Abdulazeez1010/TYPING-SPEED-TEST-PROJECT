import Typography from '@mui/material/Typography';
import './TypingText.css';

import { normalizeChar } from './utils/normalizeChar';

function TypingText({text, typed, isRunning, hasStarted }) {
  const words = text.split(/(\s+)/);

  return (
    <>
    <div className='Typing-form-container'>
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
                  gutterBottom
                  variant="h4"
                  component="span"
                  sx={{
                    fontFamily: "Sora, sans-serif"
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
    </div>
    </>    
  )
}

export default TypingText;