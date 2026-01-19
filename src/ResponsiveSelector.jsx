import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDownIcon from './assets/images/icon-down-arrow.svg';
import Radio from '@mui/material/Radio';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const UncheckedRadio = (
  <Box
    sx={{
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: '0.1rem solid hsl(0, 0%, 100%)'
    }}
  />
);

const CheckedRadio = (
  <Box
    sx={{
      width: 18,
      height: 18,
      borderRadius: '50%',
      border: '6px solid hsl(210, 100%, 65%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
  <Box
    sx={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: 'black'
    }}
  />
  </Box>
);

function ResponsiveSelector({
  label,
  value,
  options,
  onChange,
  activeIndex,
  isFocused,
  hasStarted,
  setFocusContext
}){
    return (
        <>
        {/* Desktop */}
        <Box
          role="radiogroup"
          aria-label={label}
          sx={{display: { xs: 'none', md: 'flex'}, alignItems: 'center', gap: 1}}
        >
          <Typography sx={{ color: 'hsl(240, 1%, 59%)', fontSize: '0.7rem'}}>
            {label}:
          </Typography>
          <Stack id='button' spacing={0.5} direction="row">
            {options.map((opt, i) => {
              const isActive = i === activeIndex;
              const isSelected = value === opt.value;
              return (
                <Button
                    key={opt.value}
                    role='radio'
                    aria-checked= {isSelected}
                    tabIndex={isFocused && isActive ? 0 : -1}
                    onClick={() => {
                      const ctx = label === 'Difficulty' ? 'difficulty' : 'mode';
                      setFocusContext(ctx);
                      onChange(opt.value)
                      // console.log(isSelected, isFocused, isActive)
                    }}
                    className={
                      isSelected && isFocused && isActive
                        ? 'active focused_active'
                        : isSelected
                          ? 'active'
                        : '' 
                        +
                      (isFocused && isActive && !hasStarted ? ' focus' : '')
                    }
                    variant="outlined"
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                    size='small'
                    sx={{
                      fontSize: '0.7rem',
                      minWidth: 'unset',
                      px: 0.75,
                      py: 0.1,
                      whiteSpace: 'nowrap',
                    }}
                >
                    {opt.label}
                </Button>
              )
            })}
          </Stack>
          </Box>

          {/* Mobile */}
          <Box sx={{display: { xs: 'flex', md: 'none'}, alignItems: 'center', gap: 2, width: '100%'}}>
            <FormControl variant="standard" sx={{ m: 1, width: '100%'}}>
              <Select
                value={value}
                label={label}
                onChange={(e) => onChange(e.target.value)}
                IconComponent={() => null}
                renderValue={(selected) => {
                  const selectedOption = options.find(
                    (opt) => opt.value === selected
                  );
                  return (
                    <Box 
                      sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      textAlign: 'center',
                    }}>
                      <Typography sx={{color: 'white'}}>
                        {selectedOption.label}
                      </Typography>
                      <Box
                        component="img"
                        src={ArrowDownIcon}
                        alt="open"
                        sx={{width: 14, height: 14}}
                      />
                    </Box>
                  )
                }}
                sx={{
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '10px',
                  '& .MuiSelect-select': {
                    padding: '5px',
                  },        
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      borderRadius: '12px',
                      border: '1px solid hsl(240, 1%, 20%)',
                      backgroundColor: 'hsl(0, 0%, 15%)',
                      mt: 1,
                      '& .MuiList-root': { p: 0 },
                      '& .MuiMenuItem-root': { p: 0 },
                      '& .MuiDivider-root': { p: 0 },
                    },
                  },
                }}
              >
                {options.map((opt, index) => [
                  <MenuItem
                    key={opt.value}
                    sx={{
                      color: 'white'
                    }}
                    value={opt.value}
                  >
                    <Radio
                      checked={value === opt.value}
                      icon={UncheckedRadio}
                      checkedIcon={CheckedRadio}
                      disableRipple
                    />
                    <ListItemText primary={opt.label}/>
                  </MenuItem>,
                  index !== options.length -1 && (
                    <Divider
                      key={`${opt.value}-divider`}
                      sx={{borderColor: 'hsl(240, 1%, 59%)', opacity: 0.3,}}
                    />
                  )
              ])}
              </Select>
            </FormControl>
          </Box>
        </>
    )
}

export default ResponsiveSelector;