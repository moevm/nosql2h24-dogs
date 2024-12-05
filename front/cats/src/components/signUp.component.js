import {useState} from "react";
import data from '../profiles.json';
import {Link, useNavigate} from "react-router-dom";
import CustomTextField from "../ui/customTextField.component";
import axios from "axios";
import {BASE_URL} from "../options";
import {setUserData} from "../slice/userSlice";
import {useDispatch} from "react-redux";

const SignUpComponent = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const fetchData = async () => {

        axios.post(BASE_URL + "/users", {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            },
            name: userName,
            age: 20,
            passwordHash: password,
            image: ""
        })
            .then(res => {
                console.log(res.data);
                if (res.data.name) {
                    dispatch(setUserData(res.data))
                    localStorage.setItem("userData",JSON.stringify(res.data))
                    navigate("/main");
                }
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }

    return (
        <div className="input_box">
            <h3 className="big_text">Sign Up</h3>
            <CustomTextField value={userName}
                             onChange={(e) => setUserName(e.target.value)}
                             placeholder="name"
            ></CustomTextField>

            <CustomTextField value={password}
                             onChange={(e) => {
                                 setPassword(e.target.value)
                             }
                             }
                             placeholder="password"
            ></CustomTextField>

            <CustomTextField value={password2}
                             onChange={(e) => {
                                 setPassword2(e.target.value)
                             }
                             }
                             placeholder="password again"
            ></CustomTextField>

            <button className="button" onClick={() => {
                if (password === password2) {
                    fetchData()
                } else {
                    alert("passwords doesn't match!");
                }
            }}>{"sign up"}</button>

            <Link className="link_text" to={"/sign_in"}>sign in</Link>


        </div>
    )
}
export default SignUpComponent