import {useEffect, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {text_input} from "../Themes";
import {ArrowUpward} from "@mui/icons-material";
import axios from "axios";
import {BASE_URL} from "../options";
import {setUserData} from "../slice/userSlice";
import {useParams} from "react-router";
import {useDispatch, UseDispatch, useSelector} from "react-redux";
import {addComment} from "../slice/dataSlice";


const CommentTextField = (props) => {
    let data = useSelector(state => state.data);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
    let { id } = useParams();
    const [text,setText] = useState("");

    const postComment = async () => {
        if(data.author == ""){
            axios.post(BASE_URL + "/comments", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
                userId:user.name,
                breedId:id,
                text:text,
            })
                .then(res => {
                    dispatch(addComment(res.data))
                })

                .catch(err => {
                    console.error("error fetching data", err)
                });
        }else{

        }

    }
    let dispatch = useDispatch();
    return (
        <TextField className="comment_text_filed"
                   placeholder={props.placeholder}
                   variant="standard"
                   type='text'
                   InputProps={{
                       disableUnderline: true,
                       endAdornment:
                           <InputAdornment position="end" >
                               <IconButton
                                   onClick={()=>{
                                       postComment()
                                       setText("")

                                   }
                                   }

                                   edge="end"
                                   style={{
                                       marginRight:10,
                                   }}
                                   size="large"
                               >
                                   <ArrowUpward/>
                               </IconButton>
                           </InputAdornment>

                   }}
                   sx={text_input}
                   value={text}
                   onChange = {(e)=>{setText(e.target.value)}}

        />
    )
}
export default CommentTextField