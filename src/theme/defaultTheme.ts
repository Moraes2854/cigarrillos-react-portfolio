import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

export const defaultTheme = createTheme({
    palette:{
        primary:{
            // BACKGROUNDCOLOR
            // main:'#19191a',
            // main:'#01111e',
            // main:'#012138',
            // main:'#013253',
            // main:'#28445c'
            main:'#38444c'
        },
        secondary:{
            main:'#543884'
        },
        error:{
            main:red.A400
        },
        info:{
            main:'#FFFFFF'
        }
    }
})