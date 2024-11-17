import {useEffect, useState} from "react";
import data from '../profiles.json';
import {Link, useNavigate} from "react-router-dom";
import {text_input} from "../Themes.js"
import "../style.css"
import {IconButton, Input, InputAdornment, TextField} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomTextField from "../ui/customTextField.component";
import {useDispatch} from "react-redux";
import {setUserData} from "../userSlice.js";
import axios from "axios";
import {BASE_URL} from "../options.js";
export const SignInComponent = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    let dispatch = useDispatch();

    const navigate = useNavigate();

    const fetchData = async () => {
        const url = BASE_URL+"/users/"+userName+"/"+password

        axios.get(url, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {

                console.log(res.data);
                if (res.data.name) {
                    dispatch(setUserData(res.data))
                    navigate("/main");
                }
            })

            .catch(err => {
                if(err.status === 500){
                    alert("Check your data")
                }

                console.error("error fetching data", err)
            });
    }


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
                                 setPassword(e.target.value)
                             }
                             }
                             placeholder="password"
            ></CustomTextField>


            <button className="button" onClick={() => {
                fetchData();
            }}>{"sign in"}</button>

            <Link className="link_text" to={"/sign_up"}>sign up</Link>

        </div>
    )
}
export default SignInComponent