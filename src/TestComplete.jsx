import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TypingAppBar from "./TypingAppBar";
import { useMediaQuery, useTheme } from '@mui/material';

import RestartIcon from './assets/images/icon-restart.svg';

import './TestComplete.css';

function TestComplete({ restart, results, personalBest, stats, testOutcome}){

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

    return(
      <>
        <Fragment>
        <CssBaseline />
        <Container sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: {xs: '100%', sm: '600px', md: '900px', lg: '1200px'},
            width: '100%',
            height: '100%',
            // px: {xs: 1.5, sm: 3, md: 6}
          }}
        >
            <Box sx={{
              bgcolor: 'hsl(0, 0%, 7%)',
              px: {xs: 2, sm: 4, md: 9},
              py: {xs: 2, md: 4},
              fontSize: {xs: '1.25rem', sm: '1.5rem', md: '1.5rem'},
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
            >
              <TypingAppBar personalBest={personalBest} stats={stats}/>
              {testOutcome.patternOne && <Box sx={{
                position: 'absolute',
                display: {xs: 'none', md: 'block'},
                right: '8%',
                bottom: '45%'
              }}
              >
                <img style={{width: '80%'}} src={testOutcome.patternOne} alt="star1-pattern" />
              </Box>}
              {testOutcome.patternTwo && <Box sx={{
                position: 'absolute',
                display: {xs: 'none', md: 'block'},
                left: '9%',
                top: '25%'
              }}
              >
                <img style={{width: '80%'}} src={testOutcome.patternTwo} alt="star2-pattern" />
              </Box>}
              {testOutcome.confettiPattern && <Box sx={{
                position: 'absolute',
                display: {xs: 'none', md: 'block'},
                bottom: 0,
                left: 0,
                alignSelf: 'center',
                width: '100%'
              }}
              >
                <img style={{width: '100%', height: 'auto'}} src={testOutcome.confettiPattern} alt="confetti-pattern" />
              </Box>}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center"
              }}>
                <Box sx={{mb: '1rem'}}>
                  <img style={{width: '90%'}} src={testOutcome.displayIcon} alt='Test Outcome Icon'/>
                </Box>
              <Typography
                // variant="h4"
                component="div"
                sx={{
                  color: 'hsl(0, 0%, 100%)',
                  fontWeight: '600',
                  fontSize: {xs: '1.4rem', sm: '1.8rem', md: '2.2rem'}
                }}
              >
                {testOutcome.title}
              </Typography>
              <Typography
                // variant="subtitle1"
                component="div"
                sx={{
                  color: 'hsl(240, 1%, 59%)',
                  p: '0.5rem 0'
                }}
              >
                {testOutcome.feedback}
              </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', sm: 'repeat(3, 1fr)'},
                mt: 1
                }}
              >
                {results.map(({label, value}) => (
                  <Box
                  key={label}
                    sx={{
                      width: '100%',
                      minHeight: '4rem',
                      borderRadius: 2,
                      border: '1px solid hsl(240, 1%, 20%)',
                      margin: '1rem 0.5rem 0',
                      padding: '0.7rem 1rem',
                      color: 'hsl(240, 1%, 59%)',
                      fontSize: 16
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
                  }}
                >
                <Button size='small' onClick={restart} >
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