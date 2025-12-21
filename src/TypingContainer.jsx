import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import data from './data.json';
import './TypingForm.css';

function TypingContainer() {
    const [text] = useState(data.hard[0].text)
    const [typed, setTyped] = useState("");

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
                setTyped((prev) => prev + event.key);
            } else if (event.key === "Backspace") {
                setTyped((prev) => prev.slice(0, -1));
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

  return (
    <div className='Typing-form-container'>
    {
      text.split("").map((char, i) => {
        let classes = `normalStyle`
        if (typed[i] !== null && i < typed.length){
          classes += typed[i] === char ? ` correctStyle` : ` errorStyle`
        }
        return (
          <Typography
            key={i}
            className={classes}
            gutterBottom
            variant="h4"
            component="span"
            sx={{
              fontFamily: "Sora, sans-serif"
            }}
          >
            {char}
          </Typography>
        )
      })
    }
    </div>    
  )
}

export default TypingContainer;