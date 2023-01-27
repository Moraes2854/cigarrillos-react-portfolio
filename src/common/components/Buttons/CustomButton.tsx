import { Grid, Button } from '@mui/material'
import { useEffect, useState } from 'react';

const buttonStyle = {
    backgroundColor:'secondary.main',
    color:'info.main',
    '&:hover': {
      backgroundColor:'secondary.main',
    },
  }

interface ButtonProps {
  title:string;
  disabled?:boolean;
  onClick?:()=>void;
  type?: "button" | "submit" | "reset";
} 
  
export const CustomButton = ({title, disabled = false, onClick = ( )=> {}, type = "button"}:ButtonProps)=>{

  const [buttonDisabled, setButtonDisabled] = useState(disabled);

  useEffect(()=>{
    setButtonDisabled(disabled);
  },[disabled]);

  

    return (
      <Grid item xs={12} sx={{mt:2, textAlign:'center'}}>
        <Button
          variant="contained"
          fullWidth
          type={type}
          sx={buttonStyle}
          disabled={buttonDisabled}
          onClick={(e)=>{
            e.stopPropagation();
            onClick();
          }}
        >
          {title}
        </Button>
      </Grid>
    )
  }