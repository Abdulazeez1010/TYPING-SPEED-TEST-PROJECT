import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import './TypingForm.css';

import TypingText from "./TypingText"
import TypingAppBar from "./TypingAppBar";
import TypingMenuBar from './TypingMenuBar';

function TypingTest() {
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
            <TypingMenuBar/>
          <Divider sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3}}/>
          <TypingText/>
          </Box>
        </Container>
      </Fragment>        
      </>
    )
}

export default TypingTest;