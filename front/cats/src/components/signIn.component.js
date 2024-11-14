import {useState} from "react";
import data from '../profiles.json';
import {Link, useNavigate} from "react-router-dom";
import {text_input} from "../Themes.js"
import "../style.css"
import {IconButton, Input, InputAdornment, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomTextField from "../ui/customTextField.component";


export const SignInComponent = () => {
    const [userName, setUserName] = useState("hehe");
    const [password, setPassword] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <div className="input_box">
            <h3 className="big_text">Sign In</h3>
            <div>
                <CustomTextField value={userName}
                                 onChange = {(e)=>{setUserName(e.target.value)}}
                ></CustomTextField>
                {/*<TextField className="input"*/}
                {/*           placeholder="name"*/}
                {/*           variant="standard"*/}
                {/*           type={showPassword ? 'password':'text'}*/}
                {/*           InputProps={{*/}
                {/*               disableUnderline: true,*/}
                {/*               endAdornment:*/}
                {/*                   <InputAdornment position="end" >*/}
                {/*                       <IconButton*/}
                {/*                           onClick={handleClickShowPassword}*/}
                {/*                           onMouseDown={handleMouseDownPassword}*/}
                {/*                           onMouseUp={handleMouseUpPassword}*/}
                {/*                           edge="end"*/}
                {/*                           style={{*/}
                {/*                               marginRight:10,*/}
                {/*                           }}*/}
                {/*                           size="large"*/}
                {/*                       >*/}
                {/*                           {showPassword ? <VisibilityOff/> : <Visibility/>}*/}
                {/*                       </IconButton>*/}
                {/*                   </InputAdornment>*/}

                {/*           }}*/}
                {/*           sx={text_input}*/}
                {/*           value={userName}*/}
                {/*           onChange={(e) => setUserName(e.target.value)}*/}

                {/*/>*/}

            </div>
            <div>
                <input type="password" value={password} onChange={(e) => setPassword(Number(e.target.value))}/>
            </div>
            <div>
                <button onClick={() => {
                    if (data.some(item => item.name === userName && item.password === password)) {
                        //Todo
                        // change to id
                        alert("here")
                        alert(userName)
                        localStorage.setItem("currentUserId", userName);
                        navigate("/main");
                    }

                }}>{"Click Here"}</button>
            </div>
            <div>
                <Link to={"/sign_up"}>Sign Up</Link>
            </div>
        </div>
    )
}
export default SignInComponent