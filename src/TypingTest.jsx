import { Fragment, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import data from './data.json';
import './TypingText.css';

import TypingText from "./TypingText";
import TypingAppBar from "./TypingAppBar";
import TypingMenuBar from './TypingMenuBar';

const statConfig = [
    { id: 'wpm', label : 'WPM',  color: 'hsl(0, 0%, 100%)', unit: ''},
    { id: 'accuracy', label :'Accuracy',  color: 'hsl(354, 63%, 57%)', unit: '%'},
    { id: 'time', label : 'Time', color: 'hsl(49, 85%, 70%)', unit: ''}
];

function TypingTest() {
  const [text] = useState(data.hard[0].text)
  const [typed, setTyped] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRuning] = useState(false);

  const wrongLetters = typed
    .split("")
    .filter((char, i) => char !== text[i]).length;  

  const accuracy = typed.length === 0
    ? 100
    : Math.round(((typed.length - wrongLetters)/typed.length) * 100)
  
  const minutesElapsed = (60 - timeLeft) / 60;

  const wpm = minutesElapsed > 0
    ? Math.round((typed.length / 5) / (minutesElapsed))
    : 0;

  const stats = {
    wpm,
    accuracy,
    time: timeLeft
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        setTyped((prev) => prev + event.key);
      } else if (event.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (typed.length === 1 && !isRunning) {
      setIsRuning(true);
    }
  }, [typed, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);   
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

    return (
      <>
      <Fragment>
        <CssBaseline />
        <Container fixed sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // marginTop: 10
        }}>
          <Box sx={{
            bgcolor: 'hsl(0, 0%, 7%)',
            height: '90vh',
            width: '80vw',
            padding: "1rem 5rem",
            fontSize: 24,
            overflowY: 'auto'
            }}
          >
            <TypingAppBar/>
            <TypingMenuBar
              statConfig={statConfig}
              stats={stats}
            />
          <Divider sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3}}/>
          
          <TypingText
            text={text}
            typed={typed}
          />
          </Box>
        </Container>
      </Fragment>        
      </>
    )
}

export default TypingTest;


//  useEffect(() => {
//     if (typed.length === 0){
//       setStats(prev => ({
//         ...prev,
//         accuracy: 0
//       }));
//       return
//     }

//     const acc = ((typed.length - wrongLetters)/typed.length) * 100;
//     setStats(prev => ({
//       ...prev,
//       accuracy: Math.max(0, Math.round(acc))
//     }));
//   }, [typed, wrongLetters]);