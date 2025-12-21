import { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import './TypingForm.css';

import TypingContainer from "./TypingContainer"
import TypingAppBar from "./TypingAppBar";

function TypingPage() {
    return (
      <>
      <Fragment>
        <CssBaseline />
        <Container fixed sx={{
          fontFamily: "Sora, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // marginTop: 10
        }}>
          <Box sx={{
            bgcolor: 'hsl(0, 0%, 7%)',
            height: '80vh',
            width: '80vw',
            padding: "1rem 5rem",
            fontSize: 24,
            overflowY: 'auto'
            }}
          >
            <TypingAppBar/>
            {/* MenuBar Goes here*/}
          <Divider sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3}}/>
          <TypingContainer/>
          </Box>
        </Container>
      </Fragment>        
      </>
    )
}

export default TypingPage;