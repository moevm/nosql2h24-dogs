import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Button, IconButton, TextField} from "@mui/material";
import {ArrowBack, Equalizer, Face, Settings} from "@mui/icons-material";
import {clearUserData} from "../slice/userSlice";
import SmallCatCardComponent from "../ui/small_cards/smallCatCard.component";
import DeleteCatCardComponent from "../ui/small_cards/deleteCatCardComponent";

const EditProfileComponent=(props)=>{
    let user_data = JSON.parse(localStorage.getItem("userData"));
    const favorites = user_data.favorites;
    const imgRef = useRef();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [name,setName]=useState(user_data.name);
    const [age,setAge]=useState(user_data.age);
    const [img,setImg]=useState(user_data.image);
    const favorite_data =
        favorites?.map(fav =>
            <div>
                <DeleteCatCardComponent id={fav}
                ></DeleteCatCardComponent>
            </div>
        )
    return(
        <div className="profile_box">
            <div className="profile_data_row">
                <img src={"../cats/resource/profile.png"} width="300" height="300" alt={
                    <Face/>
                }/>
                <div className="profile_data_column">
                    <TextField
                        className="big_text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></TextField>

                    <div className="small_text">Age:
                        <TextField
                            className="big_text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        ></TextField>
                    </div>
                    <div className="small_text">Image:
                        <TextField
                            className="big_text"
                            value={img}
                            onChange={(e) => setImg(e.target.value)}
                        ></TextField>
                    </div>
                </div>
            </div>

            <label className="medium_text">Favorites</label>
            <div className="card_row">
                {favorite_data}
            </div>
            <button onClick={() => {
                navigate("/profile")
            }} className="button">SAVE</button>
        </div>
    )
}
export default EditProfileComponent