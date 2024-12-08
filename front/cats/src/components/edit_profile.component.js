import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, IconButton, TextField} from "@mui/material";
import {ArrowBack, Equalizer, Face, Settings} from "@mui/icons-material";
import {clearUserData, setUserData} from "../slice/userSlice";
import SmallCatCardComponent from "../ui/small_cards/smallCatCard.component";
import DeleteCatCardComponent from "../ui/small_cards/deleteCatCardComponent";
import axios, {put} from "axios";
import {BASE_URL} from "../options";

const EditProfileComponent=(props)=>{
    let user = useSelector(state => state.user);
    let user_data = JSON.parse(localStorage.getItem("userData"));
    const favorites = user_data.favorites;

    const imgRef = useRef();
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [name,setName]=useState(user_data.name);
    const [age,setAge]=useState(user_data.age);
    const [password,setPassword]=useState(user_data.passwordHash);
    const [img,setImg]=useState(user_data.image);
    const [favoritesData, setFavoritesData]=useState([]);
    //
    useEffect(()=>{
        console.log(user_data)
        dispatch(setUserData(user_data));
        setFavoritesData(favorites)
    },[])

    const putAge = async () => {

        axios.put(BASE_URL + "/users/age/"+age+"/"+user_data?.name, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data);
                user_data.age=age;
                localStorage.setItem("userData",JSON.stringify(user_data))
                dispatch(setUserData(user_data))
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const putPassword = async () => {

        axios.put(BASE_URL + "/users/passwordHash/"+password+"/"+user_data?.name, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data);
                user_data.passwordHash=password;
                localStorage.setItem("userData",JSON.stringify(user_data))
                dispatch(setUserData(user_data))
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    const putImage = async () => {

        axios.put(BASE_URL + "/users/image/"+img+"/"+user_data?.name, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                console.log(res.data);
                user_data.image=img;
                localStorage.setItem("userData",JSON.stringify(user_data))
                dispatch(setUserData(user_data))
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    return(
        <div className="profile_box">
            <div className="profile_data_row">
                <img src={"../cats/resource/profile.png"} width="300" height="300" alt={
                    <Face/>
                }/>
                <div className="profile_data_column">
                    {/*<TextField*/}
                    {/*    className="big_text"*/}
                    {/*    value={name}*/}
                    {/*    onChange={(e) => setName(e.target.value)}*/}
                    {/*></TextField>*/}
                    <div className="big_text">{name}</div>
                    <div className="small_text">Age:
                        <TextField
                            className="big_text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        ></TextField>
                    </div>
                    <div className="small_text">Password:
                        <TextField
                            className="big_text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                {user?.favorites?.map(fav =>
                    <div>
                        <DeleteCatCardComponent id={fav}
                        ></DeleteCatCardComponent>
                    </div>
                )}
            </div>
            <button onClick={() => {
                putAge()
                putPassword()
                putImage()

                navigate("/profile")
            }} className="button">SAVE</button>
        </div>
    )
}
export default EditProfileComponent