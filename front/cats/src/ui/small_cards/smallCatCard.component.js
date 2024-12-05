import React, {useRef, useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCatId} from "../../slice/dataSlice";
import axios from "axios";
import {BASE_URL} from "../../options.js";

import CircularProgress from "@mui/material/CircularProgress";

const SmallCatCardComponent=(props)=>{
    const imgRef = useRef();
    const onImageError = () => imgRef.current.src="../../resource/image.png";
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const [catData,setCatData] = useState(null)
    const [isDataLoading, setIsDataLoading] = useState(false);


    const fetchData = async () => {

        axios.get(BASE_URL+"/breeds/"+props.id+"/info"/*"+amountOfCatsOnPage+"/"+page*/, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
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

    if(isDataLoading){
        return(
            <div className="favorite_card" onClick={() => {

                //dispatch(setCatId(props.id));
                navigate("/cat_card/"+catData.id);
            }}>
                <img ref={imgRef}
                     src={"https://cdn2.thecatapi.com/images/"+catData.referenceImageId+".jpg"}
                     width="100" height="100"
                     onError={onImageError}
                />
                <label className="small_text">{catData.name}</label>
            </div>
        )
    }
    else
        return(<CircularProgress/>)
}
export default SmallCatCardComponent