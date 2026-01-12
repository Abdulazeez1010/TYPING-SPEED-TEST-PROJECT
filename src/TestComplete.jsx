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
        <Container
          disableGutters
          maxWidth={false} 
          sx={{
            width: '100%',
            minHeight: {xs: '100dvh', md: 'auto'},
            display: "flex",
            justifyContent: "center",
            maxWidth: {xs: '100%', sm: '600px', md: '900px', lg: '1200px', xl: '1440px'},
            px: {xs: 0, sm: 2, md: 3, lg: 6, xl: 9},
          }}
        >
            <Box sx={{
              bgcolor: 'hsl(0, 0%, 7%)',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              py: {xs: 2, md: 4},
              fontSize: {xs: '1.25rem', sm: '1.5rem', md: '1.5rem'},
              position: 'relative',
              width: '100%',
              minHeight: {xs: '100dvh', md: 'auto'},
              px: {xs: 2.5, md: 6, lg: 10, xl: 15},
            }}
            >
              <TypingAppBar personalBest={personalBest} stats={stats}/>
              {testOutcome.patternOne && <Box sx={{
                position: 'absolute',
                display: 'block',
                right: {xs: '0%', md: '8%'},
                bottom: {xs: '3%', md: '45%'}
              }}
              >
                <Box
                  component="img"
                  src={testOutcome.patternOne}
                  alt="star1-pattern"
                  sx={{
                    width: {xs: '50%', md: '80%'}
                  }}
                />
              </Box>}
              {testOutcome.patternTwo && <Box sx={{
                position: 'absolute',
                display: 'block',
                left: {xs: '5%', md: '9%'},
                top: {xs: '15%', md: '25%'}
              }}
              >
                <Box
                  component="img"
                  src={testOutcome.patternTwo}
                  alt="star2-pattern"
                  sx={{
                    width: {xs: '50%', md: '80%'}
                  }}
                />
              </Box>}

              {testOutcome.confettiPattern && (
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: {xs: 120, sm: 160, md: 220},
                  overflow: 'hidden',
                  pointerEvents: 'none'
                }}
                >
                  <Box
                    sx={{
                      width: {xs: '200%', md: '100%'},
                      height: '100%',
                      backgroundImage: `url(${testOutcome.confettiPattern})`,
                      backgroundRepeat: 'no-repeat',
                      // backgroundPosition: 'center bottom',
                      backgroundSize: 'cover',
                    }}
                  />
                </Box>
              )}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center"
              }}>
                <Box sx={{mb: '1rem'}}>
                  <img style={{width: '90%'}} src={testOutcome.displayIcon} alt='Test Outcome Icon'/>
                </Box>
                <Typography
                  component="div"
                  sx={{
                    color: 'hsl(0, 0%, 100%)',
                    fontWeight: '600',
                    fontSize: {xs: '1.2rem', sm: '1.6rem', md: '2rem'}
                  }}
                >
                  {testOutcome.title}
                </Typography>
                <Typography
                  // variant="subtitle1"
                  component="div"
                  sx={{
                    color: 'hsl(240, 1%, 59%)',
                    p: '0.5rem 0',
                    textAlign: 'center',
                    fontSize: '0.8rem'
                  }}
                >
                  {testOutcome.feedback}
                </Typography>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', sm: 'repeat(3, 1fr)'},
                gap:{xs: 1.5, sm: 2},
                mt: 3, 
                width: {xs: '100%', md: 'auto'},
                maxWidth: '100%',
                boxSizing: 'border-box'
                }}
              >
                {results.map(({label, value, correct, errors}) => (
                  <Box
                    key={label}
                    sx={{
                      width: '100%',
                      minHeight: '4rem',
                      borderRadius: 2,
                      border: '1px solid hsl(240, 1%, 20%)',
                      padding: '0.5rem 1rem',
                      color: 'hsl(240, 1%, 59%)',
                      fontSize: '0.8rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    {label}
                      {label === 'Characters' ? (
                        <Typography sx={{fontWeight: 600}}>
                          <Box component='span' sx={{color: 'hsl(140, 63%, 57%)'}}>
                            {correct}
                          </Box>
                          <Box component='span'>/</Box>
                          <Box component='span' sx={{color: 'hsl(354, 63%, 57%)'}}>
                            {errors}
                          </Box>
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            fontWeight: '600',
                            color:
                              label === 'WPM:'
                              ? 'hsl(0, 0%, 100%)' 
                              : label === 'Accuracy:' && value >= 95 
                                ? 'hsl(140, 63%, 57%)' 
                                : 'hsl(354, 63%, 57%)'
                          }}
                        >
                          {label === 'Accuracy:' ? `${value}%`
                          : value}
                        </Typography>
                      )}
                    
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
                  {testOutcome.actionText} 
                  <img style={{filter: 'invert(1)'}} src={RestartIcon} alt='Restart'/>
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