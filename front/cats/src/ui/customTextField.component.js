import {useEffect, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {text_input} from "../Themes";


const CustomTextField = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const handleChange=(e)=> {
        props.onChange(e);
    };
    return (
        <TextField className="input"
                   placeholder="name"
                   variant="standard"
                   type={showPassword ? 'password':'text'}
                   InputProps={{
                       disableUnderline: true,
                       endAdornment:
                           <InputAdornment position="end" >
                               <IconButton
                                   onClick={handleClickShowPassword}
                                   onMouseDown={handleMouseDownPassword}
                                   onMouseUp={handleMouseUpPassword}
                                   edge="end"
                                   style={{
                                       marginRight:10,
                                   }}
                                   size="large"
                               >
                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                               </IconButton>
                           </InputAdornment>

                   }}
                   sx={text_input}
                   value={props.value}
                   onChange={handleChange}

        />
    )
}
export default CustomTextField