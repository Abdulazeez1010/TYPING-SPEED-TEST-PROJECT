import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LargeTypingTestLogo from './assets/images/logo-large.svg';
import SmallTypingTestLogo from './assets/images/logo-small.svg';
import personalBestLogo from './assets/images/icon-personal-best.svg';
import { useMediaQuery, useTheme } from '@mui/material';

function TypingAppBar({personalBest}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          <Box>
            <img 
              style={{width: '80%', height: 'auto'}}
              src={isMd ? SmallTypingTestLogo :LargeTypingTestLogo}
              alt='Typing Test Logo'
            />
          </Box>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <img src={personalBestLogo} alt="Personal Best Logo" />
            <Typography
              variant='subtitle1'
              component='span' 
              sx={{ 
                ml: 1, 
                color: 'hsl(240, 1%, 59%)',
                fontSize: 'small'
              }}
            >
                {`${isMd? 'Best:' : 'Personal best:'}`}
                <Typography
                  variant='subtitle1'
                  component='span'
                  sx={{ ml: 1, color: 'hsl(0, 0%, 100%)', fontSize: 'small'}}
                >
                  {personalBest} WPM
                </Typography>
            </Typography>
          </Box>
        </Toolbar>
  );
}
export default TypingAppBar;
