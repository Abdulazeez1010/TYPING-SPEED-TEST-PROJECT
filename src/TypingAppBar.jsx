import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LargeTypingTestLogo from './assets/images/logo-large.svg';
import personalBestLogo from './assets/images/icon-personal-best.svg';

function TypingAppBar({personalBest}) {
  return (
        <Toolbar disableGutters sx={{
            justifyContent: 'space-between'
        }}>
          <div>
            <img src={LargeTypingTestLogo} alt='Typing Test Logo'/>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={personalBestLogo} alt="Personal Best Logo" />
            <Typography
              variant='subtitle1'
              component='span' 
              sx={{ 
                ml: 1, 
                color: 'hsl(240, 1%, 59%)'
              }}
            >
                Personal best:
                <Typography
                  variant='subtitle1'
                  component='span'
                  sx={{ ml: 1, color: 'hsl(0, 0%, 100%)'}}
                >
                  {personalBest} WPM
                </Typography>
            </Typography>
          </div>
        </Toolbar>
  );
}
export default TypingAppBar;
