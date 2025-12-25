import { Fragment, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function TestComplete({statConfig, stats, typed, wrongLetters}){
    return(
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            // justifyContent: "center",
            padding: "1rem 5rem",
            fontSize: 24,
            // overflowY: 'auto'
            }}
            >
              <Typography
                gutterBottom
                variant="h4"
                component="div"
                sx={{
                  color: 'hsl(0, 0%, 100%)',
                }}
              >
                Test Complete!
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{
                  color: 'hsl(240, 1%, 59%)'
                }}
              >
                Solid run! Keep pushing to beat your high score.
              </Typography>
              <div style={{display: 'flex'}}>
              {statConfig.map(({label, id}) => {
                if (label === 'Time'){
                    label = 'Characters';
                    stats[id] = `${typed.length - wrongLetters} / ${wrongLetters}`;
                  }
                return(
                <Box
                key={id}
                  sx={{
                    width: '10rem',
                    height: '5rem',
                    borderRadius: 2,
                    border: '1px solid hsl(240, 1%, 59%)',
                    margin: 1,
                    color: 'hsl(240, 1%, 59%)',
                    fontSize: '1rem',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                >
                  {label}
                  <Typography component="div" >{stats[id]}</Typography>
                </Box>
                )
              })}
              </div>
              
            </Box>
        </Container>
        </Fragment>        
      </>
    )
}

export default TestComplete;