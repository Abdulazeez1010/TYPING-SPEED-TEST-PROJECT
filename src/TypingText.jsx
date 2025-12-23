import Typography from '@mui/material/Typography';
import './TypingText.css';

function TypingText({text, typed }) {

  return (
    <div className='Typing-form-container'>
    {
      text.split("").map((char, i) => {
        let classes = `normalStyle`
        if (typed[i] !== null && i < typed.length){
          classes += typed[i] === char ? ` correctStyle` : ` errorStyle`
        }
        return (
          <Typography
            key={i}
            className={classes}
            gutterBottom
            variant="h4"
            component="span"
            sx={{
              fontFamily: "Sora, sans-serif"
            }}
          >
            {char}
          </Typography>
        )
      })
    }
    </div>    
  )
}

export default TypingText;