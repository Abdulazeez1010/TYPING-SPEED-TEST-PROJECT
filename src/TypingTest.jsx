import { Fragment, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import data from './data.json';
import Button from '@mui/material/Button';
import RestartIcon from './assets/images/icon-restart.svg'
import StarPatternIconOne from './assets/images/pattern-star-1.svg';
import StarPatternIconTwo from './assets/images/pattern-star-2.svg';
import ConfettiPattern from './assets/images/pattern-confetti.svg';
import CompletedIcon from './assets/images/icon-completed.svg';
import NewPersonalBestIcon from './assets/images/icon-new-pb.svg';

import TypingText from "./TypingText";
import TypingAppBar from "./TypingAppBar";
import TypingMenuBar from './TypingMenuBar';
import TestComplete from './TestComplete';
import StartOverlay from './StartOverlay';

import './TypingTest.css';

const TEST_DURATION = 60;

const statConfig = [
    { id: 'wpm', label : 'WPM',  color: 'hsl(0, 0%, 100%)', unit: ''},
    { id: 'accuracy', label :'Accuracy',  color: 'hsl(354, 63%, 57%)', unit: '%'},
    { id: 'time', label : 'Time', color: 'hsl(49, 85%, 70%)', unit: ''}
];

const testOutcomeMessages = {
  completed : {
    title: 'Test Complete!',
    displayIcon: CompletedIcon,
    feedback: "Solid run. Keep pushing to beat your high score.",
    actionText: "Go Again",
    patternOne: StarPatternIconOne,
    patternTwo: StarPatternIconTwo
  },
  baseline : {
    title: 'Baseline Established!',
    displayIcon: CompletedIcon,
    feedback: "You've set the bar. Now the real challenge begins-time to beat it.",
    actionText: "Beat This Score",
    patternOne: StarPatternIconOne,
    patternTwo: StarPatternIconTwo
  },
  newHighScore : {
    title: 'High Score Smashed!',
    displayIcon: NewPersonalBestIcon,
    feedback: "You're getting faster. That was incredible typing.",
    actionText: "Beat This Score",
    confettiPattern: ConfettiPattern
  }
};

function TypingTest() {
  const saved = Number(window.localStorage.getItem("personalBest")) || null;

  const [difficulty, setDifficulty] = useState('hard');
  const [mode, setMode] = useState('timed');
  const [text, setText] = useState('')
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION);
  const [timeSpent,setTimeSpent] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [testId, setTestId] = useState(0);
  const [testEnd, setTestEnd] = useState(false);
  const [personalBest, setPersonalBest] = useState(saved);
  const [testOutcome, setTestOutcome] = useState({});
  const [hasStarted, setHasStarted] = useState(false);

  const wrongLetters = typed
    .split("")
    .filter((char, i) => char !== text[i]).length;  

  const accuracy = typed.length === 0
    ? 100
    : Math.round(((typed.length - wrongLetters)/typed.length) * 100)
  
  const minutesElapsed = mode === 'timed'
    ? (TEST_DURATION - timeLeft) / 60 
    : timeSpent / 60;

  const wpm = minutesElapsed > 0
    ? Math.round((typed.length / 5) / (minutesElapsed))
    : 0;

  const stats = {
    wpm,
    accuracy,
    time: mode === 'passage' ? timeSpent : timeLeft
  };

  const results = [
    {label: 'WPM', value: stats.wpm},
    {label: 'Accuracy', value: `${stats.accuracy}%`},
    {label: 'Characters', value: `${typed.length - wrongLetters}/${wrongLetters}`}
  ]

  useEffect(() =>{
    if (personalBest !== null){
      localStorage.setItem("personalBest", personalBest)
    }
  }, [personalBest])

  useEffect(() => {
    let passages;
    if (mode === 'timed'){
      passages = data[difficulty];
      setTimeLeft(TEST_DURATION);
    }
    if (mode === 'passage'){
      passages = data['hard'];
      setTimeLeft(0);
      setTimeSpent(0);
    }
    const randomIndex = Math.floor(Math.random() * passages.length)
    setText(passages[randomIndex].text)
    setTyped('');
    setIsRunning(false);
  }, [difficulty, testId, mode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(!hasStarted){
        setHasStarted(true);
        return;
      }
      if (testEnd) return;
      if (event.key === ' ' && isRunning) event.preventDefault();
      if (mode === 'timed' && timeLeft === 0) return;
      if (!isRunning && typed.length > 0) return;

      if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
        setTyped((prev) => prev + event.key);
      } else if (event.key === "Backspace") {
        setTyped((prev) => prev.slice(0, -1));
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [timeLeft, mode, testEnd, isRunning, hasStarted]);

  useEffect(() => {
    if (typed.length === 1 && !isRunning) {
      setIsRunning(true);
    }
    if ((typed.length === text.length && isRunning)
      || (mode === 'timed' && timeLeft === 0)) {
      setTestEnd(true);
      setIsRunning(false);
    }
  }, [typed, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    if(testEnd) return;
    let interval;

    if (mode === 'passage'){
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else {
        interval = setInterval(() => {
          setTimeLeft(prev => {
            if (prev === 1) {
              setIsRunning(false);
              return 0;
            }
            return prev - 1;
          });   
        }, 1000);
      }
    return () => clearInterval(interval);
  }, [isRunning, mode]);

  useEffect(() => {
    if (!testEnd) return;

    let message;
    let newBest = personalBest;

    if (personalBest === null){
      message = testOutcomeMessages.baseline;
      newBest = wpm;
    } else if (wpm > personalBest){
      message = testOutcomeMessages.newHighScore;
      newBest = wpm;
    } else {
      message = testOutcomeMessages.completed;
    }

    setPersonalBest(newBest);
    setTestOutcome(message);
  }, [testEnd])

  const handleDifficulty = (lvl) => {
    setDifficulty(lvl);
    setMode('timed');
  }

  const handleMode = (mode) => {
    setMode(mode)
  }

  const restart = () => {
    setHasStarted(false);
    setTestEnd(false);
    setTestId(prev => prev + 1);
  }

  const handleHasStarted = () => {
    setHasStarted(true);
  } 

  if (!testEnd){
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
            <TypingAppBar personalBest={personalBest}/>
            <TypingMenuBar
              statConfig={statConfig}
              stats={stats}
              handleDifficulty={handleDifficulty}
              handleMode={handleMode}
            />
            <Divider sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3}}/>
          
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                filter: hasStarted ? 'none' : 'blur(7px)',
                transition: 'filter 0.3s ease'
              }}
            >
              <TypingText
                text={text}
                typed={typed}
                isRunning={isRunning}
                hasStarted={hasStarted}
              />
            </Box>
            {!hasStarted && <StartOverlay handleHasStarted={handleHasStarted} />}
            {hasStarted && <Divider sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3}}/>}
            <div 
              id='TypingTest-button'
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                margin: '0.5rem'
                }}
              >
              {hasStarted && <Button onClick={restart} >
                Restart Test <img src={RestartIcon} alt='Typing Test Logo'/>
              </Button>}
            </div>
          </Box>
        </Container>
      </Fragment>        
      </>
    )
  } else {
    return (
      <TestComplete
        restart={restart}
        results={results}
        personalBest={personalBest}
        testOutcome={testOutcome}
      />
    )
  }
  
}

export default TypingTest;