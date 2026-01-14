import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './StartOverlay.css'


function StartOverlay({handleHasStarted}){
    return(
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            maxHeight: '600px',
            alignSelf: 'center',
            height: '100%',
            maxWidth: {xs: '100%', sm: '488px', md: '660px', lg: '960px', xl: '1200px'},
            width: '100%',
            justifySelf: 'center',
            textAlign: 'center',
            pointerEvents: 'none'
          }}
          onClick={() => handleHasStarted()}
        >
            <Box sx={{pointerEvents: 'auto'}}>
            <Button
              id='StartOverlay-button'
              onClick={() => handleHasStarted()}
            >
                Start Typing Test
            </Button>
            <Typography
              color='white'
            //   sx={{pointerEvents: 'none'}}
            >
                Or click the text and start typing
            </Typography>
            </Box>
        </Box>
    )
}

export default StartOverlay;