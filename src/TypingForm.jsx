import React, {Fragment} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function TypingForm() {
  return (
    <Fragment>
      <CssBaseline />
      <Container fixed sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
      }}>
            <TextareaAutosize
            aria-label="minimum height"
            minRows={10}
            placeholder=""
            style={{ width: 800 }}
            />
      </Container>
    </Fragment>
    
  )
}

export default TypingForm;