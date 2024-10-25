import {useState} from "react";
import data from '../profiles.json';
import {Link, useNavigate} from "react-router-dom";

const SignUpComponent = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    return(
        <div>
            <h3>SignUp</h3>
            <div>
                <input value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
                <input type="password" value={password} onChange={(e) => setPassword(Number(e.target.value))}/>
            </div>
            <div>
                <input type="password" value={password2} onChange={(e) => setPassword2(Number(e.target.value))}/>
            </div>
            <div>
                <button onClick={()=>{
                    if(password===password2){
                        //Todo
                        // post request to db

                        localStorage.setItem("currentUserId", userName);
                        navigate("/main");

                    }else{
                       alert("passwords doesn't match!");
                    }
                }}>{"Click Here"}</button>
            </div>
            <div>
                <Link to={"/sign_in"}>Sign In</Link>
            </div>

        </div>
    )
}
export default SignUpComponent