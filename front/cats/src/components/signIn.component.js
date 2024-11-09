import {useState} from "react";
import data from '../profiles.json';
import {Link, useNavigate} from "react-router-dom";
export const SignInComponent = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState(0);

    const navigate = useNavigate();

    return(
        <div>
            <h3>SignIn</h3>
            <div>
                <input value={userName} onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
                <input type="password" value={password} onChange={(e) => setPassword(Number(e.target.value))}/>
            </div>
            <div>
                <button onClick={() => {
                    if (data.some(item => item.name === userName && item.password === password)) {
                        //Todo
                        // change to id
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