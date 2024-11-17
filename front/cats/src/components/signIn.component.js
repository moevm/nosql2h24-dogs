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
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    return (
        <div className="input_box">
            <h3 className="big_text">Sign In</h3>


            <CustomTextField value={userName}
                             onChange={(e) => {
                                 setUserName(e.target.value)
                             }}
                             placeholder="name"
            ></CustomTextField>


            <CustomTextField value={password}
                             onChange={(e) => {
                                 if (/^\d+$/.test(e.target.value)) {
                                     setPassword(e.target.value)
                                 }

                             }
                             }
                             placeholder="password"
            ></CustomTextField>


            <button className="button" onClick={() => {
                alert("here")
                alert(userName)
                if (data.some(item => item.name === userName && item.password === password)) {
                    //Todo
                    // change to id

                    localStorage.setItem("currentUserId", userName);
                    navigate("/main");
                }

            }}>{"sign in"}</button>

            <Link className="link_text" to={"/sign_up"}>sign up</Link>

        </div>
    )
}
export default SignInComponent