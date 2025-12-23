import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import './TypingMenuBar.css'

function TypingMenuBar({statConfig, stats, updateDifficulty}){
    return (
        <>
          <Toolbar disableGutters sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}>
            {/* <Box sx={{ flexGrow: 1, gap: 3, mb: 2, mt: 2, display: 'flex', justifyContent: 'center'}}> */}
            <Box sx={{ display: 'flex', justifyContent:'space-between'}}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {statConfig.map(({id, label, color, unit}) => (
                  <Typography key={id} sx={{color: 'hsl(240, 1%, 59%)',  display: 'flex', alignItems: 'center'}}>
                    {label}:
                    <Typography 
                      component='span'
                      sx={{color: color, fontWeight: '700'}}
                    >
                      {stats[id]}{unit}
                    </Typography>
                    {/* {id !== 'time' &&
                    <Divider
                      orientation="vertical"
                      sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.6, padding: 1.5}}
                    />
                    } */}
                  </Typography>
              ))}
            </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ml: 2}}>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Typography sx={{ color: 'hsl(240, 1%, 59%)'}}>Difficulty:</Typography>
                <Stack id="button" spacing={0.5} direction="row">
                  <Button
                    onClick={() => updateDifficulty('easy')}
                    variant="outlined"
                    size='small'
                  >
                    Easy
                  </Button>
                  <Button
                    onClick={() => updateDifficulty('medium')}
                    variant="outlined"
                    size='small'
                  >
                    Medium
                  </Button>
                  <Button
                    onClick={() => updateDifficulty('hard')}
                    variant="outlined"
                    size='small'
                  >
                    Hard
                  </Button>
                </Stack>
              </Box>
              <Divider orientation="vertical" sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.6, padding: 1}}/>
              <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                <Typography sx={{ color: 'hsl(240, 1%, 59%)', ml: 2}}>Mode:</Typography>
                <Stack id="button" spacing={0.5} direction="row">
                  <Button variant="outlined" size='small'>Timed (60)</Button>
                  <Button variant="outlined" size='small'>Passage</Button>
                </Stack>
              </Box>
            </Box>
        </Toolbar>
        </>
    )
}

export default TypingMenuBar;