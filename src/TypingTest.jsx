import { Fragment, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import data from './data.json';
import Button from '@mui/material/Button';
import RestartIcon from './assets/images/icon-restart.svg'

import TypingText from "./TypingText";
import TypingAppBar from "./TypingAppBar";
import TypingMenuBar from './TypingMenuBar';

import './TypingTest.css';

const TEST_DURATION = 60;

const statConfig = [
    { id: 'wpm', label : 'WPM',  color: 'hsl(0, 0%, 100%)', unit: ''},
    { id: 'accuracy', label :'Accuracy',  color: 'hsl(354, 63%, 57%)', unit: '%'},
    { id: 'time', label : 'Time', color: 'hsl(49, 85%, 70%)', unit: ''}
];

function TypingTest() {
  const [difficulty, setDifficulty] = useState('hard');
  const [text, setText] = useState('')
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [testId, setTestId] = useState(0);

  const wrongLetters = typed
    .split("")
    .filter((char, i) => char !== text[i]).length;  

  const accuracy = typed.length === 0
    ? 100
    : Math.round(((typed.length - wrongLetters)/typed.length) * 100)
  
  const minutesElapsed = (TEST_DURATION - timeLeft) / 60;

  const wpm = minutesElapsed > 0
    ? Math.round((typed.length / 5) / (minutesElapsed))
    : 0;

  const stats = {
    wpm,
    accuracy,
    time: timeLeft
  };

  useEffect(() => {
    const passages = data[difficulty];
    const randomIndex = Math.floor(Math.random() * passages.length)
    setText(passages[randomIndex].text)
    setTyped('');
    setTimeLeft(TEST_DURATION);
    setIsRunning(false);
  }, [difficulty, testId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // if (!isRunning && typed.length > 0) return;
      if (event.key === ' ') event.preventDefault();
      if (timeLeft === 0) return;

      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        setTyped((prev) => prev + event.key);
      } else if (event.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [timeLeft]);

  useEffect(() => {
    if (typed.length === 1 && !isRunning) {
      setIsRunning(true);
    }
  }, [typed, isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });   
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const updateDifficulty = (lvl) => {
    setDifficulty(lvl);
  }

  const restart = () => {
    setTestId(prev => prev + 1);
  }

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
          // overflowY: 'auto'
          }}
        >
          <TypingAppBar/>
          <TypingMenuBar
            statConfig={statConfig}
            stats={stats}
            updateDifficulty={updateDifficulty}
          />
          <Divider sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3}}/>
        
          <TypingText
            text={text}
            typed={typed}
            isRunning={isRunning}
          />
          <Divider sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3}}/>
          <div 
            id='TypingTest-button'
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              margin: '0.5rem'
              }}
            >
            <Button onClick={restart} >
              Restart Test <img src={RestartIcon} alt='Typing Test Logo'/>
            </Button>
          </div>
        </Box>
      </Container>
    </Fragment>        
    </>
  )
}

export default TypingTest;