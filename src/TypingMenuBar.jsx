import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';

import './TypingMenuBar.css'

function TypingMenuBar({statConfig, stats, handleDifficulty, handleMode, difficultyOptions, modeOptions}){
    return (
        <>
          <Toolbar disableGutters sx={{
            display: 'flex',
            justifyContent: {xs: 'center', sm: 'center', md: 'space-between'},
            flexWrap: 'wrap',
            flexGrow: 1,
            m: 0
          }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent:'space-between',
                flexDirection: {xs: 'column', sm: 'column'},
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(3, 1fr)',
                    sm: 'repeat(3, auto)'
                  },
                  textAlign: 'center',
                  width: '100%',
                  gap: {xs: 1, sm: 3}
                }}>
                {statConfig.map(({id, label, color, unit}) => (
                  <Box
                    key={id}
                    sx={{
                      display: 'flex',
                      flexDirection: {xs: 'column', sm: 'row'},
                      alignItems: {sm: 'center'},
                      gap: {xs: 0.25, sm: 0.75},
                      minWidth: {xs: "100%", sm: 'auto'}
                    }}
                  >
                    <Typography 
                      key={id}
                      sx={{
                        color: 'hsl(240, 1%, 59%)'
                      }}
                    >
                      {label}:
                    </Typography>
                    <Typography 
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
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: {xs: 'flex', sm: 'flex', md: 'flex'},
                justifyContent: 'space-between',
                alignItems: 'center',
                ml: 2,
              }}
            >
              <Box sx={{display: { xs: 'none', sm: 'none', md: 'flex'}, alignItems: 'center', gap: 2}}>
                <Typography sx={{ color: 'hsl(240, 1%, 59%)'}}>Difficulty:</Typography>
                <Stack id="button" spacing={0.5} direction="row">
                  {difficultyOptions.map(({value, label}) => (
                    <Button
                      key={value}
                      onClick={() => handleDifficulty(value)}
                      variant="outlined"
                      size='small'
                    >
                      {label}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box sx={{display: { xs: 'flex', sm: 'flex', md: 'none'}, alignItems: 'center', gap: 2}}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      label="Difficulty"
                      sx={{color: 'white'}}
                    >{difficultyOptions.map(({value, label}) => (
                      <MenuItem
                        sx={{color: 'white'}}
                        value={value}
                        onClick={() => handleDifficulty(value)}
                      >
                        {label}
                      </MenuItem>
                    ))}
                    </Select>
                  </FormControl>
                </Box>
              <Divider orientation="vertical" sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.6, padding: 1}}/>
              <Box sx={{display: { xs: 'none', sm: 'none', md: 'flex'}, alignItems: 'center', gap: 2}}>
                <Typography sx={{ color: 'hsl(240, 1%, 59%)', ml: 2}}>Mode:</Typography>
                <Stack id="button" spacing={0.5} direction="row">
                  {modeOptions.map(({label, value}) => (
                    <Button
                      key={value}
                      onClick={() => handleMode(value)}
                      variant="outlined"
                      size='small'
                    >
                      {label}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box sx={{display: { xs: 'flex', sm: 'flex', md: 'none'}, alignItems: 'center', gap: 2}}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Mode"
                    sx={{color: 'white'}}
                  >{modeOptions.map(({value, label}) => (
                    <MenuItem
                      sx={{color: 'white'}}
                      value={value}
                      onClick={() => handleMode(value)}
                    >
                      {label}
                    </MenuItem>
                  ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
        </Toolbar>
        </>
    )
}

export default TypingMenuBar;