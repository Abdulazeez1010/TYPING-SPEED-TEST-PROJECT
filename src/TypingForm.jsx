import {Fragment, useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { paragraph } from 'txtgen';
import data from './data.json';
import './TypingForm.css';

function TypingForm() {
    // const [text] = useState(() => paragraph(4));
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
    <Fragment>
      <CssBaseline />
      <Container fixed sx={{
        fontFamily: "Sora",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
      }}>
        <Box sx={{
          bgcolor: 'hsl(0, 0%, 7%)',
          height: '50vh',
          width: '80vw',
          padding: 5,
          fontSize: 24,
          overflowY: 'auto'
          }}>
            {
              text.split("").map((char, i) => {
                let classes = `normalStyle`
                if (typed[i] !== null && i < typed.length){
                  classes += typed[i] === char ? ` correctStyle` : ` errorStyle`
                }
                return (
                <span key={i} className={classes}>{char}</span>
                )
              })
            } 
        </Box>
      </Container>
    </Fragment>
    
  )
}

export default TypingForm;