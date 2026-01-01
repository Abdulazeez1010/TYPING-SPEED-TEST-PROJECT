import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import InputLabel from '@mui/material/InputLabel';
import ResponsiveSelector from './ResponsiveSelector';

import './TypingMenuBar.css'
import { useMediaQuery, useTheme } from '@mui/material';

function TypingMenuBar({
  statConfig,
  stats,
  handleDifficulty,
  handleMode,
  difficultyOptions,
  modeOptions,
  mode,
  difficulty
}){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <>
          <Toolbar disableGutters sx={{
            display: 'flex',
            justifyContent: {xs: 'center', md: 'space-between'},
            flexWrap: 'wrap',
            flexDirection: {xs: 'row', md: 'row', lg: 'row'},
            // flexGrow: 1,
            m: 0,
            maxWidth: '1440px'
          }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent:'space-between',
                // flexDirection: {xs: 'column', md: 'row'},
                width: {xs: '100%', md: '25%', lg: '30%'}
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
                  gap: {xs: 1, sm: 0.1}
                }}
              >
                {statConfig.map(({id, label, color, unit}, index) => (
                  <Box
                    key={id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 0.1
                    }}
                  >
                    <Box  
                      key={id}
                      sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        alignItems: {sm: 'center'},
                        justifyContent: 'center',
                        gap: {xs: 0.25, sm: 0.75},
                      }}
                    >
                      <Typography 
                        key={id}
                        sx={{color: 'hsl(240, 1%, 59%)'}}
                      >
                        {label}:
                      </Typography>
                      <Typography 
                        sx={{color: color, fontWeight: '700', fontSize: {xs: '1.5rem', sm: '1rem'}}}
                      >
                        {stats[id]}{unit}
                      </Typography>
                    </Box>
                    {index !== statConfig.length - 1 &&
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                          borderColor: 'hsl(240, 1%, 59%)',
                          opacity: 0.6, 
                          pr: {xs: 2.5, sm: 5, md: 2},
                          mr: {md: 1},
                        }}
                      />
                      }
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Difficulty and Mode section */}
            <Box
              sx={{
                display: {xs: 'flex', sm: 'flex', md: 'flex'},
                justifyContent: 'space-between',
                alignItems: 'center',
                ml: 2,
                width: {xs: "100%", md:'50%', lg: '60%', xl: '50%'}
              }}
            >
              <ResponsiveSelector
                label = "Difficulty"
                value = {difficulty}
                options = {difficultyOptions}
                onChange={handleDifficulty}
              />
              {!isMobile && <Divider
                flexItem
                orientation="vertical"
                sx={{
                  borderColor: 'hsl(240, 1%, 59%)',
                  opacity: 0.6,
                  pr: { md: 1},
                  my: {md: 1, lg: 0},
                  mr: 1
                }}
              />}
              <ResponsiveSelector
                label = "Mode"
                value = {mode}
                options = {modeOptions}
                onChange={handleMode}
              />
            </Box>
        </Toolbar>
        </>
    )
}

export default TypingMenuBar;