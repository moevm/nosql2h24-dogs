import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {BASE_URL} from "../../options";
import CircularProgress from "@mui/material/CircularProgress";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {IconButton} from "@mui/material";
import {setUserData} from "../../slice/userSlice";
import {useParams} from "react-router";

const DeleteCatCardComponent = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));
    const imgRef = useRef();
    const onImageError = () => imgRef.current.src = "../../resource/image.png";
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [catData, setCatData] = useState(null)
    const [isDataLoading, setIsDataLoading] = useState(false);


    const fetchData = async () => {

        axios.get(BASE_URL + "/breeds/" + props.id + "/info"/*"+amountOfCatsOnPage+"/"+page*/, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                //console.log(res.data);
                setCatData(res.data)
                setIsDataLoading(true)
                // res.data.map(el=>{
                //     if(favorites.includes(el.id)){
                //         list.push(el)
                //     }
                // })

            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }
    useEffect(() => {

        setIsDataLoading(false)
        fetchData()
        //alert(JSON.stringify(filter_data));

    }, []);

    const deleteFavorite = async () => {

        axios.put(BASE_URL + "/users/removeFavorite/"+user.name+"/" + props.id, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
            }
        })
            .then(res => {
                dispatch(setUserData(res.data))
                localStorage.setItem("userData",JSON.stringify(res.data))
                setUser(res.data)
            })

            .catch(err => {
                console.error("error fetching data", err)
            });
    }

    if (isDataLoading) {
        return (
            <div className="delete_small_card">
                <IconButton >
                    <RemoveCircleOutlineIcon onClick={() => {

                        if(user?.favorites.includes(props.id)) {
                            //dispatch(removeFavorite(cat.cat_id))
                            deleteFavorite().then()
                        }
                    }}>
                    </RemoveCircleOutlineIcon>
                </IconButton>
                <div className="favorite_card">

                    <img ref={imgRef}
                         src={"http://127.0.0.1:1240/images/" + catData.referenceImageId + ".jpg"}
                         width="100" height="100"
                         onError={onImageError}
                    />
                    <label className="small_text">{catData.name}</label>


                </div>
            </div>

        )
    } else
        return (<CircularProgress/>)
}
export default DeleteCatCardComponent