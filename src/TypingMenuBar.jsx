import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useMediaQuery, useTheme } from '@mui/material';

import ResponsiveSelector from './ResponsiveSelector';
import './TypingMenuBar.css'


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
            width: '100%',
            display: 'flex',
            flexDirection: {xs: 'column', md:'row'},
            justifyContent: 'space-between',
            alignItems: {xs: 'stretch', md: 'center'},
            gap: {xs: 1.5, md: 0},
            columnGap: {xs: 3, lg: 6}
          }}>

            {/* Stats section */}
            <Box
              sx={{
                display: 'flex',
                width: {xs: '100%', md: 'auto'},
                justifyContent: {xs: 'center', md: 'flex-start'},
                flexShrink: 0
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(3, 1fr)',
                    sm: 'repeat(3, auto)'
                  },
                  gap: {xs: 1, sm: 2},
                  width: '100%',
                  maxWidth: 'fit-content'
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
                display: 'flex',
                justifyContent: {xs: 'center', md: 'flex-end'},
                alignItems: 'center',
                width: {xs: "100%", md: 'auto'},
                gap: {lg: 1.5},
                flexShrink: 0
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