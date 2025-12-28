import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TypingAppBar from "./TypingAppBar";

import RestartIcon from './assets/images/icon-restart.svg';

import './TestComplete.css';

function TestComplete({ restart, results, personalBest, stats, testOutcome}){
    return(
      <>
        <Fragment>
        <CssBaseline />
        <Container fixed sx={{
            display: "flex",
            justifyContent: "center"
          }}
        >
            <Box sx={{
            bgcolor: 'hsl(0, 0%, 7%)',
            height: '90vh',
            width: '80vw',
            padding: "1rem 5rem",
            position: 'relative'
            }}
            >
              <TypingAppBar personalBest={personalBest} stats={stats}/>
              {testOutcome.patternOne && <Box sx={{
                position: 'absolute',
                right: '10%',
                bottom: '35%'
              }}
              >
                <img src={testOutcome.patternOne} alt="star1-pattern" />
              </Box>}
              {testOutcome.patternTwo && <Box sx={{
                position: 'absolute',
                left: '8%',
                top: '25%'
              }}
              >
                <img src={testOutcome.patternTwo} alt="star2-pattern" />
              </Box>}
              {testOutcome.confettiPattern && <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                alignSelf: 'center'
              }}
              >
                <img style={{width: '100%'}} src={testOutcome.confettiPattern} alt="confetti-pattern" />
              </Box>}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center"
              }}>
                <Box sx={{m: '1.5rem'}}>
                  <img src={testOutcome.displayIcon} alt='Completed Icon'/>
                </Box>
              <Typography
                // gutterBottom
                variant="h4"
                component="div"
                sx={{
                  color: 'hsl(0, 0%, 100%)',
                  fontWeight: '600'
                }}
              >
                {testOutcome.title}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  color: 'hsl(240, 1%, 59%)'
                }}
              >
                {testOutcome.feedback}
              </Typography>
              <Box sx={{display: 'flex', mt: 3}}>
              {results.map(({label, value}) => (
                <Box
                key={label}
                  sx={{
                    width: '8rem',
                    height: '5rem',
                    borderRadius: 2,
                    border: '1px solid hsl(240, 1%, 20%)',
                    margin: 1,
                    padding: 1,
                    color: 'hsl(240, 1%, 59%)',
                  }}
                >
                  {label}
                  <Typography sx={{fontWeight: '800'}}>
                    {value}
                  </Typography>
                </Box>
                )
              )}
              </Box>

              <Box 
                id='TestComplete-button'
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  m: '0.5rem',
                  }}
                >
                <Button onClick={restart} >
                  {testOutcome.actionText} <img style={{filter: 'invert(1)'}} src={RestartIcon} alt='Restart'/>
                </Button>
              </Box>
              </Box>
            </Box>
        </Container>
        </Fragment>        
      </>
    )
}

export default TestComplete;