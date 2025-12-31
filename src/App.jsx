import TypingTest from './TypingTest'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import './App.css'

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <TypingTest/>
    </ThemeProvider>
    </>
  )
}

export default App;
