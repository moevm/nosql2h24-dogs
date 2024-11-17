import {useState} from "react";
import data from '../profiles.json';
import {Link, useNavigate} from "react-router-dom";
import CustomTextField from "../ui/customTextField.component";

const SignUpComponent = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    return(
        <div className="input_box">
            <h3 className="big_text">Sign Up</h3>
            <CustomTextField value={userName}
                             onChange={(e) => setUserName(e.target.value)}
                             placeholder="name"
            ></CustomTextField>

            <CustomTextField value={password}
                             onChange={(e) => {
                                 if (/^\d+$/.test(e.target.value) || e.target.value === "") {
                                     setPassword(e.target.value)
                                 }

                             }
                             }
                             placeholder="password"
            ></CustomTextField>

            <CustomTextField value={password2}
                             onChange={(e) => {
                                 if (/^\d+$/.test(e.target.value) || e.target.value === "") {
                                     setPassword2(e.target.value)
                                 }

                             }
                             }
                             placeholder="password"
            ></CustomTextField>

                <button className="button" onClick={()=>{
                    if(password===password2){
                        //Todo
                        // post request to db

                        localStorage.setItem("currentUserId", userName);
                        navigate("/main");

                    }else{
                       alert("passwords doesn't match!");
                    }
                }}>{"sign up"}</button>

                <Link className="link_text" to={"/sign_in"}>sign in</Link>


        </div>
    )
}
export default SignUpComponent