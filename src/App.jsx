import TypingPage from './TypingPage'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <TypingPage/>
    </ThemeProvider>
    </>
  )
}

export default App
